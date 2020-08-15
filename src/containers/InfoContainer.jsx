import * as React from 'react';
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
  const selectedQuery = dummyQuery;
  const info = {
    QueryInfo: <QueryInfo queryString={selectedQuery.queryString} />,
    ResponseInfo: <ResponseInfo response={selectedQuery.response} />,
    StateInfo: <StateInfo stateSnapshot={selectedQuery.stateSnapshot} />,
    DiffInfo: <DiffInfo diff={selectedQuery.diff} />,
  };
  return (
    <>
      <Nav setSelectedInfo={setSelectedInfo} />
      {/* Use info object to conditionally render out QueryInfo | ResponseInfo | StateInfo | DiffInfo */}
      {info[selectedInfo]}
    </>
  );
};

export default InfoContainer;
