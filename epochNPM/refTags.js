// This should make our files easy to update should Apollo make any naming changes

// These are the names of the functions that create refs in Apollo and our corresponding
// tags to so we can identify them by type when initiating timeTravel and execute
// different logic based on type if need be
export const apolloFunctions = {
  query: 'useBaseQuery',
  mutation: 'useMutation',
  deepMemo: 'useDeepMemo'
}

export const refTags = {
    queryRef: 1,
    mutationRef: 2,
    deepMemoRef: 3,
  }
