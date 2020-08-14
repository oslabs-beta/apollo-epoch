import * as React from 'react';

// export interface NavProps {}

const Nav = () => {
  return (
    <div className="nav">
      <div className="nav-button">
        <p>Query</p>
      </div>
      <div className="nav-button">
        <p>Cache</p>
      </div>
      <div className="nav-button">
        <p>Diff</p>
      </div>
      <div className="nav-button">
        <p>History</p>
      </div>
    </div>
  );
};

export default Nav;
