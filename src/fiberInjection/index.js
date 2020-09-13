/* eslint-disable no-underscore-dangle */
/*
 The entry point for our bundle that will be injected into the DOM
 Creates windowListener that will receive messages from Epoch App / Content Script
*/

import componentStore from './componentStore';

const epochHookProp = '__APOLLO_EPOCH_FIBER_HOOK';
const epochHookObj = {
  componentStore,
  testFunction: eatMyShorts,
};

console.log('INJECTED SCRIPT EPOCH IS HERE');
console.log('INJECTED SCRIPT EPOCH IS HERE');

window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  console.log('LOGGING MESSAGES IN DOM LISTENER');
  const epochHook = window[epochHookProp];

  if (event.data && event.data.type === '$$$getFiberTree$$$') {
    console.log('GETTING ROOT FIBER');
    const { tabId } = event.data;
    const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    const fiberRoot = devTools.getFiberRoots(1).values().next().value;
    epochHook.componentStore[tabId] = fiberRoot;
  }

  if (event.data && event.data.type === 'initiateTimeJump') {
    const { tabId } = event.data;
    epochHook.testFunction();
    console.log('rootFiber ->', epochHook.componentStore[tabId]);
  }
});

window[epochHookProp] = epochHookObj;

function eatMyShorts() {
  console.log('Your shorts have been et');
}
