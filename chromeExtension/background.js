import sendMessageTypes from '../src/store/messagesAndActionTypes/messageTypes';

/*
MESSAGE PARAMETERS
All Error Messages in Shape of : {type: senderType, payload: {title:, message:, errorObj:}}
All Log Messages in Shape of : { type: senderType, payload: {title:, data:}}
All Data Transfer Messages in Shape of : { type: senderType, payload: dataObj}
All informational messages can be log messages sans data (data property on payload will print as undefined)
*/

const { epoch, contentScript, background } = sendMessageTypes;

console.log('Background Script Initialized');
const connections = {}; // {tabId, epochPort}
const networkStore = {}; // catches queries and mutations that are awaiting network responses
const preEpochCaches = {}; // {tabId, cacheResponses: [cacheObj]};
const graphQlUrls = {}; // {tabId, graphQlUrl} --> Avoids multiple instance of same URL
const noApollos = new Set(); // {tabId}
const computeGraphQlUrlArray = () => {
  const tabIds = Object.keys(graphQlUrls);
  return tabIds.map((tabId) => graphQlUrls[tabId]); // accounts for multiple tab instances
};

/*--------------------------
   INJECT TIMETRAVEL
---------------------------*/
function injectTimeTravel(tabId) {
  chrome.tabs.executeScript(tabId, {
    code: `
    // Function will attach script to the dom 
    const injectScript = (file, tag) => {
      const htmlBody = document.getElementsByTagName(tag)[0];
      const script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', file);
      htmlBody.appendChild(script);
    };
    injectScript(chrome.runtime.getURL('fiberInjection.js'), 'body');
  `,
  });
}

/*
---------------------------
NETWORK REQUEST LISTENERS
---------------------------
*/

// Need to Keep coverage for NON user initiated queries

const networkListener = (requestDetails) => {
  const { tabId: portId } = requestDetails;
  console.log('Net Req Details -> ', requestDetails);

  if (!portId) {
    console.log('No Tab on Request -> ', requestDetails);
    return;
  }

  // Create queryCatcher (DOES NOT ACCOUNT FOR BATCH REQUESTS)
  if (requestDetails.method === 'POST') networkStore[requestDetails.requestId] = 'awaitingObject';

  // Get cache snapshot in case this request was not triggered by user (if it was ID counts should be the same)
  // chrome.tabs.sendMessage(requestDetails.tabId, { type: background });

  if (!connections[portId]) {
    console.log(`No Epoch Panel ${portId} to send Apollo Data -> `, requestDetails);
    return;
  }

  connections[portId].postMessage({
    type: background.log,
    payload: { title: 'webRequestListen', data: requestDetails },
  });
};

const networkResponseListener = (responseDetails) => {
  console.log('Response to Most Recent Request', responseDetails);
};

chrome.webRequest.onBeforeRequest.addListener(networkListener, { urls: computeGraphQlUrlArray() });
chrome.webRequest.onCompleted.addListener(networkResponseListener, {
  urls: computeGraphQlUrlArray(),
});

