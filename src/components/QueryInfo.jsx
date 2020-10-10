import * as React from 'react';
import PropTypes from 'prop-types';
import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';
import ReactJson from 'react-json-view';
import { epochTheme } from '../styles/themes/EpochTheme';
import '../styles/graphQLCodeBlock.css';

// this component displays the query in a collapsible view inside of the InfoContainer
const QueryInfo = ({ queryString, variables }) => {
  return (
    <div className="query-info">
      {!queryString && <h2>No Query String to Render</h2>}
      {queryString && (
        <>
          <p>Query String</p>
          <GraphqlCodeBlock className="GraphqlCodeBlock" queryBody={queryString} />
        </>
      )}
      {queryString && (
        <>
          <br />
          <p>Variables</p>

          <ReactJson
            src={variables}
            enableClipboard={false}
            theme={epochTheme}
            name={false}
            displayObjectSize={false}
            displayDataTypes={false}
            indentWidth={2}
            collapsed={false}
          />
        </>
      )}
    </div>
  );
};

QueryInfo.propTypes = {
  queryString: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  variables: PropTypes.object.isRequired,
};

export default QueryInfo;
