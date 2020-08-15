import * as React from 'react';
import PropTypes from 'prop-types';

// export interface StateInfoProps {}

const StateInfo = ({ stateSnapshot }) => {
  return <div>{stateSnapshot}</div>;
};

StateInfo.propTypes = { stateSnapshot: PropTypes.string.isRequired };

export default StateInfo;
