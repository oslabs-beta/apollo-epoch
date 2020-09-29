import ClientStore from './ClientSnapshotStore';
import RefSnapshotStore from './RefSnapshotStore';
import EpochRefList from './RefList';
import FiberTreeSnapshotStore from './FiberTreeSnapshotStore';

function EpochStore() {
  this.clientSnaps = new ClientStore();
  this.epochRefSnaps = new RefSnapshotStore();
  this.refList = new EpochRefList();
  this.componentStore = new FiberTreeSnapshotStore();
}

export default EpochStore;