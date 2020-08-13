import sendMessageTypes from '../src/util/messageTypes';

const { epoch, contentScript } = sendMessageTypes;

console.log('Background Script Running');
const connections = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'helloFromContent') {
    console.log('received From Content', message.payload);
    sendResponse({ type: 'Back at you from Background' });
  }

  if (message.type === contentScript.messageReceived) {
    console.log('Background Message Activate!');
  }

  if (message.type === contentScript.epochReceived) {
    const resultObj = message.payload;
    // const { queryManager } = resultObj;
    // const cache = resultObj.localState.cache.data.data;
    console.log('ApolloClient', resultObj);
    // console.log('cache', cache);
    // console.log('qManager', queryManager);
  }
});

// Something to keep in mind, Epoch will have a different instance for each browser
// tab in which it's running
chrome.runtime.onConnect.addListener((port) => {
  // create Listener that will save connection instance (port) for later use AND respond
  // to messages sent via that connection instance

  const epochListener = (message, sender, sendResponse) => {
    const { payload: tabId, type } = message; // Custom Message object from epoch Instance
    console.log('epochListenerFired');
    if (type === epoch.initializeConnection) {
      connections[tabId] = port;
      return;
    }

    // Must inject content script declaratively or programatically to communicate with
    // tab instance of content script
    if (type === epoch.sayHello) {
      console.log('Background Passing Hello to Content');

      chrome.tabs.sendMessage(Number(tabId), message, (response) => {
        // response will be from contentScript
        console.log('tabId ->', tabId);
        console.log('messageResponse', response);
        console.log('Background passing response to Epoch');
        console.log('connections', connections);
        console.log('response tabId', tabId);
        connections[tabId].postMessage(response);
      });
      // return true;
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
