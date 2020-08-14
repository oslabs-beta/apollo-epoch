// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   console.log('listener created');
//   if (msg.type === 'send cache') {
//     chrome.runtime.sendMessage({
//       type: 'cache to background',
//       payload: chrome.window.__APOLLO_CLIENT__.localState.cache.data.data,
//     });
//   }
// });

import sendMessageTypes from '../src/util/messageTypes';
import runInContext from '../src/util/contentScriptUtils';

const { epoch, contentScript } = sendMessageTypes;
console.log('contentScript Running');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === epoch.sayHello) {
    // const apollo = '__APOLLO_CLIENT__';
    // console.log('window', window);
    // console.log('apollo', window[apollo]);
    // const cache = window.__APOLLO_CLIENT__.localState.cache.data.data;
    console.log('Got a message from Epoch');
    runInContext(sendMessageWithCache);
    sendResponse({ type: contentScript.messingAround, payload: 'nuttin' });
  }
});

chrome.runtime.sendMessage({ type: 'helloFromContent', payload: 'HelloPayload' }, (response) => {
  console.log('contentScript received from Background');
  console.log(response.type);
});

window.addEventListener('message', (event) => {
  console.log('windowEvent', event.data);
  if (event.source !== window) return;
  console.log('contentWindowResponse', event);
  if (event.data && event.data.type === 'FROM_PAGE') {
    const cache = JSON.parse(event.data.payload);
    console.log('contentCache', cache);
    if (cache) {
      chrome.runtime.sendMessage({ type: contentScript.epochReceived, payload: cache });
      return;
    }
    chrome.runtime.sendMessage({ type: contentScript.epochReceived, payload: 'noCache' });
  }
});

const sendMessageWithCache = () => {
  function filterQueryInfo(queryInfoMap) {
    console.log('queryMap', queryInfoMap);

    const filteredQueryInfo = {};

    queryInfoMap.forEach((value, key) => {
      const queryObj = value;
      filteredQueryInfo[key] = {
        document: value.document,
        graphQLErrors: value.graphQLErrors,
        networkError: value.networkError,
        networkStatus: value.networkStatus,
        variables: value.variables,
      };
      if (queryObj && queryObj.observableQuery) {
        filteredQueryInfo[key].lastResult = queryObj.observableQuery.lastResult;
      }
    });
    return filteredQueryInfo;
  }
  window.postMessage(
    {
      type: 'FROM_PAGE',
      payload: JSON.stringify({
        queries: filterQueryInfo(window.__APOLLO_CLIENT__.queryManager.queries),
        info: {
          idCount: window.__APOLLO_CLIENT__.queryManager.queryIdCounter,
          requestCount: window.__APOLLO_CLIENT__.queryManager.requestIdCounter,
        },
      }),
    },
    '*'
  );
};
