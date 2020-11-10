/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import { getApolloContext } from '@apollo/client/react/context/ApolloContext';
import { canUseWeakMap } from '@apollo/client/utilities/common/canUse';
import EpochStore from './src/store/EpochStore';
import { getEpochRefTag } from './src/utils';
import { refTags } from './src/refTags';
import CustomFiberTree from './src/CustomFiberTree';
import epochShift from './src/timeJump';

// This component creates our DevHook, initializes a listener for messages from
// Epoch and overwrites key react functions/objects

// eslint-disable-next-line react/prop-types
const ApolloEpochDevHook = ({ rootId }) => {
  // Overwrite descrtiptor Object so we can change Context
  // Not necerssary for basic Apollo Cache time travel
  // const apolloContextSymbol = typeof Symbol === 'function' && Symbol.for ?
  //   Symbol.for('__APOLLO_CONTEXT__') :
  //   '__APOLLO_CONTEXT__';

  // Object.defineProperty(React, apolloContextSymbol, {
  //   enumerable: true,
  //   configurable: true,
  //   writable: false,
  // });

  const apolloContext = useContext(getApolloContext());
  const apolloClient = apolloContext.client;
  const timeTravelPossible = !canUseWeakMap;

  const epochHookProp = '__APOLLO_EPOCH_FIBER_HOOK__';
  if (!window[epochHookProp]) window[epochHookProp] = new EpochStore(apolloClient);
  const epochStore = window[epochHookProp];
  const hostRootFiber = document.getElementById(rootId)._reactRootContainer._internalRoot;
  hostRootFiber._epochCurrent = hostRootFiber.current;

  // TEST ONLY -- Easy Access
  epochStore.currentApolloContext = apolloContext;

  Object.defineProperty(hostRootFiber, 'current', {
    get() {
      return hostRootFiber._epochCurrent;
    },
    set(value) {
      hostRootFiber._epochCurrent = value;

      const commitId = Date.now();
      const commitRecord = epochStore.commitLog.initializeCommitRecord(commitId, apolloClient);
      const newCustomTree = new CustomFiberTree(value, epochStore, commitRecord, 'randomKey'); // not storing this anywhere right now...looking at side effect storage in epoch store
      return value;
    },
  });

  // Apply our properties to Apollo's refs so we can snapshot and swap when needed
  // Redundant functionality in fiber tree traversal -- Leaving it in both places
  // Allows for comparisons in testing
  const unPatchedRef = React.useRef;
  let count = 0;
  React.useRef = (...args) => {
    const stackTrace = new Error().stack; // Only tested in latest FF and Chrome
    const epochRefTag = getEpochRefTag(stackTrace);

    if (
      epochRefTag === refTags.queryRef ||
      epochRefTag === refTags.mutationRef ||
      epochRefTag === refTags.deepMemoRef
    ) {
      const epochRef = unPatchedRef(...args);

      // Testing
      // eslint-disable-next-line no-plusplus
      epochStore.reactUseRefList.addRef('noComponent', epochRef, ++count, epochRefTag);

      if (epochRef.current && !epochRef.current.epoch && epochRefTag === refTags.queryRef) {
        const actionName =
          epochRefTag === 1 ? epochRef.current.currentObservable.queryName : 'noName';

        epochRef.current.epoch = {
          refId: `${actionName}${epochStore.refList.claimRefId()}`,
          tag: epochRefTag,
        };
      }
      // Refs are not extensible -- BUT they should reassign themselves if we adjust their tick
      // when we do a time jump and we can still log them on tree traversal in the linked list
      // They just won't have an ID and won't have any stored data...we'll just need to change their
      // tick and they should use our updated q / m data to recreate themselves

      return epochRef;
    }
    return unPatchedRef(...args); // if not Apollo Q or M, run function as normal
  };

  // Create Listener for Epoch Messages
  window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    if (event.data) {
      if (event.data.type === '$$$epochPanelOpened$$$') {
        window.postMessage({ type: '$$$timeTravelPossible$$$', payload: timeTravelPossible }, '*');
      }

      if (event.data.type === '$$$takeStateSnapshot$$$') {
        const lastCommitId = `${epochStore.commitLog.lastCommit}`;
        const clientClone = epochStore.commitLog.commits[lastCommitId].clientSnap;

        const { id: apolloActionId, timeStamp } = event.data.payload;
        epochStore.clientSnaps.addHistoricalClient(clientClone, apolloActionId);
        epochStore.commitLog.apolloActionIds[apolloActionId] = timeStamp;
      }

      if (event.data.type === '$$$epochShift$$$') {
        const { apolloActionId } = event.data.payload;
        const historicalClient = epochStore.clientSnaps.getHistoricalClient(apolloActionId);

        const jumpRecord = epochShift(
          epochStore.currentApolloClient,
          historicalClient,
          hostRootFiber.current,
          apolloActionId
        );

        // Trigger Update Entry in Epoch
        window.postMessage({ type: '$$$completedEpochShift$$$', payload: apolloActionId }, '*');
      }
    }
  });

  return null;
};

export default ApolloEpochDevHook;
