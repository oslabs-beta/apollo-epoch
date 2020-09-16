/*
Much in the same way we created a port that could utilize the redux dispatch function, 
our network listener will also have to dispatch actions. We'll create it here when the
correct action is fired. No need to store the result of the addListenerfunction in state
Once the code is run, we should be listening. 
*/

import { initializeNetworkListener } from '../messagesAndActionTypes/initializeActions';
// import { appendNetResponseToQuery } from '../messagesAndActionTypes/networkActions';
import { passHarToCompose } from '../entities/apollo';
import { LOG, ERROR } from '../messagesAndActionTypes/loggerActions';

const listenToNetwork = ({ dispatch }) => (next) => (action) => {
  if (action.type !== initializeNetworkListener.type) return next(action);

  try {
    console.log('Creating Network Listener');

    chrome.devtools.network.onRequestFinished.addListener(async (responseHar) => {
      if (responseHar.request.method !== 'POST') return;

      const { request } = responseHar;
      const requestPayload = JSON.parse(request.postData.text);
      const queryKey = requestPayload.query;

      function obtainResponseData(responseObj) {
        return new Promise((resolve, reject) => {
          console.log('calling get Content');
          // Timeout prevents problems in dev on local database. Net requests are returned too fast for this to grab
          // a query out of the network holding area
          responseObj.getContent((data) => setTimeout(() => resolve(data), 10, data));
        });
      }
      console.log('responseHAR', responseHar);
      const responseData = await obtainResponseData(responseHar);

      const filteredHar = {
        url: request.url,
        queryKey,
        responseData,
      };

      dispatch(passHarToCompose(filteredHar));
    });

    // Debug
    dispatch({ type: LOG, payload: { title: 'Epoch Side Network Listener Initialized' } });
  } catch (e) {
    dispatch({
      type: ERROR,
      payload: { title: 'Network Listener Failed to Initialize', message: e.message, error: e },
    });
  }
};

export default listenToNetwork;
