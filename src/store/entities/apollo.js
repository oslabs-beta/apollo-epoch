/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { print } from 'graphql/language/printer';
import { connectToBackground } from '../messagesAndActionTypes/initializeActions';
import sendMessageTypes from '../messagesAndActionTypes/messageTypes';

/*---------------------------
 DATA OBJECT PARAMS:
-----------------------------
 FROM CLIENT APP
   Apollo Data Obj {
      manual: manualFetch,
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
    lastResult,    
  }

  Mutation Data Obj {
      id: `M${id}${mutationIdCounter}`, // prevents duplicate Ids in Epoch
      document: mutationObj.mutation,
      error: mutationObj.error,
      variables: mutationObj.variables,     
  }
  ----------------------------------------
  IN STATE
  queryObj: {
    id: (Q + cacheId + qCount)
    type,
    queryString,
    variables,
    response
    cacheSnapshot,
    diff,
}

  mutationsObj: {
    id: (M + cacheId + mCount)
    type,
    queryString,
    variables,
    cacheSnapshot,
    diff,
}

  manualFetchObj: {
    id: (F + fetchCounter)
    type,
    cacheSnapshot,
    diff,
}


-----------------------------*/

let superPort;
const queryType = 'Query';
const mutationType = 'Mutation';
const manualFetchType = 'Manual Fetch';

const initialState = {
  hasDunderApollo: false,
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
};

/*--------------
  ACTION TYPES
----------------*/

const STARTING_UP = 'startingUp'; // For debugging
const PORT_INITIALIZED = 'portInitialized';
const POST_BACKGROUND_MESSAGE = 'callBackground';
const NO_APOLLO = 'noApolloClient';
const FETCH_APOLLO = 'fetchApolloData';
const RECEIVED_MANUAL_FETCH = 'apolloReceivedManual';
const RECEIVED_APOLLO = 'apolloReceived';
const INITIALIZED_CACHE_CHECK = 'initializedCache';
const SET_ACTIVE_QUERY = 'setActiveQuery';
const SET_PREV_QUERY = 'setPrevQuery';

/*----------------
  ACTION CREATORS
------------------*/
// eslint-disable-next-line import/prefer-default-export
export const startingUp = createAction(STARTING_UP); // no payload
export const initializedPort = createAction(PORT_INITIALIZED); // superPortObj
export const postBackgroundMessage = createAction(POST_BACKGROUND_MESSAGE); // messageObj: {type, payload}
export const noApollo = createAction(NO_APOLLO);
export const fetchApollo = createAction(FETCH_APOLLO); // should post message
export const receivedManualFetch = createAction(RECEIVED_MANUAL_FETCH); // payload apolloObj
export const receivedApollo = createAction(RECEIVED_APOLLO); // payload apolloObj
export const initializeCache = createAction(INITIALIZED_CACHE_CHECK);
export const setActiveQuery = createAction(SET_ACTIVE_QUERY); // payload should be an ID from the timeline
export const setPrevQuery = createAction(SET_PREV_QUERY); // payload should be an ID from the timeline

/*--------------
  REDUCER
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
  [SET_ACTIVE_QUERY]: setActiveQueryCase,
  [SET_PREV_QUERY]: setPrevQueryCase,
});

/*--------------
  REDUCER CASES
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
  const {
    graphQlUri,
    queries,
    mutations,
    cache,
    queryCount,
    mutationCount,
    prevQueryCount,
    prevMutationCount,
  } = apolloData;

  state.hasDunderApollo = true;
  state.graphQlUri = graphQlUri;
  console.log(`CurrQ: ${queryCount}, PrevQ: ${prevQueryCount}, StateQ: ${state.queryIdCounter}`);
  console.log(
    `CurrM: ${mutationCount}, PrevM: ${prevMutationCount}, StateM: ${state.mutationIdCounter}`
  );

  // Debug
  if (state.queryIdCounter !== prevQueryCount || state.mutationIdCounter !== prevMutationCount) {
    console.log('*****QUERIES / MUTATIONS MISSED*****');
    console.log(`CurrQ: ${queryCount}, PrevQ: ${prevQueryCount}, StateQ: ${state.queryIdCounter}`);
    console.log(
      `CurrM: ${mutationCount}, PrevM: ${prevMutationCount}, StateM: ${state.mutationIdCounter}`
    );
  }

  let mutationsToGrab = mutationCount - prevMutationCount;
  if (mutationsToGrab && mutationsToGrab <= mutations.length) {
    while (mutationsToGrab > 0) {
      const { id, document, error, variables } = mutations.pop();
      const stateMutationObj = {
        id,
        type: mutationType,
        queryString: print(document),
        variables,
        cacheSnapshot: cache,
        diff: 'Magic Diff Formula Magic Result Inserted Here',
      };
      state.timeline.push(id);
      state.mutationIds.push(id);
      state.mutations[id] = stateMutationObj;
      mutationsToGrab -= 1;
    }
  }
  state.mutationIdCounter = mutationCount;

  let queriesToGrab = queryCount - prevQueryCount;
  if (queriesToGrab && queriesToGrab <= queries.length) {
    while (queriesToGrab > 0) {
      console.log('received Q Case queries ->', queries);
      console.log('query items ->', queries.length);
      const queryObj = queries.pop();
      console.log('q in question -> ', queryObj);
      const { id, document, lastResult, variables } = queryObj;
      const stateQueryObj = {
        id,
        type: queryType,
        queryString: print(document),
        variables,
        response: lastResult,
        cacheSnapshot: cache,
        diff: 'Magic Diff Formula Magic Result Inserted Here',
      };
      state.timeline.push(id);
      state.queryIds.push(id);
      state.queries[id] = stateQueryObj;
      queriesToGrab -= 1;
    }
  }
  state.queryIdCounter = queryCount;
}

function receivedManualFetchCase(state, action) {
  const apolloData = action.payload;
  state.hasDunderApollo = true;
  state.fetchCounter += 1;
  const fetchId = `F${state.fetchCounter}`;
  const diff = 'Magic Diff Formula Magic Result Inserted Here';
  const fetchObj = {
    id: fetchId,
    type: manualFetchType,
    cacheSnapshot: apolloData.cache,
    diff,
  };
  state.timeline.push(fetchId);
  state.manualFetchIds.push(fetchId);
  state.manualFetches[fetchId] = fetchObj;
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
  if (typeIndicator === 'Q') state.activeQuery = state.queries[prevQueryId];
  if (typeIndicator === 'M') state.activeQuery = state.mutations[prevQueryId];
  if (typeIndicator === 'F') state.activeQuery = state.manualFetches[prevQueryId];
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
      receivedApollo: RECEIVED_APOLLO,
      receivedApolloManual: RECEIVED_MANUAL_FETCH,
      noApollo: NO_APOLLO,
      initializeCache: INITIALIZED_CACHE_CHECK,
    },
  });

/*-----------
  SELECTORS
-------------*/
export const getTimeline = createSelector(
  (state) => {
    console.log('selector State', state);
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
function createQueryString(document) {
  return print(document);
}
