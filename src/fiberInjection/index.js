/* eslint-disable no-underscore-dangle */
/*
 The entry point for our bundle that will be injected into the DOM
 Creates windowListener that will receive messages from Epoch App / Content Script
*/

import sendMessageTypes from '../store/messagesAndActionTypes/messageTypes';
import componentStore from './componentStore';

const epochHookProp = '__APOLLO_EPOCH_FIBER_HOOK';
const epochHookObj = {
  componentStore,
  testFunction: eatMyShorts,
};

window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  const epochHook = window[epochHookProp];

  if (event.data && event.data.type === sendMessageTypes.epoch.getFiberTree) {
    // webpack should insert messageString above
    const { tabId } = event.data;
    const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    const fiberRoot = devTools.getFiberRoots(1).values().next().value;
    epochHook[tabId] = fiberRoot;
  }

  if (event.data && event.data.type === sendMessageTypes.epoch.tardis) {
    const { tabId } = event.data;
    epochHook.testFunction();
    console.log('rootFiber ->', epochHook.componentStore[tabId]);
  }
});

window[epochHookProp] = epochHookObj;

function eatMyShorts() {
  console.log('Your shorts have been et');
}
