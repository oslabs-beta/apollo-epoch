import * as React from 'react';
import HistoryContainer from './HistoryContainer';
import InfoContainer from './InfoContainer';
import sendMessageTypes from '../util/messageTypes';

const { epoch, contentScript } = sendMessageTypes;

const App = () => {
  const [cache, setCache] = React.useState({});
  const [connection, setConnection] = React.useState({});

  React.useEffect(() => {
    console.log('Use Effect Fired');
    console.log('TabID in Effect', chrome.devtools.inspectedWindow.tabId);
    // set up listener for background messages
    const backgroundConnection = chrome.runtime.connect();

    backgroundConnection.postMessage({
      type: epoch.initializeConnection,
      payload: chrome.devtools.inspectedWindow.tabId,
    });

    backgroundConnection.onMessage.addListener((message, sender, sendResponse) => {
      console.log('message obj', message);
      if (message.type === contentScript.epochReceived) {
        console.log('Content Script Opening Payload ->', message.payload);
        console.log('Sender Info ->', sender);
        setCache(message.payload);
      }
    });

    setConnection(backgroundConnection);
  }, []);

  const getCache = () => {
    console.log('getting Cache');
    connection.postMessage({
      type: epoch.sayHello,
      payload: chrome.devtools.inspectedWindow.tabId,
    });
  };

  console.log('appCache', cache);
  return (
    <div className="main">
      <h1>Hola Monde!!!</h1>
      <button onClick={getCache}>Get Cache</button>
      {/* // render out history  */}
      <HistoryContainer />
      {/* // render out info display */}
      <InfoContainer />
    </div>
  );
};

export default App;
