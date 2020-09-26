import {apolloFunctions, refTags} from './refTags';

export function getEpochRefTag(stackTrace) {
  let callerName = stackTrace.replace(/^Error\s+/, ''); // Sanitize Chrome
  callerName = callerName.split("\n")[1]; // 1st item is this, 2nd item is caller
  callerName = callerName.replace(/^\s+at Object./, ''); // Sanitize Chrome
  callerName = callerName.replace(/ \(.+\)$/, ''); // Sanitize Chrome

  const epochRefTag = callerName.includes(apolloFunctions.query) ? refTags.queryRef :
    callerName.includes(apolloFunctions.mutation) ? refTags.mutationRef :
    callerName.includes(apolloFunctions.deepMemo) ? refTags.deepMemoRef : 'noTag';

  return epochRefTag;
}