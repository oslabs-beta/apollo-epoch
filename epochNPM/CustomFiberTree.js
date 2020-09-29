/*
 This module creates a custom Fiber Tree class that will store data from the current React Fiber Tree
 70ms(?) after an apollo query or mutation. All the data in this tree will be serializable and passable
 by message to the Epoch app. It will contain ID references to unserializable react component instances stored in the 
 DOM in the Component Store. 
 
 On user initiated time jumps, these trees will be traversed, those component references used to access
 that unserialized component data and state changing functions will be called to update their user facing
 rendered states. 

------------------
  Data Structure
------------------
  CustomFiberTree: {
    componentStore: temporary Reference to the componentStore removed when tree complete
    circularFiberReference: set {fiberNode}
    rootFiber: customFiberNode,
    treeId: ApolloActionId (query, mutation, or manual fetch) -- corresponds to logged Apollo Actions
  }

  CustomFiberNode: {
    parent: customFiberNode,
    children: [customFiberNode],
    componentId: treeId + incrementedId from componentStore
    componentData: {
      serializedState (in case we choose to Dif)
      actualDuration,
      actualStartTime,
      selfBaseDuration, 
      treeBaseDuration,
    }
    isStatefulComponent

  }
*/
import {refTags} from './refTags';

export default class CustomFiberTree {
  constructor(rootFiber, epochStore, apolloActionId) {
    this.componentStore = epochStore.componentStore;
    this.refList = epochStore.refList;
    this.treeId = apolloActionId;
    this.circularFiberReference = new Set();
    console.log('HOST ROOT FIBER IN TREE ->', rootFiber);
    this.rootFiber = this.traverseFiberTree(rootFiber, null);
    console.log('RootFiber in Tree -> ', this.rootFiber);

    // after finishing traversal rest all this so it's not hanging around
    this.componentStore = null;
    this.circularFiberReference = null;
    this.refList = null;
  }

  processFiber(reactFiber) {
    const { tag, stateNode, memoizedState } = reactFiber;
    let customFiberNode;

    // React Fiber Tag List located here:
    if (stateNode && stateNode.state && (tag === 0 || tag === 1 || tag === 2)) {
      customFiberNode = createClassNode(reactFiber, this.componentStore, this.treeId);
    }

    if (memoizedState && (tag === 0 || tag === 1 || tag === 2 || tag === 10)) {
      customFiberNode = createHooksNode(reactFiber, this.componentStore, this.refList, this.treeId);
    }

    if (!customFiberNode && (tag === 0 || tag === 1 || tag === 2 || tag === 3)) {
      customFiberNode = createStatelessNode(reactFiber, this.treeId);
    }
    // console.log('CURRENT REACT FIBER -> ', reactFiber);
    // console.log('CURRENT CUSTOM FIBER NODE ->', customFiberNode);
    return customFiberNode;
  }

  traverseFiberTree(reactFiber, parentNode) {
    const { sibling, child } = reactFiber;
    const currentNode = this.processFiber(reactFiber);
    let noStatefulNodeToAdd = false;
    if (!currentNode) noStatefulNodeToAdd = true;

    // Children are stored as a linked list in each Fiber, so this will iterate through
    if (child && !this.circularFiberReference.has(child)) {
      this.circularFiberReference.add(child);

      // Keep circular Nodes and undefined out of tree when process criteria is not met
      if (noStatefulNodeToAdd) {
        const nodeToAdd = this.traverseFiberTree(child, parentNode);
        if (nodeToAdd) parentNode.children.push(nodeToAdd);
      } else {
        const nodeToAdd = this.traverseFiberTree(child, currentNode);
        if (nodeToAdd) currentNode.children.push(nodeToAdd);
      }
    }

    // Siblings are also stored as a linked list in each Fiber so this will iterate through
    // The hostRoot should have no siblings all others will have a parentNode
    if (sibling && !this.circularFiberReference.has(sibling) && parentNode) {
      this.circularFiberReference.add(sibling);
      parentNode.children.push(this.traverseFiberTree(sibling, parentNode));
    }

    return currentNode;
  }
}

