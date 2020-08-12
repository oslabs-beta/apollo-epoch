chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log('listener created');
  if (msg.type === 'send cache') {
    chrome.runtime.sendMessage({
      type: 'cache to background',
      payload: chrome.window.__APOLLO_CLIENT__.localState.cache.data.data,
    });
  }
});
