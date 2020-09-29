import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Chip,
  Paper,
} from '@material-ui/core/';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { dummyList } from '../dummyData/data';
import HistoryViewQuery from './HistoryViewQuery';
import { getTimeline, setActiveQuery, fetchApollo } from '../store/entities/apollo';

const epochTheme = createMuiTheme({ palette: { primary: { main: '#20909f' } } });

// export interface HistoryViewProps {}
const getTimelineData = getTimeline; // Per Redux Docs, defining outside component perserves memoized memory state

const HistoryView = () => {
  const dispatch = useDispatch();
  const queryHistory = useSelector(getTimelineData);
  const activeTimelineObj = useSelector((state) => state.apollo.activeQuery);
  const queries = [];
  const [activeQuery, changeActiveQuery] = React.useState(activeTimelineObj);

  const getCache = () => {
    dispatch(fetchApollo());
  };

  for (let i = 0; i < queryHistory.length; i += 1) {
    const timelineObj = queryHistory[i];
    const activeFlag = activeQuery.id === timelineObj.id;
    console.log('activeFlag ->', activeFlag);
    queries.push(
      <HistoryViewQuery
        key={timelineObj.id}
        id={timelineObj.id}
        active={activeFlag}
        timelineObj={timelineObj}
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
            <Typography variant="h7">Get Cache</Typography>
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default HistoryView;
