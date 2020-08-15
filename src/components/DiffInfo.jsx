import * as React from 'react';
import PropTypes from 'prop-types';
import TimeButtons from './TimeButtons';
// export interface DiffInfoProps {}

const DiffInfo = ({ diff }) => {
  return (
    <div className="diff-info">
      {diff}
      <TimeButtons />
    </div>
  );
};

DiffInfo.propTypes = { diff: PropTypes.string.isRequired };

export default DiffInfo;
