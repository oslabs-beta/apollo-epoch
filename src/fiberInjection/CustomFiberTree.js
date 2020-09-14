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

class CustomFiberTree {
  constructor(hostRootFiber, componentStore, apolloActionId) {
    this.componentStore = componentStore;
    this.treeId = apolloActionId;
    this.circularFiberReference = new Set();
    this.rootFiber = this.traverseFiberTree(hostRootFiber, null);
  }

  processFiber(reactFiber) {
    const { tag, stateNode, memoizedState } = reactFiber;
    let customFiberNode;

    // React Fiber Tag List located here:
    if (stateNode && (tag === 0 || tag === 1 || tag === 2)) {
      customFiberNode = createClassNode(reactFiber, this.componentStore, this.treeId);
    }

    if (memoizedState && (tag === 0 || tag === 1 || tag === 2 || tag === 10)) {
      customFiberNode = createHooksNode(reactFiber, this.componentStore, this.treeId);
    }

    if (!customFiberNode && (tag === 0 || tag === 1 || tag === 2)) {
      customFiberNode = createStatelessNode(reactFiber);
    }

    return customFiberNode;
  }

  traverseFiberTree(reactFiber, parentNode) {
    const { sibling, child } = reactFiber;
    const currentNode = this.processFiber(reactFiber);

    // Children are stored as a linked list in each Fiber, so this will iterate through
    if (child && !this.circularFiberReference.has(child)) {
      this.circularFiberReference.add(child);
      currentNode.children.push(this.traverseFiberTree(child, currentNode));
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

function CustomFiberNode(componentId, parentNode, unserializedState, reactFiber) {
  const {
    elementType,
    actualDuration,
    actualStartTime,
    selfBaseDuration,
    treeBaseDuration,
  } = reactFiber;
  this.componentId = componentId;
  this.componentData = { actualDuration, actualStartTime, selfBaseDuration, treeBaseDuration };
  this.parent = parentNode;
  this.children = [];
  this.elementType = elementType.name;
  this.isStatefulComponent = !!unserializedState;
  console.log('ELEMENT TYPE IN CUSTOM FIBER NODE ->', elementType);

  if (unserializedState) this.componentData.serializedState = serializeState(unserializedState);
}

/*---------------------
      HELPERS
---------------------*/
function serializeState(unserializedState) {
  console.log('FLATTENING YOUR STATE! ->', unserializedState);
  return 'PLACEHOLDER STATE OBJ';
}

// These will instantiate CustomFiberNodes AND save data to the component store
function createHooksNode(reactFiber, treeId) {
  console.log('Creating Hooks Node');
}

function createClassNode(reactFiber, treeId) {
  console.log('Creating Class Node');
}

function createStatelessNode(reactFiber, treeId) {
  console.log('Creating Stateless Node');
}

// Create Hooks Node
// Create Class Node
// Create Stateless Node
