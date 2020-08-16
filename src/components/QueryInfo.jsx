import * as React from 'react';
import PropTypes from 'prop-types';
import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';
import '../styles/graphQLCodeBlock.css';

// export interface QueryInfoProps {}

const QueryInfo = ({ queryString }) => {
  return (
    <div>
      {!queryString && <h2>No Query String to Render</h2>}
      {queryString && <GraphqlCodeBlock className="GraphqlCodeBlock" queryBody={queryString} />}
    </div>
  );
};

QueryInfo.propTypes = { queryString: PropTypes.string.isRequired };

export default QueryInfo;
