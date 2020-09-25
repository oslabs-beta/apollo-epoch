import React from 'react';
import { configure, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { Provider, useSelector, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';
import StateValueDisplay from '../src/components/StateValueDisplay';
import HistoryView from '../src/components/HistoryView';
import StateSidebar from '../src/components/StateSidebar';
import ResponseInfo from '../src/components/ResponseInfo';
import HistoryViewQuery from '../src/components/HistoryViewQuery';
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

  xdescribe('HistoryView', () => {
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

    beforeAll(() => {
      store = mockStore({ apollo });

      wrapper = render(
        <Provider store={store}>
          <HistoryView />
        </Provider>
      );
    });

    it('It should render with given state from Redux store', () => {
      const component = toJson(wrapper);
      expect(component).toMatchSnapshot();
    });
  });
});
