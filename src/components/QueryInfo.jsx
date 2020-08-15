import * as React from 'react';
import PropTypes from 'prop-types';
import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';

// export interface QueryInfoProps {}

const QueryInfo = ({ queryString }) => {
  return <GraphqlCodeBlock className="GraphqlCodeBlock" queryBody={queryString} />;
};

QueryInfo.propTypes = { queryString: PropTypes.string.isRequired };

export default QueryInfo;
