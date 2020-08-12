import * as React from 'react';
import Nav from '../components/Nav';
import QueryInfo from '../components/QueryInfo';
import ResponseInfo from '../components/ResponseInfo';
import StateInfo from '../components/StateInfo';
import DiffInfo from '../components/DiffInfo';

// export interface InfoContainerProps {}

// type infoTypes = {
//   [infoType: string]: JSX.Element;
// };

const InfoContainer = () => {
  const [selectedInfo, setSelectedInfo] = React.useState('');
  const info = {
    QueryInfo: <QueryInfo />,
    ResponseInfo: <ResponseInfo />,
    StateInfo: <StateInfo />,
    DiffInfo: <DiffInfo />,
  };
  return (
    <>
      <Nav />
      {/* Use info object to conditionally render out QueryInfo | ResponseInfo | StateInfo | DiffInfo */}
      {info[selectedInfo]}
    </>
  );
};

export default InfoContainer;
