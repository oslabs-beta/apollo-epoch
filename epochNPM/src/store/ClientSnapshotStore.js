/*
  This will store the Apollo Client Cache clones, the apollo action Id will correspond to a query or mutation Id from Epoch.
  The clientClone will be a deep clone of the Apollo Client Cache object at a specific period in time.

------------------
  Data Structure
------------------
    historicalClient: {
      apolloActionId: clientClone
    }
*/

function ClientStore() {
  const historicalClients = {};

  Object.defineProperties(this, {
    historicalClients: {
      get() {
        return historicalClients;
      },
    },
  });
}

ClientStore.prototype.getHistoricalClient = function (apolloActionId) {
  return this.historicalClients[apolloActionId];
};
ClientStore.prototype.addHistoricalClient = function (clientClone, apolloActionId) {
  this.historicalClients[apolloActionId] = clientClone;
};

export default ClientStore;