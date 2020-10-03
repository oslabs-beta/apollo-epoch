/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { initiateEpochShift } from '../store/entities/apollo';

const epochTheme = createMuiTheme({ palette: { primary: { main: '#20909f' } } });

const HistoryViewQuery = ({ timelineObj, onClick, active }) => {
  const dispatch = useDispatch();
  const { type, id, name } = timelineObj;
  const typeAbbrevs = { Query: 'Q', Mutation: 'M', 'Manual Fetch': 'MF' };

  const epochShift = (apolloActionId) => {
    dispatch(initiateEpochShift({ apolloActionId }));
  };

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
          <div className="button-switcher-container">
            <div className="button-switcher">
              <div className="time-stamp">
                <p>No Time</p>
              </div>
              <div
                className="jump-button"
                onClick={() => {
                  epochShift(id);
                }}
              >
                <p>Jump</p>
              </div>
            </div>
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
