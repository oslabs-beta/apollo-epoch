import sendMessageTypes from '../src/store/chromeExMessages/messageTypes';
import runInContext from '../src/util/contentScriptUtils';

const { epoch, contentScript, clientWindow } = sendMessageTypes;
console.log('contentScript Running');

// Apollo client tracks queries and mutations with ID counts. If those counts have not
// changed, we're wasting a lot resources firing messages that don't need to go.
// This function should prevent that extra work.
const counts = (function initializeCounts() {
  let queryCount = 1;
  let mutationCount = 1;

  return {
    getCounts() {
      return { queryCount, mutationCount };
    },

    updateCounts(newQueryCount, newMutationCount) {
      queryCount = newQueryCount;
      mutationCount = newMutationCount;
    },
  };
})();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === epoch.sayHello) {
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
  if (event.data && event.data.type === clientWindow.queryUpdate) {
    const cache = JSON.parse(event.data.payload);
    console.log('contentCache', cache);
    if (cache) {
      chrome.runtime.sendMessage({ type: contentScript.epochReceived, payload: cache });
      counts.updateCounts(cache.queryCount, cache.mutationCount);
      return;
    }
    chrome.runtime.sendMessage({ type: contentScript.epochReceived, payload: 'noCache' });
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const { queryCount, mutationCount } = counts.getCounts();
    runInContext(sendMessageWithCache, queryCount, mutationCount);
    chrome.runtime.sendMessage({ type: contentScript.messingAround, payload: 'nuttin' });
  }
});

window.addEventListener('click', (e) => {
  const { queryCount, mutationCount } = counts.getCounts();
  runInContext(sendMessageWithCache, queryCount, mutationCount);
  chrome.runtime.sendMessage({ type: contentScript.messingAround, payload: 'nuttin' });
});

/*
This script will be injected into the DOM. And posts a window message if
conditions are met. We listen for that window message in out content script
The content script and the client application share the DOM but not the same window objects.
This is how we're able to get the Apollo Cache created by the client application
into our application. Client App -> Content Script -> Background Script -> Epoch App 
*/
const sendMessageWithCache = (queryCount, mutationCount) => {
  const { queryIdCounter } = window.__APOLLO_CLIENT__.queryManager;
  const { mutationIdCounter } = window.__APOLLO_CLIENT__.queryManager;

  console.log('qc, apqc -> ', queryCount, queryIdCounter);
  console.log('mc, apmc -> ', mutationCount, mutationIdCounter);

  if (queryIdCounter <= queryCount && mutationIdCounter <= mutationCount) return;

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
      type: '$$$queryUpdate$$$',
      payload: JSON.stringify({
        queries: filterQueryInfo(window.__APOLLO_CLIENT__.queryManager.queries),
        queryCount: queryIdCounter,
        mutationCount: mutationIdCounter,
      }),
    },
    '*'
  );
};
