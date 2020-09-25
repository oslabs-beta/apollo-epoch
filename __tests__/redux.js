import epochStore from '../src/store/entities/apollo';

describe('apolloReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      hasDunderApollo: false,
      loadingApollo: false,
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
  });

  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(epochStore(undefined, { type: undefined })).toEqual(state);
    });
  });

  describe('unrecognized action types', () => {
    it('should return the original without any duplication', () => {
      const action = { type: 'fakeActionName' };
      expect(epochStore(state, action)).toBe(state);
    });
  });

  xdescribe('PORT_INITIALIZED', () => {
    const action = {
      type: 'portInitialized',
      payload: {},
    };

    it('initializes a port and updates state', () => {
      const { loadingApollo } = epochStore(state, action);
      expect(loadingApollo).toBe(true);
    });
  });

  describe('SET_ACTIVE_QUERY', () => {
    const action = {
      type: 'setActiveQuery',
      payload: 'Q2',
    };
    const action2 = {
      type: 'setActiveQuery',
      payload: 'M1',
    };

    it('sets the active query to the proper query', () => {
      state.queries = {
        Q1: 'query1',
        Q2: 'query2',
      };
      state.mutations = {
        M1: 'mutation1',
        M2: 'mutation2',
      };
      state.timeline = ['Q1', 'Q2', 'M1', 'M2'];

      let newState = epochStore(state, action);
      expect(newState.activeQuery).toBe('query2');
      expect(newState.prevQuery).toBe('query1');
      newState = epochStore(state, action2);
      expect(newState.activeQuery).toBe('mutation1');
      expect(newState.prevQuery).toBe('query2');
    });
  });

  describe('RECEIVED_APOLLO', () => {
    const fakeApolloData = {
      manual: false,
      graphQlUri: 'http://localhost:3001',
      queries: [
        {
          id: 'Q1',
          type: 'queryType1',
          name: '',
          queryString: 'fake query1',
          variables: null,
          cacheSnapshot: {},
          lastResult: {
            error: '',
            response: 'response 1',
          },
        },
        {
          id: 'Q2',
          type: 'queryType2',
          name: '',
          queryString: 'fake query2',
          variables: null,
          cacheSnapshot: {},
          lastResult: {
            error: '',
            response: 'response 2',
          },
        },
      ], // array of Query objs
      mutations: [
        {
          id: 'M1',
          type: 'mutType1',
          queryString: 'fake mutation1',
          variables: null,
          name: '',
          error: '',
          loading: false,
          cacheSnapshot: {},
        },
        {
          id: 'M2',
          type: 'mutType2',
          queryString: 'fake mutation2',
          variables: null,
          name: '',
          error: '',
          loading: false,
          cacheSnapshot: {},
        },
      ], // array of Mutation objs
      cache: {},
      queryCount: 2,
      mutationCount: 2,
      prevQueryCount: 0,
      prevMutationCount: 0,
    };

    const action = {
      type: 'apolloReceived',
      payload: fakeApolloData,
    };

    it('adds stores queries and mutations in the timeline correctly', () => {
      epochStore(state, action);
      console.log('state after RECEIED_APOLLO', state);
    });
  });
});
