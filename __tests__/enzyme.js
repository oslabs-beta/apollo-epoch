import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import StateValueDisplay from '../src/components/StateValueDisplay';
import StateInfo from '../src/components/StateInfo';
import HistoryView from '../src/components/HistoryView';
import StateSidebar from '../src/components/StateSidebar';
import ResponseInfo from '../src/components/ResponseInfo';
import HistoryViewQuery from '../src/components/HistoryViewQuery';
// import DiffInfo from '../src/components/DiffInfo';

React.useLayoutEffect = React.useEffect;
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));
// import QueryInfo from '../src/components/QueryInfo';

configure({ adapter: new Adapter() });
const mockStore = configureStore([]);

describe('React unit tests', () => {
  describe('StateValueDisplay', () => {
    let wrapper;

    const props = {
      stateValue: {
        testVal: 1,
        testString: 'hello',
      },
    };

    beforeAll(() => {
      wrapper = shallow(<StateValueDisplay {...props} />);
    });

    it('It should render without errors', () => {
      const component = toJson(wrapper);
      expect(component).toMatchSnapshot();
    });

    it('It contains a div with "state-value" as the class type', () => {
      expect(wrapper.type()).toEqual('div');
      const component = wrapper.find('.state-value');
      expect(component.length).toBe(1);
    });
  });

  describe('StateInfo', () => {
    let wrapper;

    const props = {
      stateSnapshot: {
        key1: '1',
        key2: '2',
        key3: '3',
      },
    };

    beforeAll(() => {
      wrapper = shallow(<StateInfo {...props} />);
    });

    it('It should render without errors', () => {
      const component = toJson(wrapper);
      expect(component).toMatchSnapshot();
    });

    it('It contains a single div with "cache-display" as the class type', () => {
      expect(wrapper.type()).toEqual('div');
      const component = wrapper.find('.cache-display');
      expect(component.length).toBe(1);
    });
  });

  describe('StateSideBar', () => {
    let wrapper;
    const props = {
      keyList: ['1', '2', '3'],
      onClick: () => {},
    };

    beforeAll(() => {
      wrapper = shallow(<StateSidebar {...props} />);
    });

    it('It should render without errors', () => {
      const component = toJson(wrapper);
      expect(component).toMatchSnapshot();
    });

    it('It should render a "key-display" div for each key in the props', () => {
      const keyDisplays = wrapper.find('.key-display');
      expect(keyDisplays.length).toBe(3);
    });
  });

  describe('ResponseInfo', () => {
    let wrapper;
    const props = {
      response: { res: 'test' },
    };

    beforeAll(() => {
      wrapper = shallow(<ResponseInfo {...props} />);
    });

    it('It should render without errors', () => {
      const component = toJson(wrapper);
      expect(component).toMatchSnapshot();
    });

    it('It should contain a single div with the "response-info" class', () => {
      const responseInfo = wrapper.find('.response-info');
      expect(responseInfo.length).toBe(1);
    });

    it('It should display "No Response to Render" if the associated query does not have a response', () => {
      wrapper = shallow(<ResponseInfo response={null} />);
      expect(wrapper.find('h2').text()).toMatch('No Response to Render');
    });
  });

  describe('HistoryView', () => {
    let store;
    let wrapper;
    const apollo = {
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

    beforeEach(() => {
      store = mockStore({ apollo });

      wrapper = mount(
        <Provider store={store}>
          <HistoryView />
        </Provider>
      );
    });

    it('It should render without errors', () => {
      const component = toJson(wrapper);
      expect(component).toMatchSnapshot();
    });

    it('It should contain a single div with the "history-view" class', () => {
      const historyView = wrapper.find('.history-view');
      expect(historyView.length).toBe(1);
    });
  });

  describe('HistoryViewQuery', () => {
    let wrapper;
    const mockOnClick = jest.fn();

    const props = {
      timelineObj: {
        cacheSnapshot: {},
        error: undefined,
        id: 'Q1',
        name: 'fakeName',
        response: {},
        type: 'Query',
        variables: {},
      },
      onClick: mockOnClick,
      active: false,
    };

    beforeAll(() => {
      wrapper = shallow(<HistoryViewQuery {...props} />);
    });

    it('It should render without errors', () => {
      const component = toJson(wrapper);
      expect(component).toMatchSnapshot();
    });

    it('It should contain a single div with the "query-card" class', () => {
      const queryCard = wrapper.find('.query-card');
      expect(queryCard.length).toBe(1);
    });

    it('It should not contain the "active-query" class if the active prop is false', () => {
      const activeQuery = wrapper.find('.active-query');
      expect(activeQuery.length).toBe(0);
    });
  });

  // xdescribe('DiffInfo', () => {
  //   let store;
  //   let wrapper;
  //   const apollo = {
  //     hasDunderApollo: false,
  //     loadingApollo: false,
  //     activeQuery: {},
  //     prevQuery: {},
  //     chromeTabId: '',
  //     graphQlUri: '',
  //     queryIds: [],
  //     queries: {},
  //     queryIdCounter: 1,
  //     mutationIds: [],
  //     mutations: {},
  //     mutationIdCounter: 1,
  //     manualFetches: {}, // store manual cacheFetches in Timeline
  //     manualFetchIds: [],
  //     fetchCounter: 0,
  //     timeline: [], // an ordered list of query and mutation Ids
  //     typeNameDocumentCache: {},
  //     networkHoldingRoom: {},
  //   };

  //   beforeEach(() => {
  //     store = mockStore({ apollo });

  //     wrapper = mount(
  //       <Provider store={store}>
  //         <DiffInfo />
  //       </Provider>
  //     );
  //   });

  //   it('It should render without errors', () => {
  //     const component = toJson(wrapper);
  //     expect(component).toMatchSnapshot();
  //   });

  //   it('It should contain a single div with the "diff-info" class', () => {
  //     const historyView = wrapper.find('.diff-info');
  //     expect(historyView.length).toBe(1);
  //   });
  // });
});
