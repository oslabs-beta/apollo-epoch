import * as React from 'react';
import PropTypes from 'prop-types';
import StateSidebar from './StateSidebar';
import StateValueDisplay from './StateValueDisplay';

// this component displays a list of the keys inside the cache for a given query/mutation
// selecting a key will render the data for that key
const StateInfo = ({ stateSnapshot }) => {
  const [activeKey, setActiveKey] = React.useState(null);
  return (
    <div className="cache-display">
      {!stateSnapshot && <h2>No Cache</h2>}
      {stateSnapshot && (
        <>
          <StateSidebar keyList={Object.keys(stateSnapshot)} onClick={setActiveKey} />
          {activeKey !== null && <StateValueDisplay stateValue={stateSnapshot[activeKey]} />}
        </>
      )}
    </div>
  );
};

// eslint-disable-next-line react/forbid-prop-types
StateInfo.propTypes = { stateSnapshot: PropTypes.object.isRequired };

export default StateInfo;
