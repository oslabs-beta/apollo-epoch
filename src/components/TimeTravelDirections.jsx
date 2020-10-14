  import React from 'react'
import Button from '@material-ui/core/Button'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/dist/esm/styles/hljs';



const epochTheme = createMuiTheme({ palette: { primary: { main: '#20909f' } } });

export const TimeTravelDirections = ({onClose, modal}) => {
  return (
    <div className={`time-travel-directions${modal ? ' time-travel-directions-modal':''}`}>
      <div className="time-travel-dir-inner">
      <h1>Time Travel Directions</h1>
      <ThemeProvider theme={epochTheme}>
        <div className='code-wrapper'>
          <ol>
            <li>Install apollo-epoch</li>
            <SyntaxHighlighter language='javascript' style={agate}>
              {`npm install apollo-epoch`}
            </SyntaxHighlighter>  
            <li>Import the component</li>
            <SyntaxHighlighter language='javascript' style={agate}>
              {`import ApolloEpochDevHook from 'apollo-epoch';`}
            </SyntaxHighlighter>
            <li>Render the component in the main app file. (e.g. App.jsx or index.jsx)</li>
            <SyntaxHighlighter language='javascript' style={agate}>
              {`<ApolloEpochDevHook rootId="root"/>`}
            </SyntaxHighlighter>
            <li>Navigate to node_modules/@apollo/client/utilities/common/canUse.js</li>            
            <li>Comment out the below line</li>            
            <SyntaxHighlighter language='javascript' style={agate}>
              {`var canUseWeakMap = typeof WeakMap === 'function' && \n !(typeof navigator === 'object' && navigator.product === 'ReactNative');`}
            </SyntaxHighlighter>
            <li>Below the commented code, type in</li>
            <SyntaxHighlighter language='javascript' style={agate}>
              {`const canUseWeakMap = false;`}
            </SyntaxHighlighter>
            <li>Now canUse.js should look like this</li>
            <SyntaxHighlighter language='javascript' style={agate}>
            {`// var canUseWeakMap =\n//   typeof WeakMap === 'function' &&\n//   !(typeof navigator === 'object' && navigator.product === 'ReactNative');\nconst canUseWeakMap = false;\nexport { canUseWeakMap };`}
            </SyntaxHighlighter>
            <li>Rebuild and restart your application.</li>
          </ol>
        </div>
        <Button variant="contained" color="primary" onClick={onClose}>Close</Button>
      </ThemeProvider>

      </div>
      
    </div>
  )
}
