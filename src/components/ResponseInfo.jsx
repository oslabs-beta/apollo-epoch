import * as React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import { epochTheme } from '../styles/themes/EpochTheme';

// export interface ResponseInfoProps {}

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

// eslint-disable-next-line react/forbid-prop-types
ResponseInfo.propTypes = { response: PropTypes.object.isRequired };

export default ResponseInfo;
