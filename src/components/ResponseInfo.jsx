import * as React from 'react';
import PropTypes from 'prop-types';

// export interface ResponseInfoProps {}

const ResponseInfo = ({ responseString }) => {
  return <div>{responseString}</div>;
};

ResponseInfo.propTypes = { responseString: PropTypes.string.isRequired };

export default ResponseInfo;
