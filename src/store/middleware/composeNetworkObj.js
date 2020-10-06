/* eslint-disable consistent-return */
import { composeNetworkQuery } from '../messagesAndActionTypes/networkActions';
import { ERROR } from '../messagesAndActionTypes/loggerActions';

const formFinalNetworkQuery = ({ getState, dispatch }) => (next) => async (
  action
) => {
  if (action.type !== composeNetworkQuery.type) return next(action);

  try {
    const state = getState().apollo;
    console.log('state', state);

    const { onSuccess, data } = action.payload;
    const { url, queryKey, responseData } = data;

    if (url !== state.graphQlUri) return;
    console.log('har obj -> ', action.payload);

    // const holdingKeys = Object.keys(state.networkHoldingRoom);
    // // console.log('holdingKeys ->', holdingKeys);
    // // console.log('netQString -> ', queryKey);

    const holdingQuery = state.networkHoldingRoom[queryKey];
    // console.log('holdingQ-QString', holdingQuery.queryString);

    const networkCache = await getAsyncCache();
    console.log('networkCache', networkCache);
    const networkQuery = { ...holdingQuery };

    networkQuery.response = JSON.parse(responseData);
    networkQuery.cacheSnapshot = networkCache;
    networkQuery.isNetwork = true;

    console.log('networkHoldingRoom in compose', state.networkHoldingRoom);

    dispatch({
      type: onSuccess,
      payload: { queryKey, hydratedQuery: networkQuery },
    });
  } catch (e) {
    dispatch({
      type: ERROR,
      payload: {
        title: 'Problem Hydrating Network Query Object',
        message: e.message,
        error: e,
      },
    });
  }
};

export default formFinalNetworkQuery;

/*
-----------------------
  HELPER
-----------------------
*/

function getAsyncCache() {
  return new Promise((resolve, reject) => {
    chrome.devtools.inspectedWindow.eval(
      'window.__APOLLO_CLIENT__.queryManager.cache.data.data',
      (netCache) => {
        resolve(netCache);
      }
    );
  });
}
