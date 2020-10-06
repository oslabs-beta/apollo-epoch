import ClientStore from './ClientSnapshotStore';
import RefSnapshotStore from './RefSnapshotStore';
import EpochRefList from './RefList';
import FiberTreeSnapshotStore from './FiberTreeSnapshotStore';
import CommitLog from './CommitLog';

function EpochStore(apolloClient) {
  this.clientSnaps = new ClientStore();
  this.epochRefSnaps = new RefSnapshotStore();
  this.refList = new EpochRefList();
  this.reactUseRefList = new EpochRefList();
  this.componentStore = new FiberTreeSnapshotStore();
  this.commitLog = new CommitLog();
  this.currentApolloClient = apolloClient;
}

export default EpochStore;

/*
EpochStore:
jumpStore
refList
commitLog
*/

/*
JumpStore:
Apollo Action Id :
  {
    clientSnap
    refSnaps
    componentStateSnaps
  }
*/