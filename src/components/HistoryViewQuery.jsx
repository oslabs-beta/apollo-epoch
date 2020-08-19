/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const HistoryViewQuery = ({ timelineObj, onClick }) => {
  const { type, id } = timelineObj;
  return (
    <div className="query-card" onClick={onClick} id={id}>
      <p>{`${type} ${id}`}</p>
    </div>
  );
};

HistoryViewQuery.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  timelineObj: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default HistoryViewQuery;
