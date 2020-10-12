import { LOG, ERROR } from './loggerActions';

const sendMessageTypes = {
  epoch: {
    saveConnection: 'saveConnection',
    initialize: '$$$epochPanelOpened$$$',
    fetchApolloData: 'fetchApolloData',
    fetchApolloDataForNetQuery: 'fetchDataForNetQuery',
    createSnapshot: '$$$takeStateSnapshot$$$',
    epochShift: '$$$epochShift$$$',
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
  clientWindow: {
    queryUpdate: '$$$queryUpdate$$$',
    noApolloClient: '$$$noApollo$$$',
    log: LOG,
    epochShiftComplete: '$$$completedEpochShift$$$',
    timeTravelPossible: '$$$timeTravelPossible$$$',
  }, // ensure no window message conflicts
};

export default sendMessageTypes;
