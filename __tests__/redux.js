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

  xdescribe('RECEIVED_APOLLO', () => {
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
          isNetwork: false,
          timingData: 0,
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
          isNetwork: false,
          timingData: 0,
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
          isNetwork: true,
          timingData: 50,
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
          isNetwork: true,
          timingData: 50,
        },
        {
          id: 'M3',
          type: 'mutType3',
          queryString: 'fake mutation3',
          variables: null,
          name: '',
          error: '',
          loading: false,
          cacheSnapshot: {},
          isNetwork: true,
          timingData: 50,
        },
      ], // array of Mutation objs
      cache: {},
      queryCount: 3,
      mutationCount: 4,
      prevQueryCount: 1,
      prevMutationCount: 1,
    };

    const action = {
      type: 'apolloReceived',
      payload: fakeApolloData,
    };

    it('adds queries and mutations to state along with IDs and updates the timeline', () => {
      const {
        timeline,
        queryIds,
        mutationIds,
        queries,
        mutations,
        queryIdCounter,
        mutationIdCounter,
      } = epochStore(state, action);

      expect(timeline.length).toBe(5);
      expect(queryIds.length).toBe(2);
      expect(mutationIds.length).toBe(3);
      expect(queryIds[1]).toBe('Q1');
      expect(mutationIds[2]).toBe('M1');
      expect(Object.keys(queries).length).toBe(2);
      expect(Object.keys(mutations).length).toBe(3);
      expect(queryIdCounter).toBe(3);
      expect(mutationIdCounter).toBe(4);
    });

    it('returns a new state object different than the previous', () => {
      const newState = epochStore(state, action);
      expect(newState).not.toBe(state);
    });
  });

  describe('CLEAR_APOLLO_DATA', () => {
    const action = {
      type: 'clearApolloData',
    };

    it('resets state back to deault values', () => {
      state.queryIdCounter = 5;
      state.mutationIdCounter = 2;
      const { queryIdCounter, mutationIdCounter } = epochStore(state, action);
      expect(queryIdCounter).toBe(1);
      expect(mutationIdCounter).toBe(1);
    });

    it('returns a new state object different from the previous', () => {
      const newState = epochStore(state, action);
      expect(newState).not.toBe(state);
    });
  });
});