function CustomFiberNode(componentId, unserializedState, reactFiber) {
  const {
    elementType,
    actualDuration,
    actualStartTime,
    selfBaseDuration,
    treeBaseDuration,
    tag,
  } = reactFiber;
  this.componentId = componentId;
  this.componentData = { actualDuration, actualStartTime, selfBaseDuration, treeBaseDuration };
  this.children = [];
  this.elementType = elementType ? elementType.name : 'No Type';
  this.isStatefulComponent = false;
  this.tag = tag;
  // console.log('ELEMENT TYPE IN CUSTOM FIBER NODE ->', elementType);

  if (unserializedState) {
    this.componentData.serializedState = serializeState(unserializedState);
    this.isStatefulComponent = true;
  }
}

/*---------------------
      HELPERS
---------------------*/
function serializeState(unserializedState) {
  // console.log('FLATTENING YOUR STATE! ->', unserializedState);
  return 'PLACEHOLDER STATE OBJ';
}

// These will instantiate CustomFiberNodes AND save unserialized data to the component store
// Hooks states are stored as a linked list in the reactFiber on the memoizedState property
// The queue should be the component in which the hooks reside
// Individual hooksFibers also have a memoized state property which appears to be another linked list to ... don't know yet
function createHooksNode(hooksFiber, componentStore, refList, treeId) {
  // console.log('Creating Hooks Node');
  let { memoizedState: currentHook } = hooksFiber;
  const hookStateObjsForComponentStore = [];
  const treeHooksStates = [];
  const initialComponent = currentHook.queue;

  // Look to refactor this if ALL the queues are the same ref
  if (initialComponent) {
    while (currentHook) {

      // covers useStateHooks
      if (
        currentHook.memoizedState &&
        currentHook.queue &&
        currentHook.queue.lastRenderedReducer &&
        currentHook.queue.lastRenderedReducer.name === 'basicStateReducer'
      ) {
        const { memoizedState: state, queue } = currentHook;
        hookStateObjsForComponentStore.push({
          state,
          actualComponent: queue,
        });
        treeHooksStates.push(state);
      }

      // covers apollo Query Hooks (which create Refs...these are useRef hooks)
      if(currentHook.memoizedState && currentHook.memoizedState.current && currentHook.memoizedState.current.client) {
        console.log('INSIDE QUERY HOOK IF -> ', currentHook.memoizedState);
        const {tag, refId} = currentHook.memoizedState.current.epoch;
        refList.addRef(initialComponent, currentHook.memoizedState, refId, tag);
      }

      // covers Deep Memo Hooks (these will overwrite the "current" property when their key property doesn't match the query data from the query hook)
      if(currentHook.memoizedState && currentHook.memoizedState.current && currentHook.memoizedState.current.key) {
        refList.addRef(initialComponent, currentHook.memoizedState, 'deepMemo', refTags.deepMemoRef);
      }

      currentHook = currentHook.next !== currentHook ? currentHook.next : null;
    }
  }

  const componentId = componentStore.addComponent(
    hookStateObjsForComponentStore,
    initialComponent,
    treeId
  );
  return new CustomFiberNode(componentId, treeHooksStates, hooksFiber);
}

function createClassNode(reactFiber, componentStore, treeId) {
  // console.log('Creating Class Node');
  const { stateNode } = reactFiber;
  const componentId = componentStore.addComponent(stateNode.state, stateNode, treeId);

  return new CustomFiberNode(componentId, stateNode.state, reactFiber);
}

function createStatelessNode(reactFiber, treeId) {
  // console.log('Creating Stateless Node');
  return new CustomFiberNode(`${treeId}'Stateless'`, 'stateless', reactFiber);
}