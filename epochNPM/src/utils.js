/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import { apolloFunctions, refTags } from './refTags';

// Identifies if ref was created by Apollo when we overwite React.useRef

export function getEpochRefTag(stackTrace) {
  let callerName = stackTrace.replace(/^Error\s+/, ''); // Sanitize Chrome
  callerName = callerName.split('\n')[1]; // 1st item is this, 2nd item is caller
  callerName = callerName.replace(/^\s+at Object./, ''); // Sanitize Chrome
  callerName = callerName.replace(/ \(.+\)$/, ''); // Sanitize Chrome

  const epochRefTag = callerName.includes(apolloFunctions.query)
    ? refTags.queryRef
    : callerName.includes(apolloFunctions.mutation)
    ? refTags.mutationRef
    : callerName.includes(apolloFunctions.deepMemo)
    ? refTags.deepMemoRef
    : 'noTag';

  return epochRefTag;
}

// Redundant functionality -- We're adding our own property to refs set by Apollo
// We're doing that by overwriting React.useRef -- sometimes refs aren't added
// synchronously -- this helper achieves the same result as we traverse the fiber tree
export function setEpochRefProp(epochRef, refList, epochRefTag) {
  const refDataObservableQuery = epochRef.current.currentObservable;
  const actionName = refDataObservableQuery ? refDataObservableQuery.queryName : 'noName';

  epochRef.current.epoch = {
    refId: `${actionName}${refList.claimRefId()}`,
    tag: epochRefTag,
  };
}
