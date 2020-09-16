/* eslint-disable react/button-has-type */
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HistoryContainer from './HistoryContainer';
import InfoContainer from './InfoContainer';
import SphereLoader from '../components/SphereLoader/SphereLoader';
import { initializeBackgroundConnection, fetchApollo } from '../store/entities/apollo';
import { initializeNetworkListener } from '../store/messagesAndActionTypes/initializeActions';
import '../styles/main.css';

const App = () => {
  const dispatch = useDispatch();
  const loadingApollo = useSelector((state) => state.apollo.loadingApollo);

  React.useEffect(() => {
    console.log(
      'Initializing Background Connection on Tab: ',
      chrome.devtools.inspectedWindow.tabId
    );
    dispatch(initializeBackgroundConnection());
    dispatch(initializeNetworkListener());
  }, []);

  const getCache = () => {
    dispatch(fetchApollo());
  };

  return (
    <div className="wrapper">
      <div className="main">
        <div className="heading">
          {loadingApollo && (
            <div className="loader">
              <h2>Detecting Apollo</h2>
              <SphereLoader />
            </div>
          )}
        </div>
        <div className="containers-wrapper">
          {/* // render out history  */}
          <HistoryContainer />
          {/* // render out info display */}
          <InfoContainer />
        </div>
        <button className="getCache" onClick={getCache}>
          Get Cache
        </button>
      </div>
    </div>
  );
};

export default App;
