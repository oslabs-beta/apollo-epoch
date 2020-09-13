import { LOG, ERROR } from './loggerActions';

const sendMessageTypes = {
  epoch: {
    saveConnection: 'saveConnection',
    initialize: 'epochPanelOpened',
    fetchApolloData: 'fetchApolloData',
    fetchApolloDataForNetQuery: 'fetchDataForNetQuery',
    getFiberTree: '$$$getFiberTree$$$',
    tardis: 'initiateTimeJump',
  },
  contentScript: {
    initialize: 'contentScriptInitialized',
    apolloReceived: 'apolloDataReceived',
    apolloReceivedManual: 'apolloDataReceivedManual',
    noApolloClient: 'noApollo',
    initialCacheCheck: 'checkingForCache',
    log: LOG,
    error: ERROR,
  },
  background: {
    apolloReceived: 'apolloDataReceived',
    apolloReceivedManual: 'apolloDataReceivedManual',
    noApolloClient: 'noApollo',
    fetchFullApolloData: 'onNetworkRequest',
    clearData: 'clearApolloData',
    log: LOG,
    error: ERROR,
  },
  clientWindow: { queryUpdate: '$$$queryUpdate$$$', noApolloClient: '$$$noApollo$$$', log: LOG }, // ensure no window message conflicts
};

export default sendMessageTypes;
