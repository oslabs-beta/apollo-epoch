const connections = {};

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    if (msg.type === 'send cache') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, msg, (res) => {
          // sendResponse({ msg: res.msg });
          connections[tabs[0].id] = port;
        });
      });
    }
  });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log('sender ->', sender);
  if (msg.type === 'cache to background') {
    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //   connections[tabs[0].id]
    // }
    chrome.storage.local.set({ cacheCopy: msg.payload });
  }
});
