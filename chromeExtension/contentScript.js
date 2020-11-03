/* eslint-disable no-underscore-dangle */
import sendMessageTypes from '../src/store/messagesAndActionTypes/messageTypes';
import injectAndRunInDom from '../src/util/contentScriptUtils';

/*
MESSAGE PARAMETERS
All Error Messages in Shape of : {type: senderType, payload: {title:, message:, errorObj:}}
All Log Messages in Shape of : { type: senderType, payload: {title:, data:}}
All Data Transfer Messages in Shape of : { type: senderType, payload: dataObj}
All informational messages can be log messages sans data (data property on payload will print as undefined)
*/

const timeout = 10; // ms to wait for Apollo to update
const { epoch, contentScript, clientWindow, background } = sendMessageTypes;

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
  {
    type: contentScript.initialize,
    payload: { title: 'Content Script Initialized' },
  },
  (response) => {
    console.log('Background connected to Content -> ', response.type);
  }
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === epoch.initialize) {
    const { queryCount, mutationCount } = counts.getCounts();
    window.postMessage({ type: epoch.initialize }, '*'); // Query Client App to indicate whether or not time travel is activated
    injectAndRunInDom(sendMessageWithCache, queryCount, mutationCount, true); // pass true for initialize param
    // sendResponse({ type: contentScript.initialCacheCheck }); // this response triggers exponential backoff check in Epoch Panel (not yet implemented)
  }

  if (message.type === epoch.fetchApolloData) {
    const { queryCount, mutationCount } = counts.getCounts();
    injectAndRunInDom(sendMessageWithCache, queryCount, mutationCount, false, true); // pass true for manual to flag response data
    sendResponse({
      type: contentScript.log,
      payload: { title: 'Manual Fetch Triggered' },
    }); // should trigger response based on hasApollo in Redux
  }

  // Only happens on network request
  if (message.type === background.fetchFullApolloData) {
    const { queryCount, mutationCount } = counts.getCounts();
    injectAndRunInDom(sendMessageWithCache, queryCount, mutationCount);
  }

  // Only happens on network responses
  if (message.type === background.fetchFullApolloData) {
    const { queryCount, mutationCount } = counts.getCounts();
    injectAndRunInDom(sendMessageWithCache, queryCount, mutationCount, false, true); // fire manually to bypass counts check
  }

  // Create State Snapshot when Q/M/Manual Fetch is stored in Redux
  if (message.type === epoch.createSnapshot) {
    window.postMessage({ type: epoch.createSnapshot, payload: message.payload }, '*');
  }

  // Initiate Apollo State Change (payload should be Apollo Action Id)
  if (message.type === epoch.epochShift) {
    window.postMessage({ type: epoch.epochShift, payload: message.payload }, '*');
  }
});

/*
---------------------------
CLIENT APP LISTENERS
---------------------------
*/

window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  if (event.data && event.data.type === clientWindow.noApolloClient) {
    chrome.runtime.sendMessage({
      type: contentScript.noApolloClient,
    });
    return;
  }

  if (event.data && event.data.type === clientWindow.timeTravelPossible) {
    chrome.runtime.sendMessage({
      type: clientWindow.timeTravelPossible,
      payload: event.data.payload,
    });
    return;
  }

  if (event.data && event.data.type === clientWindow.log) {
    chrome.runtime.sendMessage({
      type: contentScript.log,
      payload: event.data.payload,
    });
    return;
  }

  if (event.data && event.data.type === clientWindow.epochShiftComplete) {
    const { queryCount, mutationCount } = counts.getCounts();
    const epochShiftTo = event.data.payload; // Apollo Action Id from Client App
    injectAndRunInDom(sendMessageWithCache, queryCount, mutationCount, false, true, epochShiftTo); // pass true for manual and epoch shift to flag response data
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

      chrome.runtime.sendMessage({
        type: contentScript.apolloReceived,
        payload: apolloData,
      });
      counts.updateCounts(apolloData.queryCount, apolloData.mutationCount);
      return;
    }
    chrome.runtime.sendMessage({
      type: contentScript.log,
      payload: {
        title: 'Counts Updated',
        data: 'But No Cache Object Avail on Window',
      },
    });
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const { queryCount, mutationCount } = counts.getCounts();

    // Get Cache AFTER Apollo updates
    setTimeout(() => {
      injectAndRunInDom(sendMessageWithCache, queryCount, mutationCount);
    }, timeout);

    // Debug
    // chrome.runtime.sendMessage({
    //   type: contentScript.log,
    //   payload: {
    //     title: 'Enter Key Pressed',
    //     data: {
    //       currQCount: queryCount,
    //       currMCount: mutationCount,
    //     },
    //   },
    // });
  }
});

