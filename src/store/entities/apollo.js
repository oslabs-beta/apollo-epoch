/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { print } from 'graphql/language/printer';
import { connectToBackground } from '../messagesAndActionTypes/initializeActions';
import { composeNetworkQuery } from '../messagesAndActionTypes/networkActions';
import sendMessageTypes from '../messagesAndActionTypes/messageTypes';

/*---------------------------
 DATA OBJECT PARAMS:
-----------------------------
 FROM CLIENT APP
   Apollo Data Obj {
      manual: manualFetch,
      epochShift: apolloActionId -- populated when cache is grabbed from a time jump (epoch shift)
      graphQlUri,
      queries: [queryDataObjs]
      mutations: [mutationDataObjs]
      cache: cacheInstance,
      queryCount: queryIdCounter,
      mutationCount: mutationIdCounter,
      prevQueryCount: queryCount,
      prevMutationCount: mutationCount,
    }

  Query Data Obj {
    id: `Q${key}${queryIdCounter}`, // prevents duplicate Ids in Epoch
    document: value.document,
    graphQLErrors: value.graphQLErrors,
    networkError: value.networkError,
    networkStatus: value.networkStatus,
    variables: value.variables,
    data: lastResult.data,
    name: lastResult.name,
    error: lastResult.error,
    loading: lastResult.loading    
  }

  Mutation Data Obj {
      id: `M${id}${mutationIdCounter}`, // prevents duplicate Ids in Epoch
      document: mutationObj.mutation,
      error: mutationObj.error,
      loading: mutationObj.loading
      variables: mutationObj.variables,     
  }
  ----------------------------------------
  IN STATE
  queryObj: {
    id: (Q + cacheId + qCount)
    type,
    name, 
    queryString,
    variables,
    response,
    error,
    cacheSnapshot,
    loading,
}

  mutationsObj: {
    id: (M + cacheId + mCount)
    type,
    queryString,
    variables,
    errorObj
    loading
    cacheSnapshot,
}

  manualFetchObj: {
    id: (F + fetchCounter)
    name: id,
    type,
    cacheSnapshot,
}


-----------------------------*/

let superPort;
const queryType = 'Query';
const mutationType = 'Mutation';
const manualFetchType = 'Manual Fetch';

const initialState = {
  hasDunderApollo: false,
  loadingApollo: false,
  timeTravelPossible: false,
  activeQuery: {},
  prevQuery: {},
  chromeTabId: '',
  graphQlUri: '',
  queryIds: [],
  queries: {},
  queryIdCounter: 1,
  mutationIds: [],
  mutations: {},
  mutationIdCounter: 1,
  manualFetches: {}, // store manual cacheFetches in Timeline
  manualFetchIds: [],
  fetchCounter: 0,
  timeline: [], // an ordered list of query and mutation Ids
  typeNameDocumentCache: {},
  networkHoldingRoom: {},
};

/*--------------
  ACTION TYPES
----------------*/

const STARTING_UP = 'startingUp'; // For debugging
const PORT_INITIALIZED = 'portInitialized';
const TOGGLE_TIME_TRAVEL = 'toggleTimeTravel';
const EPOCH_SHIFT = 'initiateEpochShift';
const NO_APOLLO = 'noApolloClient';
const FETCH_APOLLO = 'fetchApolloData';
const RECEIVED_MANUAL_FETCH = 'apolloReceivedManual';
const RECEIVED_APOLLO = 'apolloReceived';
const INITIALIZED_CACHE_CHECK = 'initializedCache';
const SET_ACTIVE_QUERY = 'setActiveQuery';
const SET_PREV_QUERY = 'setPrevQuery';
const RECEIVED_NETWORK_QUERY = 'receivedNetworkQuery';
const CLEAR_APOLLO_DATA = 'clearApolloData';

