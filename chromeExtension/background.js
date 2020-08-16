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
const connections = {};

/*
--------------------------------
CONTENT SCRIPT COMMUNICATION
--------------------------------
*/

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === contentScript.initialize) {
    console.log('Content Script Initialized');

    const portId = sender.tab.id;
    if (connections[portId]) {
      connections[portId].postMessage({
        type: background.log,
        payload: { title: `Background connected to content and Epoch Panel Instance ${portId}` },
      });
    }
    sendResponse({ type: 'Background Connected to Content' });
  }

  if (message.type === contentScript.log) {
    const portId = sender.tab.id;
    if (connections[portId]) {
      connections[portId].postMessage({ type: background.log, payload: message.payload });
    }

    console.log(`No Epoch Panel Connection Id ${portId} for Content Log`, message.payload);
  }

  if (message.type === contentScript.apolloReceived) {
    const apolloData = message.payload;

    const portId = sender.tab.id;
    if (connections[portId]) {
      connections[portId].postMessage({ type: background.apolloReceived, payload: apolloData });
    }
    console.log(`No Epoch Panel ${portId} to send Apollo Data -> `, apolloData);
  }

  if (message.type === contentScript.apolloReceivedManual) {
    const apolloData = message.payload;

    const portId = sender.tab.id;
    if (connections[portId]) {
      connections[portId].postMessage({
        type: background.apolloReceivedManual,
        payload: apolloData,
      });
    }
    console.log(`No Epoch Panel ${portId} to send Apollo Data -> `, apolloData);
  }

  if (message.type === contentScript.noApolloClient) {
    const portId = sender.tab.id;
    if (connections[portId]) {
      connections[portId].postMessage({
        type: background.noApolloClient,
      });
    }

    console.log(`No Epoch Panel Connection Id ${portId} for No Apollo Client Log`);
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
  const epochListener = (message, sender, sendResponse) => {
    const { payload: tabId, type } = message;

    if (type === epoch.saveConnection) {
      connections[tabId] = port;
      sendResponse({
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
