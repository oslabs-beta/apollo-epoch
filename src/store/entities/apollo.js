/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';
import { connectToBackground } from '../messagesAndActionTypes/initializeActions';
import sendMessageTypes from '../messagesAndActionTypes/messageTypes';

let superPort;

const initialState = {
  hasDunderApollo: false,
  chromeTabId: '',
  graphQlUri: '',
  queryIds: [],
  queries: {},
  queryIdCounter: 0,
  mutationIds: [],
  mutations: {},
  mutationIdCounter: 0,
  manualFetches: {}, // store manual cacheFetches in Timeline
  manualFetchIds: [],
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
/*
      Backgroung.noApolloClient
      background.apolloReceivedManual
      background.apolloReceived
      background.log
      contentScript.initializeCacheCheck
      conntentScript.log
      */
const STARTING_UP = 'startingUp'; // For debugging
const PORT_INITIALIZED = 'portInitialized';
const POST_BACKGROUND_MESSAGE = 'callBackground';
const NO_APOLLO = 'noApolloClient';
const FETCH_APOLLO = 'fetchApolloData';
const RECEIVED_MANUAL_FETCH = 'apolloReceivedManual';
const RECEIVED_APOLLO = 'apolloReceived';
const INITIALIZED_CACHE_CHECK = 'initializedCache';

/*--------------
  Action Creators
----------------*/
// eslint-disable-next-line import/prefer-default-export
export const startingUp = createAction(STARTING_UP); // no payload
export const initializedPort = createAction(PORT_INITIALIZED); // superPortObj
export const postBackgroundMessage = createAction(POST_BACKGROUND_MESSAGE); // messageObj: {type, payload}
export const noApollo = createAction(NO_APOLLO);
export const fetchApollo = createAction(FETCH_APOLLO); // should post message
export const receivedManualFetch = createAction(RECEIVED_MANUAL_FETCH); // payload apolloObj
export const receivedApollo = createAction(RECEIVED_APOLLO); // payload apolloObj
export const initializeCache = createAction(INITIALIZED_CACHE_CHECK);

/*--------------
  Reducer
----------------*/
const apolloReducer = createReducer(initialState, {
  [PORT_INITIALIZED]: initializePortCase,
  [POST_BACKGROUND_MESSAGE]: callBackgroundCase,
  [STARTING_UP]: startingUpCase,
  [NO_APOLLO]: noApolloCase,
  [FETCH_APOLLO]: fetchApolloCase,
  [RECEIVED_MANUAL_FETCH]: receivedManualFetchCase,
  [RECEIVED_APOLLO]: receivedApolloCase,
  [INITIALIZED_CACHE_CHECK]: initializedCacheCase,
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

function fetchApolloCase(state, action) {
  console.log('reduceTabId', chrome.devtools.inspectedWindow.tabId);
  superPort.connection.postMessage({
    type: sendMessageTypes.epoch.fetchApolloData,
    payload: chrome.devtools.inspectedWindow.tabId,
  });
}

function noApolloCase(state, action) {
  console.log('No Apollo Case');
  state.hasDunderApollo = false;
}

function receivedApolloCase(state, action) {
  const apolloData = action.payload;
  state.hasDunderApollo = true;
  console.log('received Apollo in Epoch', apolloData);
}

function receivedManualFetchCase(state, action) {
  const apolloData = action.payload;
  state.hasDunderApollo = true;
  console.log('received Manual Fetch in Epoch', apolloData);
}

function initializedCacheCase(state, action) {
  console.log('Initialized Cache Case Fired');
}

export default apolloReducer;

/*--------------------
  Action Generators
--------------------*/

// Returns function that, when called creates an API action object with the following payload
// This is set up to take a user ID and send it to the backend as a param
export const initializeBackgroundConnection = () =>
  connectToBackground({
    onStart: STARTING_UP,
    onSuccess: PORT_INITIALIZED,
    apolloActions: {
      receivedApollo: RECEIVED_APOLLO,
      receivedApolloManual: RECEIVED_MANUAL_FETCH,
      noApollo: NO_APOLLO,
      initializeCache: INITIALIZED_CACHE_CHECK,
    },
  });
