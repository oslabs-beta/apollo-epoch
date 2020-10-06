import React, { useEffect, useContext } from 'react'
import {getApolloContext} from '@apollo/client/react/context/ApolloContext';
import EpochStore from './store/EpochStore';
import {getEpochRefTag} from './utils';
import {refTags} from './refTags';
import CustomFiberTree from './CustomFiberTree';
import epochShift from './timeJump';

const ApolloEpochDevHook = ({rootId}) => {
  // Overwrite descrtiptor Object so we can change Context
  // const apolloContextSymbol = typeof Symbol === 'function' && Symbol.for ?
  //   Symbol.for('__APOLLO_CONTEXT__') :
  //   '__APOLLO_CONTEXT__';

  // Object.defineProperty(React, apolloContextSymbol, {
  //   enumerable: true,
  //   configurable: true,
  //   writable: false,
  // });

  const apolloClient = useContext(getApolloContext()).client;
  const apolloContext = useContext(getApolloContext());

  const epochHookProp = '__APOLLO_EPOCH_FIBER_HOOK__';
  if(!window[epochHookProp]) window[epochHookProp] = new EpochStore(apolloClient);
  const epochStore = window[epochHookProp];
  const hostRootFiber = document.getElementById(rootId)._reactRootContainer._internalRoot;
  hostRootFiber._epochCurrent = hostRootFiber.current;

  //TEST ONLY
  epochStore.currentApolloContext = apolloContext

  Object.defineProperty(hostRootFiber, 'current', {
    get() {return hostRootFiber._epochCurrent},
    set(value) {
      hostRootFiber._epochCurrent = value;
      console.log('rootFiber Was Swapped to -> ', value);
      const commitId = Date.now();
      const commitRecord = epochStore.commitLog.initializeCommitRecord(commitId, apolloClient);
      const newCustomTree = new CustomFiberTree(value, epochStore, commitRecord, 'randomKey') // not storing this anywhere right now...looking at side effect storage in epoch store
      return value;
    }
  });

  // Apply our properties to Apollo's refs so we can snapshot and swap when needed
  const unPatchedRef = React.useRef;
  let count = 0;
  React.useRef = (...args) => {
    let stackTrace = (new Error()).stack; // Only tested in latest FF and Chrome
    const epochRefTag = getEpochRefTag(stackTrace);
   // console.log('Ref Context -> ', epochRefTag);

    if(epochRefTag === refTags.queryRef || epochRefTag === refTags.mutationRef || epochRefTag === refTags.deepMemoRef  ) {
      const epochRef = unPatchedRef(...args);

      // Testing
      epochStore.reactUseRefList.addRef('noComponent', epochRef, ++count, epochRefTag)

      if(epochRef.current && !epochRef.current.epoch && epochRefTag === refTags.queryRef) {
        const actionName = epochRefTag === 1 ? epochRef.current.currentObservable.queryName : 'noName'
      
        epochRef.current.epoch = {
          refId: `${actionName}${epochStore.refList.claimRefId()}`,
          tag: epochRefTag
        };
      }
      // Refs are not extensible -- BUT they should reassign themselves if we adjust their tick
      // when we do a time jump and we can still log them on tree traversal in the linked list
      // They just won't have an ID and won't have any stored data...we'll just need to change their
      // tick and they should use our updated q / m data to recreate themselves

      return epochRef
    }
    return unPatchedRef(...args); // if not Apollo Q or M, run function as normal
  }

  // useEffect(() => {
  //   console.log('Rerendered The DevHook!!')
  // },[]);

  // Create Listener for Epoch Messages
  window.addEventListener('message', (event) => {
    if(event.source !== window) return;
    if(event.data) {
      if(event.data.type === '$$$takeStateSnapshot$$$') {
        const lastCommitId = `${epochStore.commitLog.lastCommit}`;
        const clientClone = epochStore.commitLog.commits[lastCommitId].clientSnap;
        console.log('CLONED CLIENT -> ',clientClone);
        console.log('ADDING ACTION ID TIME')
        const {id: apolloActionId, timeStamp} = event.data.payload;
        epochStore.clientSnaps.addHistoricalClient(clientClone, apolloActionId);
        epochStore.commitLog.apolloActionIds[apolloActionId] = timeStamp
      }

      if(event.data.type === '$$$epochShift$$$') {
        const {apolloActionId} = event.data.payload;
        const historicalClient = epochStore.clientSnaps.getHistoricalClient(apolloActionId);
        console.log('CURRENT CLIENT -> ', epochStore.currentApolloClient);
        console.log(`${apolloActionId} Historical Client -> `, historicalClient);
        // TESTING PURPOSES ONLY
        historicalClient.zzzUPDATESUCCESS = {type: 'SUCCESS', AAID: apolloActionId};

        const jumpRecord = epochShift(epochStore.currentApolloClient, historicalClient, hostRootFiber.current);
        console.log('CURRENT CLIENT POST SHIFT -> ', epochStore.currentApolloClient);
        console.log('APOLLO WINDOW POST SHIFT -> ', window.__APOLLO_CLIENT__);
        console.log('JUMP RECORD -> ', jumpRecord);

      }

    }
  })

return ( <>{console.log('Apollo Context -> ', 'context')}</> );
}
 
export default ApolloEpochDevHook;