/*
--------------------------------
CONTENT SCRIPT COMMUNICATION
--------------------------------
*/

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === contentScript.initialize) {
    console.log('Content Script Initialized');

    const portId = sender.tab.id;
    injectTimeTravel(portId); // TEST MOVE THIS LATER AND ADD LOGIC TO MAKE SURE ONLY ONE!!
    if (connections[portId]) {
      connections[portId].postMessage({
        type: background.log,
        payload: { title: `Background connected to content and Epoch Panel Instance ${portId}` },
      });
    }

    if (connections[portId]) {
      connections[portId].postMessage({
        type: background.clearData,
      });
    }

    sendResponse({ type: 'Background Connected to Content' });
  }

  if (message.type === contentScript.log) {
    const portId = sender.tab.id;
    if (!connections[portId]) {
      console.log(`No Epoch Panel Connection Id ${portId} for Content Log`, message.payload);
      return;
    }
    connections[portId].postMessage({ type: background.log, payload: message.payload });
  }

  if (message.type === contentScript.apolloReceived) {
    const apolloData = message.payload;
    const portId = sender.tab.id;
    const { graphQlUri } = apolloData;

    // Ensure our network listeners are always up to date
    if (graphQlUri && graphQlUri !== graphQlUrls[portId]) {
      graphQlUrls[portId] = graphQlUri;

      /*
      --------------
        TO DELETE - SELECTIVELY - Keep addition of array to some
      --------------
      */
      // ------------------------------------------------------------------
      // Update URL filter list in webRequest Listeners
      chrome.webRequest.onBeforeRequest.removeListener(networkListener);
      chrome.webRequest.onBeforeRequest.addListener(networkListener, {
        urls: computeGraphQlUrlArray(),
      });
      chrome.webRequest.onCompleted.removeListener(networkResponseListener);
      chrome.webRequest.onCompleted.addListener(networkResponseListener, {
        urls: computeGraphQlUrlArray(),
      });
    }
    // --------------------------------------------------------------------

    // Handle no Epoch Panel Initialized. Takes into account multiple tabs
    if (!connections[portId]) {
      if (!preEpochCaches[portId]) preEpochCaches[portId] = [];
      preEpochCaches[portId].push(apolloData);

      console.log(`No Epoch Panel ${portId} to send Apollo Data -> `, apolloData);
      return;
    }

    // Handles Transfer of Data to Epoch. Passes current cache or cache history depending on when Epoch was initialized
    let allApolloData = apolloData;
    if (preEpochCaches[portId]) {
      allApolloData = [...preEpochCaches[portId], apolloData];
      delete preEpochCaches[portId];
    }
    connections[portId].postMessage({ type: background.apolloReceived, payload: allApolloData });
  }

  if (message.type === contentScript.apolloReceivedManual) {
    const apolloData = message.payload;

    const portId = sender.tab.id;
    if (!connections[portId]) {
      console.log(`No Epoch Panel ${portId} to send Apollo Data -> `, apolloData);
      return;
    }
    connections[portId].postMessage({
      type: background.apolloReceivedManual,
      payload: apolloData,
    });
  }

  if (message.type === contentScript.noApolloClient) {
    const portId = sender.tab.id;

    // Handle when content script loads and there's no Epoch panel Open
    if (!connections[portId]) {
      noApollos.add(portId);
      console.log(`No Epoch Panel Connection Id ${portId} for No Apollo Client Log`);
    }
    connections[portId].postMessage({
      type: background.noApolloClient,
    });
  }

  if (message.type === contentScript.fiberTreeReceived) {
    console.log('Fiber Tree From Client App');
  }
});

/*
---------------------------
EPOCH PANEL COMMUNICATION
---------------------------
*/

chrome.runtime.onConnect.addListener((port) => {
  // create Listener that will save connection instance (port) for later use AND respond
  // to messages sent via that connection instance -- in case Multiple Apollo tabs in use
  const epochListener = (message) => {
    console.log('messageObj', message);
    const { payload, type } = message;
    const { tabId, data } = payload;

    if (type === epoch.saveConnection) {
      connections[tabId] = port;
      connections[tabId].postMessage({
        type: background.log,
        payload: { title: `Background Save Connection Under ${tabId}` },
      });
      return;
    }

    if (type === epoch.initialize) {
      chrome.tabs.sendMessage(Number(tabId), message, (response) => {
        connections[tabId].postMessage(response);
      });
    }

    if (type === epoch.fetchApolloData) {
      chrome.tabs.sendMessage(Number(tabId), message, (response) => {
        connections[tabId].postMessage(response);
      });
    }

    if (type === epoch.getFiberTree) {
      console.log('tabId', message.payload);
      console.log('tabId', message.type);
      const newMessage = { type, payload: data }; // Strip out tabId from payload -- No longer necessary
      chrome.tabs.sendMessage(Number(tabId), newMessage, (response) => {
        connections[tabId].postMessage(response);
      });
    }
  };

  // Actually start listening by assigning listen handler to port Object as listener
  port.onMessage.addListener(epochListener);

  // Listen for onDisconnect event fired when epoch Ends the connection
  port.onDisconnect.addListener((portObj) => {
    // actually remove epochListener from the equation
    portObj.onMessage.removeListener(epochListener);

    // Also remove this connectionInstance from our list of epochInstances
    const tabIds = Object.keys(connections);
    tabIds.forEach((id) => {
      if (connections[id] === portObj) delete connections[id];
    });
  });
});

/*
-------------------------------------
HELPER FUNCTION
-------------------------------------
*/

// Checks is query / mutations are network requests and saves them if they are
function gateKeeper(apolloData) {}
