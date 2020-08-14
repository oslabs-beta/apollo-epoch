import * as React from 'react';
import { print } from 'graphql/language/printer';
import HistoryContainer from './HistoryContainer';
import InfoContainer from './InfoContainer';
import sendMessageTypes from '../util/messageTypes';
import '../styles/main.css';

const { epoch, contentScript, background } = sendMessageTypes;

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

      if (message.type === background.cache) {
        console.log('APP CACHE!!', message.payload);
        const documents = Object.keys(message.payload);

        documents.forEach((doc) => {
          const qString = print(message.payload[doc].document);
          console.log('qString', qString);
        });
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
    <div className="wrapper">
      <div className="main">
        <div className="heading">
          <h1>Hola Monde!!!</h1>
          <button onClick={getCache}>Get Cache</button>
        </div>
        <div className="containers-wrapper">
          <div className="containers">
            {/* // render out history  */}
            <HistoryContainer />
            {/* // render out info display */}
            <InfoContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
