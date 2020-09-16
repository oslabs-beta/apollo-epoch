/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const epochTheme = createMuiTheme({ palette: { primary: { main: '#20909f' } } });

const HistoryViewQuery = ({ timelineObj, onClick, active }) => {
  const { type, id, name } = timelineObj;
  const typeAbbrevs = { Query: 'Q', Mutation: 'M', 'Manual Fetch': 'MF' };
  return (
    <div
      className={`query-card ${active && 'active-query'}`}
      onClick={onClick}
      active={active}
      id={id}
    >
      <div className="query-card-text">
        <div>{`${typeAbbrevs[type]}: ${name}`}</div>
        <ThemeProvider theme={epochTheme}>
          <div
            className="time-stamp"
            role="presentation"
            style={{
              fontSize: '2px',
              maxWidth: '50px',
              maxHeight: '20px',
              minWidth: '50px',
              minHeight: '20px',
            }}
          >
            <p>No Time</p>
          </div>
        </ThemeProvider>
      </div>
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
