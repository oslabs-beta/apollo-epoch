import React from 'react';
import PropTypes from 'prop-types';

const StateSidebar = ({ keyList, onClick }) => {
  const keyListDisplay = keyList.map((key, index) => {
    return (
      <div className="key-display" key={`key${index}`} onClick={() => onClick(key)}>
        {key}
      </div>
    );
  });

  return <div className="state-sidebar">{keyListDisplay}</div>;
};

StateSidebar.propTypes = {
  keyList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default StateSidebar;
