import React from 'react';
import PropTypes from 'prop-types';

const HistoryViewQuery = ({ queryNum, onClick }) => {
  return (
    <div className="query-card" onClick={onClick}>
      <p>{`Query ${queryNum}`}</p>
    </div>
  );
};

HistoryViewQuery.propTypes = {
  queryNum: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default HistoryViewQuery;
