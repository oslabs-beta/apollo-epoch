import * as React from 'react';
import PropTypes from 'prop-types';

// export interface DiffInfoProps {}

const DiffInfo = ({ diff }) => {
  return <div>{diff}</div>;
};

DiffInfo.propTypes = { diff: PropTypes.string.isRequired };

export default DiffInfo;
