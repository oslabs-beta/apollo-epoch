/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import Button from '@material-ui/core/Button';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const epochTheme = createMuiTheme({ palette: { primary: { main: '#20909f' } } });

export const TimeTravelDirections = ({ onClose, modal }) => {
  return (
    <div className={`time-travel-directions${modal ? ' time-travel-directions-modal' : ''}`}>
      <div className="time-travel-dir-inner">
        <h3>Hey there! We noticed that you don't have time travel enabled.</h3>
        <h5>Here's how to get it working: </h5>
        <ThemeProvider theme={epochTheme}>
          <div className="code-wrapper">
            <ol>
              <li>Install apollo-epoch</li>
              <SyntaxHighlighter language="javascript" style={agate}>
                {`npm install apollo-epoch`}
              </SyntaxHighlighter>
              <li>Import the component</li>
              <SyntaxHighlighter language="javascript" style={agate}>
                {`import ApolloEpochDevHook from 'apollo-epoch';`}
              </SyntaxHighlighter>
              <li>
                Render the component in the main app file (e.g. App.jsx or index.jsx) as a child of
                the ApolloProvider.
              </li>
              <SyntaxHighlighter language="javascript" style={agate}>
{`<ApolloProvider client={client}>
    <ApolloEpochDevHook rootId="root"/>
    <IsLoggedIn />
  </ApolloProvider>
`}
              </SyntaxHighlighter>
              <li>Navigate to node_modules/@apollo/client/utilities/common/canUse.js</li>
              <p>Replace this:</p>
              <SyntaxHighlighter language="javascript" style={agate}>
                {`export var canUseWeakMap = typeof WeakMap === 'function' \n
&& !(typeof navigator === 'object' && navigator.product === 'ReactNative'); \n
//# sourceMappingURL=canUse.js.map`}
              </SyntaxHighlighter>
              <p>With This:</p>
              <SyntaxHighlighter language="javascript" style={agate}>
                {`// var canUseWeakMap = typeof WeakMap === 'function' && !(typeof navigator === 'object' &&
//     navigator.product === 'ReactNative');
const canUseWeakMap = false;

export { canUseWeakMap };
//# sourceMappingURL=canUse.js.map
`}
              </SyntaxHighlighter>
              <li>Rebuild and restart your application, and restart Epoch in your dev panel.</li>
            </ol>
          </div>
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};
