import * as React from 'react';
import HistoryContainer from './HistoryContainer';
import InfoContainer from './InfoContainer';

const App: React.FC = () => {
  return (
    <div className="main">
      {/* // render out history  */}
      <HistoryContainer />
      {/* // render out info display */}
      <InfoContainer />
    </div>
  );
};

export default App;
