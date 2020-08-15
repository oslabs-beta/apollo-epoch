import * as React from 'react';
import PropTypes from 'prop-types';

// export interface NavProps {}

const Nav = ({ setSelectedInfo }) => {
  return (
    <div className="nav">
      <div className="nav-button" onClick={() => setSelectedInfo('QueryInfo')}>
        <p>Query</p>
      </div>
      <div className="nav-button" onClick={() => setSelectedInfo('ResponseInfo')}>
        <p>Response</p>
      </div>
      <div className="nav-button" onClick={() => setSelectedInfo('StateInfo')}>
        <p>Cache</p>
      </div>
      <div className="nav-button" onClick={() => setSelectedInfo('DiffInfo')}>
        <p>Diff</p>
      </div>
    </div>
  );
};

Nav.propTypes = { setSelectedInfo: PropTypes.func.isRequired };

export default Nav;
