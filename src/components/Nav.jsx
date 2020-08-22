/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import PropTypes from 'prop-types';

// export interface NavProps {}

const Nav = ({ setSelectedInfo }) => {
  const [activeButton, changeActiveButton] = React.useState();
  return (
    <div className="nav">
      <div
        className={`nav-button ${activeButton === 'query-button' && 'nav-button-active'}`}
        id="query-button"
        onClick={() => {
          changeActiveButton('query-button');
          setSelectedInfo('QueryInfo');
        }}
      >
        <p>Query</p>
      </div>
      <div
        className={`nav-button ${activeButton === 'response-button' && 'nav-button-active'}`}
        id="response-button"
        onClick={() => {
          changeActiveButton('response-button');
          setSelectedInfo('ResponseInfo');
        }}
      >
        <p>Response</p>
      </div>
      <div
        className={`nav-button ${activeButton === 'cache-button' && 'nav-button-active'}`}
        id="cache-button"
        onClick={() => {
          changeActiveButton('cache-button');
          setSelectedInfo('StateInfo');
        }}
      >
        <p>Cache</p>
      </div>
      <div
        className={`nav-button ${activeButton === 'diff-button' && 'nav-button-active'}`}
        id="diff-button"
        onClick={() => {
          changeActiveButton('diff-button');
          setSelectedInfo('DiffInfo');
        }}
      >
        <p>Diff</p>
      </div>
    </div>
  );
};

Nav.propTypes = { setSelectedInfo: PropTypes.func.isRequired };

export default Nav;
