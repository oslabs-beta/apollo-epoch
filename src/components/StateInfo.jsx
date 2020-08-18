import * as React from 'react';
import PropTypes from 'prop-types';
import StateSidebar from './StateSidebar';
import StateValueDisplay from './StateValueDisplay';
import { dummyQuery } from '../dummyData/data';

// export interface StateInfoProps {}

const StateInfo = ({ stateSnapshot }) => {
  const [activeKey, setActiveKey] = React.useState(null);
  return (
    <div className="cache-display">
      <StateSidebar keyList={Object.keys(stateSnapshot)} onClick={setActiveKey} />
      {activeKey !== null && <StateValueDisplay stateValue={stateSnapshot[activeKey]} />}
    </div>
  );
};

StateInfo.propTypes = { stateSnapshot: PropTypes.object.isRequired };

export default StateInfo;
