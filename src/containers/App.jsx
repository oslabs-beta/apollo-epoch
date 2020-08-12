import * as React from 'react';
import HistoryContainer from './HistoryContainer';
import InfoContainer from './InfoContainer';

const App = () => {
  React.useEffect(() => {
    // chrome.devtools.network.onRequestFinished.addListener((req) => {
    //   console.log('req is ->', req);
    //   if ()
    // });
    const connection = chrome.runtime.connect();
    connection.onMessage.addListener((msg) => {
      if (msg.type === 'cache') {
        console.log('msg.payload ->', msg.payload);
      }
    });
    connection.postMessage({
      type: 'send cache',
      payload: chrome.devtools.inspectedWindow.tabId,
    });
  }, []);

  return (
    <div className="main">
      {/* // render out history  */}
      <HistoryContainer />
      {/* // render out info display */}
      <InfoContainer />
    </div>
  );
};

export default App;
