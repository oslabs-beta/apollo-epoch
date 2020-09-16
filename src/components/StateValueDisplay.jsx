import React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import { epochTheme } from '../styles/themes/EpochTheme';

const StateValueDisplay = ({ stateValue }) => {
  return (
    <div className="state-value">
      <ReactJson
        src={stateValue}
        enableClipboard={false}
        theme={epochTheme}
        name={false}
        displayObjectSize={false}
        displayDataTypes={false}
        indentWidth={2}
      />
    </div>
  );
};

StateValueDisplay.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  stateValue: PropTypes.object.isRequired,
};

export default StateValueDisplay;
