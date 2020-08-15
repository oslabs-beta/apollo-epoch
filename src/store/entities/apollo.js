/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';
import { connectToBackground } from '../chromeExMessages/initializeActions';

let superPort;

const initialState = {
  chromeTabId: '',
  graphQlUri: '',
  queryIds: [],
  queries: {},
  queryIdCounter: 0,
  mutationIds: [],
  mutations: {},
  mutationIdCounter: 0,
  timeline: [], // an ordered list of query and mutation Ids
  typeNameDocumentCache: {},
};

/* 
queryObjShape: {
  id
  queryString,
  variables,
  cache,
  diff,
}
*/

/*--------------
  Action Types
----------------*/
const STARTING_UP = 'startingUp'; // For debugging
const PORT_INITIALIZED = 'portInitialized';
const POST_BACKGROUND_MESSAGE = 'callBackground';
const LOG_STUFF = 'logStuff'; // To be changed when it's not midnight

/*--------------
  Action Creators
----------------*/
// eslint-disable-next-line import/prefer-default-export
export const startingUp = createAction(STARTING_UP); // no payload
export const initializedPort = createAction(PORT_INITIALIZED); // superPortObj
export const postBackgroundMessage = createAction(POST_BACKGROUND_MESSAGE); // messageObj: {type, payload}
export const logStuff = createAction(LOG_STUFF); // payload {label, data}

/*--------------
  Reducer
----------------*/
const apolloReducer = createReducer(initialState, {
  [PORT_INITIALIZED]: initializePortCase,
  [POST_BACKGROUND_MESSAGE]: callBackgroundCase,
  [STARTING_UP]: startingUpCase,
  [LOG_STUFF]: logStuffCase,
});

/*--------------
  Reducer Cases
----------------*/
function startingUpCase(state, action) {
  console.log('Initializing Port');
}

function initializePortCase(state, action) {
  superPort = action.payload;
}

function callBackgroundCase(state, action) {
  superPort.connection.postMessage(action.payload);
}

function logStuffCase(state, action) {
  const { label, data } = action.payload;
  console.log(label, data);
}

export default apolloReducer;

// Returns function that, when called creates an API action object with the following payload
// This is set up to take a user ID and send it to the backend as a param
export const initializeBackgroundConnection = () =>
  connectToBackground({
    onStart: STARTING_UP,
    onSuccess: PORT_INITIALIZED,
    apolloActions: { log: LOG_STUFF },
  });
