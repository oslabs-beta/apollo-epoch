import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button } from '@material-ui/core/';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import HistoryViewQuery from './HistoryViewQuery';
import { getTimeline, setActiveQuery, fetchApollo } from '../store/entities/apollo';

const epochTheme = createMuiTheme({ palette: { primary: { main: '#20909f' } } });

const getTimelineData = getTimeline; // Per Redux Docs, defining outside component perserves memoized memory state

// This component displays a list of the queries/mutations in the left sidebar of the extension
const HistoryView = () => {
  const dispatch = useDispatch();
  // getTimelineData retrieves an array of queries/mutations from the Redux store
  const queryHistory = useSelector(getTimelineData);
  // this selector retrieves the currently selected query/mutation
  const activeTimelineObj = useSelector((state) => state.apollo.activeQuery);
  const queries = [];
  const [activeQuery, changeActiveQuery] = React.useState(activeTimelineObj);

  // manual cache fetch using a button in component
  const getCache = () => {
    dispatch(fetchApollo());
  };

  for (let i = 0; i < queryHistory.length; i += 1) {
    const timelineObj = queryHistory[i];
    const activeFlag = activeQuery.id === timelineObj.id;
    queries.push(
      <HistoryViewQuery
        key={timelineObj.id}
        id={timelineObj.id}
        active={activeFlag}
        timelineObj={timelineObj}
        // onClick handler changes the active query/muation by dispatching to Redux
        onClick={() => {
          changeActiveQuery(timelineObj);
          dispatch(setActiveQuery(timelineObj.id));
        }}
      />
    );
  }

  return (
    <div className="history-view">
      <Typography variant="h6">Timeline</Typography>
      <div className="query-cards">{queries}</div>
      <div className="button-container">
        <ThemeProvider theme={epochTheme}>
          <Button className="getCache" onClick={getCache} variant="contained" color="primary">
            <Typography variant="h6">Get Cache</Typography>
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default HistoryView;
