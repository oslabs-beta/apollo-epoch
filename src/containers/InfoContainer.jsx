import * as React from 'react';
import { useSelector } from 'react-redux';
import Nav from '../components/Nav';
import QueryInfo from '../components/QueryInfo';
import ResponseInfo from '../components/ResponseInfo';
import StateInfo from '../components/StateInfo';
import DiffInfo from '../components/DiffInfo';
import { dummyQuery } from '../dummyData/data';

// export interface InfoContainerProps {}

// type infoTypes = {
//   [infoType: string]: JSX.Element;
// };

const InfoContainer = () => {
  // changes the info based on the tab selected
  const [selectedInfo, setSelectedInfo] = React.useState('QueryInfo');
  // get selected query based on state
  const selectedQuery = useSelector((state) => state.apollo.activeQuery);
  const info = {
    QueryInfo: <QueryInfo queryString={selectedQuery.queryString} />,
    ResponseInfo: <ResponseInfo response={selectedQuery.response} />,
    StateInfo: <StateInfo stateSnapshot={selectedQuery.cacheSnapshot} />,
    DiffInfo: <DiffInfo diff={selectedQuery.diff} />,
  };
  return (
    <div className="info-container">
      <Nav setSelectedInfo={setSelectedInfo} />
      <div className="inner-info-wrapper">
        {/* Use info object to conditionally render out QueryInfo | ResponseInfo | StateInfo | DiffInfo */}
        <div className="info-display">{info[selectedInfo]}</div>
      </div>
    </div>
  );
};

export default InfoContainer;
