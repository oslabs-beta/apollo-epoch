/* eslint-disable func-names */
/*
  This module creates a store for unserializable component data, organized by tabID, that will live in the DOM

------------------
  Data Structure
------------------
tabStore = {
  [tabId]: componentStore
}

componentStore = {
  nextComponentId
  [componentId]: {stateObj, actualComponent} - actualComponent is straight from react
}

stateObj = {classComponentState, hooksStates: [hookStateObj]} - classComponent State and hookStateObj are straight from React

*/

function TabStore() {
  const tabStore = {};

  Object.defineProperties(this, {
    tabStore: {
      get() {
        return tabStore;
      },
    },
  });
}

TabStore.prototype.addComponentStore = function (tabId) {
  if (this.tabStore[tabId]) return `Component Store already exists for Tab Id: ${tabId}`;
  this.tabStore[tabId] = new ComponentStore();
  return this.tabStore[tabId];
};

TabStore.prototype.getComponentStore = function (tabId) {
  if (!tabId || !this.tabStore.tabId) return undefined; // stupid linting rule
  return this.tabStore[tabId];
};

TabStore.prototype.deleteComponentStore = function (tabId) {
  delete this.tabStore(tabId);
};

function ComponentStore() {
  let nextComponentId = 0;
  const components = {};

  Object.defineProperties(this, {
    components: {
      get() {
        return components;
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

ComponentStore.prototype.addComponent = function (stateObj, actualComponent, treeId) {
  const componentId = `${treeId}${this.nextComponentId}`;
  this.component[componentId] = { stateObj, actualComponent };
  this.nextComponentId += 1;
  return componentId;
};

ComponentStore.prototype.getComponent = function (componentId) {
  return this.components[componentId];
};

console.log('COMPONENT STORE IS INJECTED!');
export default TabStore;
