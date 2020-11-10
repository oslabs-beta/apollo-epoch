/*
This is the store that lives on our DevHook. The current Apollo Client is attached for
convenience, and there are two ref lists for used to compare in testing. Traversing the fiber
tree is a pain to look at ref data, so we created a linked list of refs, one gathered during
fiber traversal, and one gathered as the refs are created via our overwritten React.useRef. 
Neither factor into the time travel functionality but the structure is necessary in our fiber tree traversal.
*/

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