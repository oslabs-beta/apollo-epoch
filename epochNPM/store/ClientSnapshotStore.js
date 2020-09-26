/*
  Break these two stores up this way outside of the Tardis allows us to pass only one store of data to the Custom Fiber Tree

  This will store the Apollo Client clones, the apollo action Id will correspond to a query or mutation Id from Epoch.
  The clientClone will be a deep clone of the Apollo Client object at a specific period in time.

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