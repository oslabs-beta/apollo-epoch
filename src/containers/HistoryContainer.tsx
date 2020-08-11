import * as React from 'react';
import HistoryView from '../components/HistoryView';

export interface HistoryContainerProps {}

const HistoryContainer: React.SFC<HistoryContainerProps> = () => {
  return <HistoryView />;
};

export default HistoryContainer;
