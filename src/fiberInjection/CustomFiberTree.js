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

import { memo } from 'react';

export default class CustomFiberTree {
  constructor(hostRootFiber, componentStore, apolloActionId) {
    this.componentStore = componentStore;
    this.treeId = apolloActionId;
    this.circularFiberReference = new Set();
    console.log('HOST ROOT FIBER IN TREE ->', hostRootFiber);
    this.rootFiber = this.traverseFiberTree(hostRootFiber.current, null);
    console.log('RootFiber in Tree -> ', this.rootFiber);
    this.componentStore = null;
    this.circularFiberReference = null;
  }

  processFiber(reactFiber) {
    const { tag, stateNode, memoizedState } = reactFiber;
    let customFiberNode;

    // React Fiber Tag List located here:
    if (stateNode && stateNode.state && (tag === 0 || tag === 1 || tag === 2)) {
      customFiberNode = createClassNode(reactFiber, this.componentStore, this.treeId);
    }

    if (memoizedState && (tag === 0 || tag === 1 || tag === 2 || tag === 10)) {
      customFiberNode = createHooksNode(reactFiber, this.componentStore, this.treeId);
    }

    if (!customFiberNode && (tag === 0 || tag === 1 || tag === 2 || tag === 3)) {
      customFiberNode = createStatelessNode(reactFiber, this.treeId);
    }
    console.log('CURRENT REACT FIBER -> ', reactFiber);
    console.log('CURRENT CUSTOM FIBER NODE ->', customFiberNode);
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
  console.log('ELEMENT TYPE IN CUSTOM FIBER NODE ->', elementType);

  if (unserializedState) {
    this.componentData.serializedState = serializeState(unserializedState);
    this.isStatefulComponent = true;
  }
}

/*---------------------
      HELPERS
---------------------*/
function serializeState(unserializedState) {
  console.log('FLATTENING YOUR STATE! ->', unserializedState);
  return 'PLACEHOLDER STATE OBJ';
}

// These will instantiate CustomFiberNodes AND save unserialized data to the component store
// Hooks states are stored as a linked list in the reactFiber on the memoizedState property
// The queue should be the component in which the hooks reside
function createHooksNode(reactFiber, componentStore, treeId) {
  console.log('Creating Hooks Node');
  let { memoizedState } = reactFiber;
  const hookStateObjsForComponentStore = [];
  const treeHooksStates = [];
  const initialComponent = memoizedState.queue;

  // Look to refactor this if ALL the queues are the same ref
  if (initialComponent) {
    while (memoizedState && memoizedState.queue) {
      if (
        memoizedState.memoizedState &&
        memoizedState.queue.lastRenderedReducer &&
        memoizedState.queue.lastRenderedReducer.name === 'basicStateReducer'
      ) {
        const { memoizedState: state, queue } = memoizedState;
        hookStateObjsForComponentStore.push({
          state,
          actualComponent: queue,
        });
        treeHooksStates.push(state);
      }
      memoizedState = memoizedState.next !== memoizedState ? memoizedState.next : null;
    }
  }

  const componentId = componentStore.addComponent(
    hookStateObjsForComponentStore,
    initialComponent,
    treeId
  );
  return new CustomFiberNode(componentId, treeHooksStates, reactFiber);
}

function createClassNode(reactFiber, componentStore, treeId) {
  console.log('Creating Class Node');
  const { stateNode } = reactFiber;
  const componentId = componentStore.addComponent(stateNode.state, stateNode, treeId);

  return new CustomFiberNode(componentId, stateNode.state, reactFiber);
}

function createStatelessNode(reactFiber, treeId) {
  console.log('Creating Stateless Node');
  return new CustomFiberNode(`${treeId}'Stateless'`, 'stateless', reactFiber);
}
