import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HistoryContainer from './HistoryContainer';
import InfoContainer from './InfoContainer';
import { initializeBackgroundConnection, postBackgroundMessage } from '../store/entities/apollo';
import sendMessageTypes from '../store/chromeExMessages/messageTypes';
import '../styles/main.css';

const { epoch, contentScript, background } = sendMessageTypes;

const App = () => {
  // eslint-disable-next-line no-shadow
  const state = useSelector((state) => state);
  console.log('state', state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log('Use Effect Fired');
    console.log('TabID in Effect', chrome.devtools.inspectedWindow.tabId);
    dispatch(initializeBackgroundConnection());
  }, []);

  const getCache = () => {
    dispatch(
      postBackgroundMessage({
        type: epoch.sayHello,
        payload: chrome.devtools.inspectedWindow.tabId,
      })
    );
  };

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
