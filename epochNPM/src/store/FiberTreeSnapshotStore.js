/*
TEMP ________
This is in place should we want to extend the app into full React State time travel
It is currently NOT IN USE for basic Apollo cache time travel.
*/

/*
------------------
  Data Structure
------------------

componentStore = {
  nextComponentId
  [componentId]: {stateObj, actualComponent} - actualComponent is straight from react
}

stateObj = {classComponentState, hooksStates: [hookStateObj]} - classComponent State and hookStateObj are straight from React

*/

function ComponentStore() {
  let nextComponentId = 0;
  const historicalComponents = {};

  Object.defineProperties(this, {
    historicalComponents: {
      get() {
        return historicalComponents;
      },
    },

    nextComponentId: {
      get() {
        return nextComponentId;
      },
      set(x) {
        nextComponentId += 1;
      },
    },
  });
}

ComponentStore.prototype.addComponent = function (stateDataStructure, actualComponent, treeId) {
  // Create stateObj -- cover Hooks Cases (array of states), and class cases (state Obj)
  let stateObj;
  if (Array.isArray(stateDataStructure)) stateObj = { hooksStates: stateDataStructure };
  else {
    stateObj = { classComponentState: stateDataStructure };
  }

  const componentId = `${treeId}${this.nextComponentId}`;
  this.historicalComponents[componentId] = { stateObj, actualComponent };
  this.nextComponentId += 1;
  return componentId;
};

ComponentStore.prototype.getComponent = function (componentId) {
  return this.historicalComponents[componentId];
};

export default ComponentStore;
