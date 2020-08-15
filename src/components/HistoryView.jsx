import * as React from 'react';
import { dummyList } from '../dummyData/data';
import HistoryViewQuery from './HistoryViewQuery';

// export interface HistoryViewProps {}

const HistoryView = () => {
  // Use Reudx hook to get list of queries
  const queryHistory = dummyList;
  // This should probably be a redux hook to set the active query in App state?
  const [activeQuery, setActiveQuery] = React.useState(-1);
  const queries = [];
  for (let i = 0; i < queryHistory.length; i += 1) {
    queries.push(<HistoryViewQuery key={i} queryNum={i + 1} onClick={() => setActiveQuery(i)} />);
  }

  return (
    <div className="history-view">
      <h1>Queries</h1>
      <h2>
        ActiveQuery:
        {activeQuery}
      </h2>
      <div className="query-cards">{queries}</div>
    </div>
  );
};

export default HistoryView;
