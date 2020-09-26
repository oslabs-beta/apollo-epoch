import ClientStore from './ClientSnapshotStore';
import RefSnapshotStore from './RefSnapshotStore';
import EpochRefList from './RefList';

function EpochStore() {
  this.clientSnaps = new ClientStore();
  this.epochRefSnaps = new RefSnapshotStore();
  this.refList = new EpochRefList();
}

export default EpochStore;