/* eslint-disable no-shadow */
/*
A port is needed for two way communication between Epoch and the background scripts
in a chrome App. Communicating through the background should give us the freedom to use
Either a panel in DevTools OR a popup in the toolbar and share state. 

Each instance of Epoch will be tied to specific Tab. The background script will be
fielding traffic from all tabs and therefore all Epoch instances. This middleware
will be triggered once on app initialization and should create a superPort with the
tabId closed over and the ability to dispatch actions when messages are received from 
the backend. 
*/
import { print } from 'graphql/language/printer';
import {
  connectToBackground,
  connectionSuccess,
  connectionFailure,
} from '../chromeExMessages/initializeActions';
import sendMessageTypes from '../chromeExMessages/messageTypes';

const initializePort = ({ dispatch }) => (next) => (action) => {
  console.log('middleAction', action);
  if (action.type !== connectToBackground.type) return next(action);
  const { onSuccess } = action.payload;

  console.log('successWill call', onSuccess);

  const SuperPort = function (dispatchFunction) {
    const { epoch, contentScript, background } = sendMessageTypes;
    const { apolloActions } = action.payload;
    const { tabId } = chrome.devtools.inspectedWindow;
    const dispatch = dispatchFunction;
    const backgroundConnection = chrome.runtime.connect();
    console.log('tabId', tabId);
    backgroundConnection.postMessage({
      type: epoch.initializeConnection,
      payload: tabId,
    });

    backgroundConnection.onMessage.addListener((message, sender, sendResponse) => {
      console.log('message obj', message);
      if (message.type === contentScript.epochReceived) {
        dispatch({
          type: apolloActions.log,
          payload: { label: 'Content Script Opening Payload ->', payload: message.payload },
        });
        dispatch({ type: apolloActions.log, payload: { label: 'Sender Info ->', data: sender } });
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

    this.connection = backgroundConnection;
  };

  try {
    const superPort = new SuperPort(dispatch);
    console.log('making port', superPort);
    dispatch(connectionSuccess({ superPort }));
    if (onSuccess) dispatch({ type: onSuccess, payload: superPort });
  } catch (err) {
    dispatch(connectionFailure('Sorry'));
  }
};

export default initializePort;
