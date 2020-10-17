# Apollo Epoch

A time travel debugging solution for Apollo Client 3.0 and React.

![Epoch UI](./readMeWEBMs/epoch_ui.webm)
![Shake it Off](./readMeWEBMs/epoch_ui.webm './src/static/flux_capacitor.png')

<figure class="video_container">
  <video controls="true" allowfullscreen="true">
    <source src="./readMeWEBMs/epoch_ui.webm" type="video/webm">
  </video>
</figure>

Apollo Epoch can be used as a stand alone chrome extension for tracking user initiated graphQL queries and mutations, their responses, and observing how your Apollo Cache changes over time. With the accompanying NPM package and a very small adjustment to the Apollo source code, you can also revert your Apollo state to previous points in time.

# Installation

## Basic Use

In order to track Apollo Data in a coherent timeline, there are two steps.

1. **Download our chrome extension here**: [Apollo Epoch Chrome Extension Link Coming Soon](www.comingsoon.com)

2. **Make sure your Apollo Client is configured to your liking**: [Apollo Dev Tools Configuration](https://www.apollographql.com/docs/react/development-testing/developer-tooling/#configuration)

For basic features Epoch relies on the `window.__APOLLO_CLIENT__` object mentioned in the above linked docs.

If that's all you need, you're ready to skip down to the features section of this ReadMe. For Time Travel, read on.

## Time Travel

Let's start with the ugly part. We did have a more elegant solution for this next step, but alas, the world is a cruel cruel place and weak maps are its insturnment. Currently in order for this to work in most use cases, we need to make a small adjustment to the Apollo Source code.

1. **Updating the Source** -  
    After installing Apollo's npm pacakge:
   `npm install @apollo/client`

   _Navigate here_:
   `node_modules/@apollo/client/utilities/common/canUse.js`

   _And replace this_:

   ```
   export var canUseWeakMap = typeof WeakMap === 'function' && !(typeof navigator === 'object' &&
   navigator.product === 'ReactNative');
   //# sourceMappingURL=canUse.js.map
   ```

   _With this_:

   ```
   // var canUseWeakMap = typeof WeakMap === 'function' && !(typeof navigator === 'object' &&
   //     navigator.product === 'ReactNative');
   const canUseWeakMap = false;

   export { canUseWeakMap };
   //# sourceMappingURL=canUse.js.map
   ```

   This is the exact same code that already exists in the file commented out and replaced with a permanent boolean instead. All you’re doing here is leveraging Apollo’s built in flag to ensure it uses Maps instead of Weak Maps, so that we’re able to iterate over and replace data when we jump back in time. This change will not persist in your production builds so long as you’re ignoring your node modules folder in git hub. And now you’re ready for the normal part!

   2. **Download the Package**:

   ```
    npm install apollo-epoch
   ```

   3. **Add the Component inside your Apollo Provider Wrapper**:
      Here all you'll need to do is import our component

   ```
    import ApolloEpochDevHook from 'apollo-epoch';
   ```

   and render that component inside your Apollo Provider. Be sure to pass the id of the DOM element that holds your React App (in our example that id is root):

   ```
    ReactDOM.render(
   <ApolloProvider client={client}>
    <ApolloEpochDevHook rootId='root'/>
      <Your App's Component(s) />
   </ApolloProvider>,
   document.getElementById('root'),
   );
   ```

# Features

## Tracking User Initiated Queries and Mutations

Epoch tracks all user initiated queries and mutations (some user actions can trigger multiple of each).

![Epoch timeline](./readMeWEBMs/epoch_timeline.webm)

Apollo Actions can query a server on the network or its local cache. You’ll be able to see which flavor you’re getting via the network icon, which is present when an Apollo action leaves the comfort of your browser. You’ll also be able to see the amount of time it takes to get your response.

Clicking on a query or mutation selects it and populates the information tabs to the right.

Subscriptions are currently not supported and polling is currently unreliable.

## Query String

This will display the graphQL query and variables for the selected query or mutation.

<Screen Shot here>

## Response

This is exactly what it sounds like, the response object returned by your query/mutation.

<Screen Shot>

## Cache

Displays the contents of the Apollo Cache after your selected query or mutation returned. You can select cache items to see the data stored within.

![Cache Click](./readMeWEBMs/epoch_cache_click.webm)

## Diff

The diff tab allows you to track the differences between your selected query or mutation and the previous Apollo Action by default. If you’d like to diff between your selected query and another query in your timeline, just select it via the drop down.

![Diff select](./readMeWEBMs/epoch_diff_change.webm)

You can also view the full cache by clicking the toggle in the upper left corner of the window.

![Diff full cache](./readMeWEBMs/epoch_full_cache.webm)

## Time Travel

If you have enabled time travel with the code swapping we explained above, you jump to any previous Apollo Action via the jump button.

![Epoch Jump](./readMeWEBMs/epoch_jump.webm)

If you try to initiate time travel (...or what we lovingly call, an Epoch Shift) without enabling time travel in the Apollo source code, you’ll be prompted to do so.

_A NOTE ON BRANCHING_
This feature is not fully enabled yet. If you initiate an Epoch Shift and then use your app normally, your historical cache will mutate along with whatever state changes you make.

For instance, if, throughout the course of your testing initiate four queries (Q1, Q2, Q3, and Q4), and then revert your state to Q2. You and your app will interact with the Apollo Cache as it was after Q2 returned. Your Q2 cache has replaced the Apollo Cache. If you then initiate more queries (Q5, Q6, etc). Your historical Q2 cache updates along with the rest of the app. You won’t be able to jump back to that state again.

Until branching is fully operational, we recommend reverting to your most recent snapshot before continuing to minimize the loss of history.

## Cache Snapshot

You can also take a manual snapshot of the cache whenever you want via the Get Cache button to create a sort of cache breakpoint if you will.

![Manual fetch](./readMeWEBMs/epoch_manual_cache_fetch.webm)

# On the Shoulders of Giants...

We'd be remiss if we didn't offer immense thanks to the other open source champions that influenced our humble offering. So, to the teams from Reactime, Redux Dev Tools, Apollo Dev Tools, Apollo 11, and Artemis, thank you for your commitment to open source, you folks make the world go 'round!

## Still In Beta

Please file issues as we work out best practices to contribute.
