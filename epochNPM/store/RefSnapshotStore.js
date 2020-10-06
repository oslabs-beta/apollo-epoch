/*
Map {
  component: {
    apolloActionId : {refId: snapShot}
  }
}
*/

function RefSnapshotStore() {
  this.snapshots = new Map();
} 

// Each component could have multiple queries / mutations which would all have their
// own refs...so we must account for multiples in each snapshot

RefSnapshotStore.prototype.addRef = function(component, apolloActionId, refId, snapshot) {
  if(!this.snapshots.has(component)) this.snapshots.set(component, {});
  const actionIdStore = this.snapshots.get(component);
  if(!actionIdStore[apolloActionId]) actionIdStore[apolloActionId] = {};
  actionIdStore[apolloActionId] = {[refId]: snapshot};

  return actionIdStore[apolloActionId];
}

RefSnapshotStore.prototype.getRefSnap = function(component, apolloActionId, refId) {
  const componentStore = this.snapshots.get(component);
  if(!componentStore) return null;
  const apolloActionStore = componentStore[apolloActionId];
  if(!apolloActionStore) return null;
  return apolloActionStore[refId];
}

export default RefSnapshotStore;