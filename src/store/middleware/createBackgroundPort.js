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
import {
  connectToBackground,
  connectionSuccess,
  connectionFailure,
} from '../messagesAndActionTypes/initializeActions';
import sendMessageTypes from '../messagesAndActionTypes/messageTypes';
import { log, error } from '../messagesAndActionTypes/loggerActions';

const initializePort = ({ dispatch }) => (next) => (action) => {
  if (action.type !== connectToBackground.type) return next(action);
  const { onSuccess } = action.payload;

  console.log('successWill call', onSuccess);

  const SuperPort = function (dispatchFunction) {
    const { epoch, contentScript, background } = sendMessageTypes;
    const { tabId } = chrome.devtools.inspectedWindow;
    const dispatch = dispatchFunction;
    const { apolloActions } = action.payload;
    const { receivedApollo, receivedApolloManual, noApollo, initializeCache } = apolloActions;
    const backgroundConnection = chrome.runtime.connect();

    backgroundConnection.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === contentScript.initialCacheCheck) {
        dispatch({ type: initializeCache });
      }

      if (message.type === background.log || message.type === contentScript.log) {
        dispatch(log(message.payload));
      }

      if (message.type === background.noApolloClient) {
        dispatch({ type: noApollo });
      }

      if (message.type === background.apolloReceivedManual) {
        dispatch({ type: receivedApolloManual, payload: message.payload });
      }

      if (message.type === background.apolloReceived) {
        dispatch({ type: receivedApollo, payload: message.payload });
      }
    });

    backgroundConnection.postMessage({
      type: epoch.saveConnection,
      payload: tabId,
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
    dispatch(
      error({ title: 'Error Connecting to Background Script', message: err.message, error: err })
    );
  }
};

export default initializePort;
