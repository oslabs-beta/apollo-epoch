/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import networkIcon from '../static/flux_capacitor.png';
import { initiateEpochShift } from '../store/entities/apollo';

const epochTheme = createMuiTheme({ palette: { primary: { main: '#20909f' } } });

// this component displays a specific query/mutation inside of the left sidebar of the extension
const HistoryViewQuery = ({ timelineObj, onClick, active, handleOpen }) => {
  const { id, name, isNetwork, timingData } = timelineObj;
  
  const dispatch = useDispatch();

  const timeTravelPossible = useSelector((state) => state.apollo.timeTravelPossible);


  // clicking buttons with this callback initiate a time jump to the associated query/mutation
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
        <div>{`${id}: ${name}`}</div>
        <div className="network-icon-and-jump">
          {isNetwork && <img src={networkIcon} alt="network" className="network-icon" />}
          <ThemeProvider theme={epochTheme}>
            {id[0] !== 'F' && (
              <div className="button-switcher-container">
                <div className="button-switcher">
                  <div className="time-stamp">
                    {timingData && (
                      <p>
                        {Math.floor(timingData)}
                        ms
                      </p>
                    )}
                    {!timingData && <p>Cache</p>}
                  </div>
                  <div
                    className="jump-button"
                    onClick={() => {
                      if(timeTravelPossible) epochShift(id);
                      else handleOpen();
                    }}
                  >
                    <p>Jump</p>
                  </div>
                </div>
              </div>
            )}
          </ThemeProvider>
        </div>
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
