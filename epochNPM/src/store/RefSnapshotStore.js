/*
Bones for future development

This was intended to store ref states along side their components as keys. In order to swap
out ref states we'd need ref states at a given point in time and the components on which those
refs were created. This is currently NOT USED in time travel. Refs are created and destroyed so 
ultimately this wasn't going to work as written. It's still here because in deeper implementations
we will have to store ref states, and this will be the structure we'll use. 

--------------------
Data Strucutre
--------------------
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

RefSnapshotStore.prototype.addRef = function (component, apolloActionId, refId, snapshot) {
  if (!this.snapshots.has(component)) this.snapshots.set(component, {});
  const actionIdStore = this.snapshots.get(component);
  if (!actionIdStore[apolloActionId]) actionIdStore[apolloActionId] = {};
  actionIdStore[apolloActionId] = { [refId]: snapshot };

  return actionIdStore[apolloActionId];
};

RefSnapshotStore.prototype.getRefSnap = function (component, apolloActionId, refId) {
  const componentStore = this.snapshots.get(component);
  if (!componentStore) return null;
  const apolloActionStore = componentStore[apolloActionId];
  if (!apolloActionStore) return null;
  return apolloActionStore[refId];
};

export default RefSnapshotStore;
