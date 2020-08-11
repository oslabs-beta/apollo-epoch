const onMessageListener = function (message, sender, sendResponse) {
  switch (message.type) {
    case 'bglog':
      console.log(message.msg);
      break;
    case 'contentScript':
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
          sendResponse({ msg: response.msg });
        });
      });
      break;
  }
  return true;
};
chrome.runtime.onMessage.addListener(onMessageListener);
