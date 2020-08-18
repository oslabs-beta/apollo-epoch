import React from 'react';
import forward from '../static/forward.png';

const TimeButtons = () => {
  return (
    <div className="time-buttons">
      <img className="backward-button" src={forward} alt="forward-button" />
      <img className="forward-button" src={forward} alt="forward-button" />
    </div>
  );
};

export default TimeButtons;
