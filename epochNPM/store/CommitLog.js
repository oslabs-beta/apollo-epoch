/*
------------------
Data Structure
------------------
lastCommit - Date Obj
commitIds - Array of Date Objs

commits: {
  commitTime: {
    aaid: Assigned Apollo Action Id (Q, M, F + int),
    clientSnap: {},  // a deep copy of the Apollo Client at the time of this commit
    refSnaps: {
      refId: {} // Deep copy of ref Obj at time of commit --ref Id assigned by Epoch at time of ref creation
    },
    componentStates: IF NECESSARY -- A tree of class and useState Fiber states

  }

}

*/
import {cloneDeep} from 'lodash';
import {refTags} from '../refTags';

function CommitLog() {
  this.lastCommit = null;
  this.commitIds = []; // Array of commit times
  this.commits = {};
  this.apolloActionIds = {}; // Temp AAID: TimeStamp
}

// Because we'll need the same client references in refs we need a clientClone to serve as the backbone for every commit record
CommitLog.prototype.initializeCommitRecord = function(commitKey, apolloClient) {
  this.lastCommit = commitKey;
  this.commitIds.push(commitKey);

  const clientSnap = cloneDeep(apolloClient)
  const commitRecord = {
    clientSnap,
  }

  this.commits[commitKey] = commitRecord;
  return commitRecord
}
// For Query Refs we should ONLY need to get the options...context should be updated by reference when we gut the client
CommitLog.prototype.addRefState = function(commitRecord, ref) {
  if(!commitRecord.refSnaps) commitRecord.refSnaps = {};

  // Adjust with logic per different ref if needed (q tag 1, m tag 2, deepMemo tag 3)
  // May need to get in here and swap out more --- check when ready to test
  const refData = ref.current;
  const {refId, tag} = refData.epoch;
  if(tag === refTags.queryRef) {
    const newRefData = cloneDeep(refData);
    newRefData.client = commitRecord.clientSnap;
    newRefData.context.client = commitRecord.clientSnap;
    commitRecord.refSnaps[refId] = newRefData;
  }
}

export default CommitLog;
