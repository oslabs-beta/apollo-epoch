# Apollo Epoch

A time travel debugging solution for Apollo Client 3.0 and React.

![Epoch UI](./readMeGifs/epoch_ui.gif)

Apollo Epoch can be used as a stand alone chrome extension for tracking user initiated graphQL queries and mutations, their responses, and observing how your Apollo Cache changes over time. With the accompanying NPM package and a very small adjustment to the Apollo source code, you can also revert your Apollo state to previous points in time.

# Installation

## Basic Use

In order to track Apollo Data in a coherent timeline, there are two steps.

1. **Download our chrome extension here**: [Apollo Epoch Chrome Extension Link Coming Soon](www.comingsoon.com)

2. **Make sure you're Apollo Client is configured to your liking**: [Apollo Dev Tools Configuration](https://www.apollographql.com/docs/react/development-testing/developer-tooling/#configuration)

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

   This is the exact same code that already exists in the file commented out and replaced with a permanent boolean instead. All you’re doing here is leveraging Apollo’s built in flag to ensure it uses Maps instead of Weakmaps, so that we’re able to iterate over and replace data when we jump back in time. This change will not persist in your production builds so long as you’re ignoring your node modules folder in git hub. And now you’re ready for the normal part!

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
