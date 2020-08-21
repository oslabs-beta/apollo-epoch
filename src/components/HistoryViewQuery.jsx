/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const HistoryViewQuery = ({ timelineObj, onClick, active }) => {
  const { type, id } = timelineObj;
  return (
    <div className={`query-card ${active && 'active-query'}`} onClick={onClick} active={active}>
      <p>{`${type} ${id}`}</p>
    </div>
  );
};

HistoryViewQuery.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  timelineObj: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default HistoryViewQuery;