/*----------------
  ACTION CREATORS
------------------*/
// eslint-disable-next-line import/prefer-default-export
export const startingUp = createAction(STARTING_UP); // no payload
export const initializedPort = createAction(PORT_INITIALIZED); // superPortObj
export const toggleTimeTravel = createAction(TOGGLE_TIME_TRAVEL); // payload: boolean from client App
export const initiateEpochShift = createAction(EPOCH_SHIFT); // payload: {apolloActionId}
export const noApollo = createAction(NO_APOLLO);
export const fetchApollo = createAction(FETCH_APOLLO); // should post message
export const receivedManualFetch = createAction(RECEIVED_MANUAL_FETCH); // payload apolloObj
export const receivedApollo = createAction(RECEIVED_APOLLO); // payload apolloObj
export const initializeCache = createAction(INITIALIZED_CACHE_CHECK);
export const setActiveQuery = createAction(SET_ACTIVE_QUERY); // payload should be an ID from the timeline
export const setPrevQuery = createAction(SET_PREV_QUERY); // payload should be an ID from the timeline
export const receivedNetworkQuery = createAction(RECEIVED_NETWORK_QUERY); // payload is HAR object from Net Request
export const clearApolloData = createAction(CLEAR_APOLLO_DATA);

/*--------------
  REDUCER
----------------*/
const apolloReducer = createReducer(initialState, {
  [PORT_INITIALIZED]: initializePortCase,
  [TOGGLE_TIME_TRAVEL]: toggleTimeTravelCase,
  [EPOCH_SHIFT]: initiateEpochShiftCase,
  [STARTING_UP]: startingUpCase,
  [NO_APOLLO]: noApolloCase,
  [FETCH_APOLLO]: fetchApolloCase,
  [RECEIVED_MANUAL_FETCH]: receivedManualFetchCase,
  [RECEIVED_APOLLO]: receivedApolloCase,
  [INITIALIZED_CACHE_CHECK]: initializedCacheCase,
  [SET_ACTIVE_QUERY]: setActiveQueryCase,
  [SET_PREV_QUERY]: setPrevQueryCase,
  [RECEIVED_NETWORK_QUERY]: receivedNetworkQueryCase,
  [CLEAR_APOLLO_DATA]: clearApolloDataCase,
});

/*--------------
  REDUCER CASES
----------------*/
function startingUpCase(state, action) {
  console.log('Initializing Port');
}

function initializePortCase(state, action) {
  state.loadingApollo = true;
  superPort = action.payload;
  superPort.connection.postMessage({
    type: sendMessageTypes.epoch.initialize,
    payload: chrome.devtools.inspectedWindow.tabId,
  });
}

function toggleTimeTravelCase(state, action) {
  console.log('TIME TRAVEL POSSIBLE EPOCH -> ', action.payload);
  state.timeTravelPossible = action.payload;
}

function initiateEpochShiftCase(state, action) {
  superPort.connection.postMessage({
    type: sendMessageTypes.epoch.epochShift,
    payload: { tabId: chrome.devtools.inspectedWindow.tabId, data: action.payload },
  });
}

function fetchApolloCase(state, action) {
  superPort.connection.postMessage({
    type: sendMessageTypes.epoch.fetchApolloData,
    payload: chrome.devtools.inspectedWindow.tabId,
  });
}

function noApolloCase(state, action) {
  state.hasDunderApollo = false;
  state.loadingApollo = false;
}

function receivedApolloCase(state, action) {
  const apolloData = action.payload;
  state = processApolloData(state, apolloData);
}

function receivedManualFetchCase(state, action) {
  const apolloData = action.payload;
  state.hasDunderApollo = true;
  state.fetchCounter += 1;
  const fetchId = `F${state.fetchCounter}`;
  const name = apolloData.epochShift ? `Epoch Shift to ${apolloData.epochShift}` : 'Manual Fetch';
  const fetchObj = {
    id: fetchId,
    type: manualFetchType,
    name,
    cacheSnapshot: apolloData.cache,
  };
  state.timeline.push(fetchId);
  state.manualFetchIds.push(fetchId);
  state.manualFetches[fetchId] = fetchObj;
  superPort.connection.postMessage({
    type: sendMessageTypes.epoch.createSnapshot,
    payload: {
      tabId: chrome.devtools.inspectedWindow.tabId,
      data: { id: fetchId, timeStamp: Date.now() },
    },
  });
}

