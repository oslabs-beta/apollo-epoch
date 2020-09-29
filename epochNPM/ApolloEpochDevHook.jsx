import React, { useEffect, useContext } from 'react'
import {getApolloContext} from '@apollo/client/react/context/ApolloContext';
import EpochStore from './store/EpochStore';
import {getEpochRefTag} from './utils';
import {refTags} from './refTags';
import CustomFiberTree from './CustomFiberTree';

const ApolloEpochDevHook = ({rootId}) => {
  const epochHookProp = '__APOLLO_EPOCH_FIBER_HOOK__';
  if(!window[epochHookProp]) window[epochHookProp] = new EpochStore();
  const epochStore = window[epochHookProp];
  const hostRootFiber = document.getElementById(rootId)._reactRootContainer._internalRoot;
  hostRootFiber._epochCurrent = hostRootFiber.current;

  Object.defineProperty(hostRootFiber, 'current', {
    get() {return hostRootFiber._epochCurrent},
    set(value) {
      hostRootFiber._epochCurrent = value;
      console.log('rootFiber Was Swapped to -> ', value);
      const newCustomTree = new CustomFiberTree(value, epochStore, 'randomKey') // not storing this anywhere right now...looking at side effect storage in epoch store
      return value;
    }
  });

  // Apply our properties to Apollo's refs so we can snapshot and swap when needed
  const unPatchedRef = React.useRef;
  React.useRef = (...args) => {
    let stackTrace = (new Error()).stack; // Only tested in latest FF and Chrome
    const epochRefTag = getEpochRefTag(stackTrace);
    console.log('Ref Context -> ', epochRefTag);

    if(epochRefTag === refTags.queryRef || epochRefTag === refTags.mutationRef || epochRefTag === refTags.deepMemoRef  ) {
      const epochRef = unPatchedRef(...args);
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

      // if(epochRef.current && epochRefTag === 3 && ! epochRef.epoch) {
      //   epochRef.epoch = {
      //     refId: epochStore.refList.claimRefId(),
      //   }
      // }
      console.log('epochRef -> ', epochRef)
      return epochRef
    }
    return unPatchedRef(...args); // if not Apollo Q or M, run function as normal
  }

  useEffect(() => {
    console.log('Rerendered The DevHook!!')
  },[]);

return ( <>{console.log('Apollo Context -> ', 'context')}</> );
}
 
export default ApolloEpochDevHook;