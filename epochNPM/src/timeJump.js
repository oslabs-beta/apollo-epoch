/* eslint-disable no-param-reassign */
import EpochJumpTree from './EpochJumpFiberTree';
import EpochJumpRecord from './store/EpochStore';

const timeJumpLite = true;

function epochShift(apolloClient, historicalClient, rootFiber) {
  // //TESTING ONLY
  const epochJumpRecord = new EpochJumpRecord(apolloClient);

  clearData(apolloClient);
  addData(apolloClient, historicalClient);
  // apolloClient.resetStore();

  // Remove Refs

  // TESTING ONLY
  const commitId = Date.now();
  const commitRecord = epochJumpRecord.commitLog.initializeCommitRecord(commitId, apolloClient);
  const { apolloActionId } = historicalClient.zzzUPDATESUCCESS;
  const jumpTree = new EpochJumpTree(rootFiber, epochJumpRecord, commitRecord, apolloActionId);

  return epochJumpRecord;
}

function clearData(cacheData) {
  if (timeJumpLite) {
    const dataInCache = cacheData.cache.data;
    Object.keys(dataInCache).forEach((cacheItemKey) => {
      delete dataInCache[cacheItemKey];
    });
  } else {
    Object.keys(cacheData).forEach((key) => {
      delete cacheData[key];
    });
  }
}

function addData(cacheData, historyObj) {
  if (timeJumpLite) {
    const dataInHistoryObj = historyObj.cache.data;
    Object.keys(dataInHistoryObj).forEach((dataKey) => {
      cacheData.cache.data[dataKey] = dataInHistoryObj[dataKey];
    });
  } else {
    Object.keys(historyObj).forEach((key) => {
      cacheData[key] = historyObj[key];
    });
  }
}

export default epochShift;
