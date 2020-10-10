/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

// this component displays a list of the keys for a given query/mutation
const StateSidebar = ({ keyList, onClick }) => {
  const [activeKey, changeActiveKey] = React.useState();
  const keyListDisplay = keyList.map((key, index) => {
    return (
      <div
        className={`key-display ${activeKey === key ? 'active-key' : ''}`}
        key={`key${index}`}
        id={key}
        // this callback function changes the currently selected key so that the corresponding data will be shown
        onClick={() => {
          changeActiveKey(key);
          onClick(key);
        }}
      >
        {key}
      </div>
    );
  });

  return (
    <div className="state-sidebar">
      <div className="keylist-wrapper">{keyListDisplay}</div>
    </div>
  );
};

StateSidebar.propTypes = {
  keyList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default StateSidebar;