window.addEventListener('click', (e) => {
  const { queryCount, mutationCount } = counts.getCounts();

  // Get Cache AFTER Apollo updates
  setTimeout(() => {
    injectAndRunInDom(sendMessageWithCache, queryCount, mutationCount);
  }, timeout);

  // Debug
  // chrome.runtime.sendMessage({
  //   type: contentScript.log,
  //   payload: {
  //     title: 'Clicked',
  //     data: {
  //       currQCount: queryCount,
  //       currMCount: mutationCount,
  //     },
  //   },
  // });
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
const sendMessageWithCache = (
  queryCount,
  mutationCount,
  initialize,
  manualFetch,
  apolloActionId
) => {
  const apolloData = window.__APOLLO_CLIENT__.queryManager;
  if (!apolloData) {
    window.postMessage({ type: '$$$noApollo$$$' });
    return;
  }

  // Get and format Data we need from window Obj
  const { queryIdCounter, mutationIdCounter, queries, mutationStore, link, cache } = apolloData;
  const { store: mutations } = mutationStore;

  let graphQlUri;
  let cacheInstance;

  if (link && link.options) graphQlUri = link.options.uri;
  if (cache && cache.data) cacheInstance = cache.data.data;

  // Debugging
  // window.postMessage(
  //   {
  //     type: 'logPayload',
  //     payload: {
  //       title: 'Counters',
  //       data: {
  //         currQCount: queryCount,
  //         currMCount: mutationCount,
  //         cliQCount: queryIdCounter,
  //         cliMCount: mutationIdCounter,
  //       },
  //     },
  //   },
  //   '*'
  // );

  if (
    queryIdCounter <= queryCount &&
    mutationIdCounter <= mutationCount &&
    !initialize &&
    !manualFetch
  )
    return;

  // Get necessary query data
  function filterQueryInfo(queryInfoMap) {
    const filteredQueryInfo = [];

    queryInfoMap.forEach((value, key) => {
      const queryObj = value;

      let lastResult;
      let name;
      if (queryObj && queryObj.observableQuery) {
        lastResult = queryObj.observableQuery.lastResult;
        name = queryObj.observableQuery.queryName;
      }

      filteredQueryInfo.push({
        // id: `Q${key}${queryIdCounter}`, // prevents duplicate Ids in Epoch
        id: `Q${key}`,
        document: value.document,
        graphQLErrors: value.graphQLErrors,
        networkError: value.networkError,
        networkStatus: value.networkStatus,
        variables: value.variables,
        isNetwork: false,
        timingData: null,
        name,
        lastResult,
      });
    });
    return filteredQueryInfo;
  }

  function filterMutationInfo(mutationStoreObj) {
    const mutationIds = Object.keys(mutationStoreObj);

    return mutationIds.reduce((filteredMutations, id) => {
      const mutationObj = mutationStoreObj[id];
      // eslint-disable-next-line no-param-reassign
      filteredMutations.push({
        // id: `M${id}${mutationIdCounter}`, // prevents duplicate Ids in Epoch
        id: `M${id}`,
        document: mutationObj.mutation,
        name: mutationObj.mutation.definitions[0].name.value,
        error: mutationObj.error,
        loading: mutationObj.loading,
        variables: mutationObj.variables,
        isNetwork: false,
        timingData: null,
      });
      return filteredMutations;
    }, []);
  }

  window.postMessage(
    {
      type: '$$$queryUpdate$$$',
      payload: JSON.stringify({
        manual: manualFetch,
        epochShift: apolloActionId,
        graphQlUri,
        queries: filterQueryInfo(queries), // array of Query objs
        mutations: filterMutationInfo(mutations), // array of Mutation objs
        cache: cacheInstance,
        queryCount: queryIdCounter,
        mutationCount: mutationIdCounter,
        prevQueryCount: queryCount,
        prevMutationCount: mutationCount,
      }),
    },
    '*'
  );
};

injectAndRunInDom(sendMessageWithCache, 1, 1, true); // pass true for initialize param