function initializedCacheCase(state, action) {
  console.log('Initialized Cache Case Fired');
}

function setActiveQueryCase(state, action) {
  const activeId = action.payload;
  if (!activeId) return;
  const typeIndicator = activeId[0];
  if (typeIndicator === 'Q') state.activeQuery = state.queries[activeId];
  if (typeIndicator === 'M') state.activeQuery = state.mutations[activeId];
  if (typeIndicator === 'F') state.activeQuery = state.manualFetches[activeId];

  // Find previous Query
  const { timeline } = state;
  if (timeline.length <= 1) {
    state.prevQuery = {};
    return;
  }
  for (let i = 0; i < timeline.length; i += 1) {
    if (activeId === timeline[i]) {
      if (i < 1) {
        state.prevQuery = {};
        return;
      }
      const prevId = timeline[i - 1];
      const prevTypeIndicator = prevId[0];
      if (prevTypeIndicator === 'Q') state.prevQuery = state.queries[prevId];
      if (prevTypeIndicator === 'M') state.prevQuery = state.mutations[prevId];
      if (prevTypeIndicator === 'F') state.prevQuery = state.manualFetches[prevId];
      return;
    }
  }
}

function setPrevQueryCase(state, action) {
  const prevQueryId = action.payload;
  if (!prevQueryId) return;
  const typeIndicator = prevQueryId[0];
  if (typeIndicator === 'Q') state.prevQuery = state.queries[prevQueryId];
  if (typeIndicator === 'M') state.prevQuery = state.mutations[prevQueryId];
  if (typeIndicator === 'F') state.prevQuery = state.manualFetches[prevQueryId];
}

function receivedNetworkQueryCase(state, action) {
  const { queryKey, hydratedQuery } = action.payload;
  const { id } = hydratedQuery;
  const typeIndicator = id[0];
  if (typeIndicator === 'Q') {
    state.queryIds.push(id);
    state.queries[id] = hydratedQuery;
  }
  if (typeIndicator === 'M') {
    state.mutationIds.push(id);
    state.mutations[id] = hydratedQuery;
  }
  state.timeline.push(id);
  delete state.networkHoldingRoom[queryKey];
  superPort.connection.postMessage({
    type: sendMessageTypes.epoch.createSnapshot,
    payload: { tabId: chrome.devtools.inspectedWindow.tabId, data: { id, timeStamp: Date.now() } },
  });
}

function clearApolloDataCase(state, action) {
  state.hasDunderApollo = false;
  state.loadingApollo = false;
  state.activeQuery = {};
  state.prevQuery = {};
  state.chromeTabId = '';
  state.graphQlUri = '';
  state.queryIds = [];
  state.queries = {};
  state.queryIdCounter = 1;
  state.mutationIds = [];
  state.mutations = {};
  state.mutationIdCounter = 1;
  state.manualFetches = {}; // store manual cacheFetches in Timeline
  state.manualFetchIds = [];
  state.fetchCounter = 0;
  state.timeline = []; // an ordered list of query and mutation Ids
  state.typeNameDocumentCache = {};
}

export default apolloReducer;

/*--------------------
  ACTION GENERATORS
--------------------*/

// Returns function that, when called creates an connectToBackground action object passing
// in the following action types for the resulting super port to dispatch
export const initializeBackgroundConnection = () =>
  connectToBackground({
    onStart: STARTING_UP,
    onSuccess: PORT_INITIALIZED,
    apolloActions: {
      clearApolloData: CLEAR_APOLLO_DATA,
      receivedApollo: RECEIVED_APOLLO,
      receivedApolloManual: RECEIVED_MANUAL_FETCH,
      noApollo: NO_APOLLO,
      initializeCache: INITIALIZED_CACHE_CHECK,
      toggleTimeTravel: TOGGLE_TIME_TRAVEL,
    },
  });

export const passHarToCompose = (filteredHar) =>
  composeNetworkQuery({
    data: filteredHar,
    onSuccess: RECEIVED_NETWORK_QUERY,
  });

