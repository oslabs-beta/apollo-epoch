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

const { epoch, contentScript } = sendMessageTypes;
console.log('contentScript Running');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === epoch.sayHello) {
    const apollo = '__APOLLO_CLIENT__';
    console.log('window', window);
    console.log('apollo', window[apollo]);
    const cache = window.__APOLLO_CLIENT__.localState.cache.data.data;
    console.log('Got a message from Epoch');
    console.log('contentCache', cache);
    if (cache) sendResponse({ type: contentScript.epochReceived, payload: cache });
    sendResponse({ type: contentScript.epochReceived, payload: 'noCache' });
  }
});

chrome.runtime.sendMessage({ type: 'helloFromContent', payload: 'HelloPayload' }, (response) => {
  console.log('contentScript received from Background');
  console.log(response.type);
});
