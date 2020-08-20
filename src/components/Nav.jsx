import * as React from 'react';
import PropTypes from 'prop-types';

// export interface NavProps {}

const Nav = ({ setSelectedInfo }) => {
  const [activeButton, changeActiveButton] = React.useState();

  React.useEffect(() => {
    if (activeButton) {
      const active = document.getElementById(activeButton);
      active.classList.add('nav-button-active');
    }
  }, [activeButton]);
  return (
    <div className="nav">
      <div
        className="nav-button"
        id="query-button"
        onClick={() => {
          if (activeButton)
            document.getElementById(activeButton).classList.add('nav-button-active');
          changeActiveButton('query-button');
          setSelectedInfo('QueryInfo');
        }}
      >
        <p>Query</p>
      </div>
      <div
        className="nav-button"
        id="response-button"
        onClick={() => {
          changeActiveButton('response-button');
          setSelectedInfo('ResponseInfo');
        }}
      >
        <p>Response</p>
      </div>
      <div
        className="nav-button"
        id="cache-button"
        onClick={() => {
          changeActiveButton('cache-button');
          setSelectedInfo('StateInfo');
        }}
      >
        <p>Cache</p>
      </div>
      <div
        className="nav-button"
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