/*-----------
  SELECTORS
-------------*/
export const getTimeline = createSelector(
  (state) => {
    return state.apollo.timeline;
  },
  (state) => state.apollo.queries,
  (state) => state.apollo.mutations,
  (state) => state.apollo.manualFetches,
  (timeline, queries, mutations, manualFetches) => {
    return timeline.map((id) => {
      const typeIndicator = id[0];
      if (typeIndicator === 'Q') return queries[id];
      if (typeIndicator === 'M') return mutations[id];
      return manualFetches[id];
    });
  }
);

/*--------------
HELPERS
---------------*/
function processApolloData(state, apolloData) {
  // We can receive this data in two ways, an array of apollo objects (epoch initialized after client app already running)
  // Or a single object (normal course of busn, or epoch already initialized when client app loaded)

  function processCacheObj(apolloObj) {
    const {
      graphQlUri,
      queries,
      mutations,
      cache,
      queryCount,
      mutationCount,
      prevQueryCount,
      prevMutationCount,
    } = apolloObj;

    state.hasDunderApollo = true;
    state.loadingApollo = false;
    state.graphQlUri = graphQlUri;

    // Debug
    // if (state.queryIdCounter !== prevQueryCount || state.mutationIdCounter !== prevMutationCount) {
    //   console.log('*****QUERIES / MUTATIONS MISSED*****');
    //   console.log(
    //     `CurrQ: ${queryCount}, PrevQ: ${prevQueryCount}, StateQ: ${state.queryIdCounter}`
    //   );
    //   console.log(
    //     `CurrM: ${mutationCount}, PrevM: ${prevMutationCount}, StateM: ${state.mutationIdCounter}`
    //   );
    // }

    let mutationsToGrab = mutationCount - prevMutationCount;
    if (mutationsToGrab && mutationsToGrab <= mutations.length) {
      while (mutationsToGrab > 0) {
        const { id, document, error, loading, variables, name, isNetwork } = mutations.pop();

        const stateMutationObj = {
          id,
          type: mutationType,
          queryString: print(document),
          variables,
          name,
          error,
          loading,
          cacheSnapshot: cache,
          isNetwork,
        };
        if (stateMutationObj.loading) {
          state.networkHoldingRoom[stateMutationObj.queryString] = stateMutationObj;
        } else {
          state.timeline.push(id);
          state.mutationIds.push(id);
          state.mutations[id] = stateMutationObj;
          superPort.connection.postMessage({
            type: sendMessageTypes.epoch.createSnapshot,
            payload: {
              tabId: chrome.devtools.inspectedWindow.tabId,
              data: { id, timeStamp: Date.now() },
            },
          });
        }
        mutationsToGrab -= 1;
      }
    }
    state.mutationIdCounter = mutationCount;

    let queriesToGrab = queryCount - prevQueryCount;
    if (queriesToGrab && queriesToGrab <= queries.length) {
      while (queriesToGrab > 0) {
        const queryObj = queries.pop();
        const { id, document, variables, name, lastResult, isNetwork } = queryObj;
        const stateQueryObj = {
          id,
          type: queryType,
          name,
          queryString: print(document),
          variables,
          cacheSnapshot: cache,
          isNetwork,
        };

        if (!lastResult || lastResult.loading) {
          state.networkHoldingRoom[stateQueryObj.queryString] = stateQueryObj;
        } else {
          const { error, data } = lastResult;
          stateQueryObj.error = error;
          stateQueryObj.response = data;
          state.timeline.push(id);
          state.queryIds.push(id);
          state.queries[id] = stateQueryObj;
          superPort.connection.postMessage({
            type: sendMessageTypes.epoch.createSnapshot,
            payload: {
              tabId: chrome.devtools.inspectedWindow.tabId,
              data: { id, timeStamp: Date.now() },
            },
          });
        }
        queriesToGrab -= 1;
      }
    }
    state.queryIdCounter = queryCount;
  }
  if (Array.isArray(apolloData)) {
    apolloData.forEach((apolloObj) => processCacheObj(apolloObj));
  } else {
    processCacheObj(apolloData);
  }
  return state;
}
