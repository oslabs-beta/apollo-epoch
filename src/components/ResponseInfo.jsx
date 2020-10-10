import * as React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import { epochTheme } from '../styles/themes/EpochTheme';

// this component displays a collapsible view of the response inside of the InfoContainer for the currently selected query/mutation
const ResponseInfo = ({ response }) => {
  return (
    <div className="response-info">
      {!response && <h2>No Response to Render</h2>}
      {response && (
        <ReactJson
          src={response}
          enableClipboard={false}
          theme={epochTheme}
          name={false}
          displayObjectSize={false}
          displayDataTypes={false}
          indentWidth={2}
        />
      )}
    </div>
  );
};

// eslint-disable-next-line react/forbid-prop-types, react/require-default-props
ResponseInfo.propTypes = { response: PropTypes.object };

export default ResponseInfo;
