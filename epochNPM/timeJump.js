import EpochJumpTree from './EpochJumpFiberTree';
import EpochJumpRecord from './store/EpochStore';

function epochShift(apolloClient, historicalClient, rootFiber) {
  //TESTING ONLY
  const epochJumpRecord = new EpochJumpRecord(apolloClient);

  clearData(apolloClient);
  addData(apolloClient, historicalClient);

  // Remove Refs

  //TESTING ONLY
  const commitId = Date.now();
  const commitRecord = epochJumpRecord.commitLog.initializeCommitRecord(commitId, apolloClient);
  const apolloActionId = historicalClient.zzzUPDATESUCCESS.apolloActionId
  const jumpTree = new EpochJumpTree(rootFiber, epochJumpRecord, commitRecord, apolloActionId)

  return epochJumpRecord
}

function clearData(cacheData) {
  Object.keys(cacheData).forEach(key => {
    delete cacheData[key];
  })
 }

 function addData(cacheData, historyObj) {
   Object.keys(historyObj).forEach(key => {
     cacheData[key] = historyObj[key]
   })
 }

 export default epochShift;