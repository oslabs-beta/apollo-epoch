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
import { dummyList } from '../dummyData/data';
import HistoryViewQuery from './HistoryViewQuery';
import { getTimeline, setActiveQuery } from '../store/entities/apollo';

// export interface HistoryViewProps {}
const getTimelineData = getTimeline; // Per Redux Docs, defining outside component perserves memoized memory state

const HistoryView = () => {
  const dispatch = useDispatch();
  const queryHistory = useSelector(getTimelineData);
  const activeTimelineObj = useSelector((state) => state.apollo.activeQuery);
  const queries = [];
  const [activeQuery, changeActiveQuery] = React.useState(activeTimelineObj);

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
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">Timeline</Typography>
          <div className="query-cards">{queries}</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default HistoryView;
