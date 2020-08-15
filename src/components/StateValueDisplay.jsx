import React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';

const StateValueDisplay = ({ stateValue }) => {
  return (
    <div className="state-value">
      <ReactJson
        src={stateValue}
        enableClipboard={false}
        theme="codeschool"
        displayObjectSize={false}
        displayDataTypes={false}
        indentWidth={2}
      />
    </div>
  );
};

StateValueDisplay.propTypes = {
  stateValue: PropTypes.object.isRequired,
};

export default StateValueDisplay;
