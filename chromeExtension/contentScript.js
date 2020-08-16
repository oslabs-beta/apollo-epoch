/* eslint-disable no-underscore-dangle */
import sendMessageTypes from '../src/store/messagesAndActionTypes/messageTypes';
import runInContext from '../src/util/contentScriptUtils';

/*
MESSAGE PARAMETERS
All Error Messages in Shape of : {type: senderType, payload: {title:, message:, errorObj:}}
All Log Messages in Shape of : { type: senderType, payload: {title:, data:}}
All Data Transfer Messages in Shape of : { type: senderType, payload: dataObj}
All informational messages can be log messages sans data (data property on payload will print as undefined)
*/

const { epoch, contentScript, clientWindow } = sendMessageTypes;
console.log('contentScript Running');

/*
-----------------------
UTILITY INITIALIZATION
-----------------------
*/

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

/*
-------------------------
BACKGROUND COMMUNICATION 
-------------------------
*/
// On content script initialization this will be sent
chrome.runtime.sendMessage(
  { type: contentScript.initialize, payload: { title: 'Content Script Initialized' } },
  (response) => {
    console.log('Background connected to Content -> ', response.type);
  }
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === epoch.initialize) {
    console.log(epoch.initialize);

    const { queryCount, mutationCount } = counts.getCounts();
    runInContext(sendMessageWithCache, queryCount, mutationCount, true); // pass true for initialize param
    sendResponse({ type: contentScript.initialCacheCheck }); // this response triggers exponential backoff check in Epoch Panel
  }

  if (message.type === epoch.fetchApolloData) {
    const { queryCount, mutationCount } = counts.getCounts();
    runInContext(sendMessageWithCache, queryCount, mutationCount, false, true); // pass true for manual to flag response data
    sendResponse({ type: contentScript.log, payload: { title: 'Manual Fetch Triggered' } }); // should trigger response based on hasApollo in Redux
  }
});

/*
---------------------------
CLIENT APP LISTENERS
---------------------------
*/

window.addEventListener('message', (event) => {
  console.log('windowEvent', event.data);
  if (event.source !== window) return;
  if (event.data && event.data.type === clientWindow.noApolloClient) {
    chrome.runtime.sendMessage({
      type: contentScript.noApolloClient,
    });
    return;
  }

  if (event.data && event.data.type === clientWindow.queryUpdate) {
    const apolloData = JSON.parse(event.data.payload);

    if (apolloData) {
      if (apolloData.manual) {
        chrome.runtime.sendMessage({
          type: contentScript.apolloReceivedManual,
          payload: apolloData,
        });
        return;
      }

      chrome.runtime.sendMessage({ type: contentScript.apolloReceived, payload: apolloData });
      counts.updateCounts(apolloData.queryCount, apolloData.mutationCount);
      return;
    }
    chrome.runtime.sendMessage({
      type: contentScript.log,
      payload: { title: 'Counts Updated', data: 'But No Cache Object Avail on Window' },
    });
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const { queryCount, mutationCount } = counts.getCounts();
    runInContext(sendMessageWithCache, queryCount, mutationCount);

    // Debug
    chrome.runtime.sendMessage({
      type: contentScript.log,
      payload: {
        title: 'Enter Key Pressed',
        data: {
          currQCount: queryCount,
          currMCount: mutationCount,
        },
      },
    });
  }
});

window.addEventListener('click', (e) => {
  const { queryCount, mutationCount } = counts.getCounts();
  runInContext(sendMessageWithCache, queryCount, mutationCount);

  // Debug
  chrome.runtime.sendMessage({
    type: contentScript.log,
    payload: {
      title: 'Clicked',
      data: {
        currQCount: queryCount,
        currMCount: mutationCount,
      },
    },
  });
});

/*
-------------------------
UTILITY SCRIPT INJECTION
-------------------------
*/

/*
This script will be injected into the DOM. And posts a window message if
conditions are met. We listen for that window message in out content script
The content script and the client application share the DOM but not the same window objects.
This is how we're able to get the Apollo Cache created by the client application
into our application. Client App -> Content Script -> Background Script -> Epoch App 
*/
const sendMessageWithCache = (queryCount, mutationCount, initialize, manualFetch) => {
  const apolloData = window.____APOLLO_CLIENT__;

  if (!apolloData) {
    window.postMessage({ type: '$$$noApollo$$$' });
    return;
  }

  const { queryIdCounter } = apolloData.queryManager;
  const { mutationIdCounter } = apolloData.queryManager;

  // Debugging
  window.postMessage(
    {
      type: 'logPayload',
      payload: {
        title: 'Counters',
        data: {
          currQCount: queryCount,
          currMCount: mutationCount,
          cliQCount: queryIdCounter,
          cliMCount: mutationIdCounter,
        },
      },
    },
    '*'
  );
  console.log('initializeType', typeof initialize);
  console.log('manualType', typeof manualFetch);
  if (
    queryIdCounter <= queryCount &&
    mutationIdCounter <= mutationCount &&
    !initialize &&
    !manualFetch
  )
    return;

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
        manual: manualFetch,
        queries: filterQueryInfo(apolloData.queryManager.queries),
        queryCount: queryIdCounter,
        mutationCount: mutationIdCounter,
      }),
    },
    '*'
  );
};
