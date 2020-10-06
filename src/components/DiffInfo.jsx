import * as React from 'react';
import { diff, formatters } from 'jsondiffpatch';
import ReactHtmlParser from 'react-html-parser';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Typography } from '@material-ui/core/';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getTimeline, setPrevQuery } from '../store/entities/apollo'; // Per Redux Docs, defining outside component perserves memoized memory state

// import { diff1, diff2, diff3, diff4, diffHtml, nullDiff } from '../dummyData/data';
import '../styles/diff.css';

// export interface HistoryViewProps {}
const getTimelineData = getTimeline;

const epochTheme = createMuiTheme({ palette: { primary: { main: '#20909f' } } });

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    // border: `1px dotted white`,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    color: 'white',
    // border: `1px dotted white`,

    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },
    // height: '1rem',
  },
  icon: {
    fill: 'white',
  },
}));

// export interface DiffInfoProps {}

const DiffInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [unchanged, setUnchanged] = React.useState(false);
  const { activeQuery, prevQuery } = useSelector((state) => state.apollo);
  const queryHistory = useSelector(getTimelineData).filter((q) => q.id !== activeQuery.id);
  console.log('aQ and pQ cacheSS ->', activeQuery.cacheSnapshot, prevQuery.cacheSnapshot);

  const [diffQuery, changeDiffQuery] = React.useState();

  const handleChangeDiff = (event) => {
    changeDiffQuery(event.target.value);
    dispatch(setPrevQuery(event.target.value));
  };

  // calc diff using jsondiffpatch
  const delta = diff(prevQuery.cacheSnapshot, activeQuery.cacheSnapshot);
  // string of html with comparisons
  const diffHtml = formatters.html.format(delta, prevQuery.cacheSnapshot);
  // conditionally render changes or not based on unchanged bool
  formatters.html.showUnchanged(unchanged);
  const handleChange = () => {
    console.log('Clicked on checkbox');
    setUnchanged(!unchanged);
  };

  const typeAbbrevs = { Query: 'Q', Mutation: 'M', 'Manual Fetch': 'MF' };

  return (
    <div className="diff-info">
      <div className="unchanged-toggle-div">
        <ThemeProvider theme={epochTheme}>
          <Switch checked={unchanged} color="primary" onClick={handleChange} name="switch" />

          <Typography variant="p">Full Cache</Typography>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="filled-age-native-simple" className={classes.select}>
              Diff From
            </InputLabel>
            <Select
              native
              value={diffQuery}
              onChange={handleChangeDiff}
              className={classes.select}
              inputProps={{
                name: 'diffQuery',
                id: 'filled-age-native-simple',
                classes: {
                  icon: classes.icon,
                },
              }}
            >
              <option aria-label="None" value="" />
              {queryHistory.map((qid) => (
                <option value={qid.id} key={qid.id}>
                  {`${qid.id}: ${qid.name}`}
                </option>
              ))}
            </Select>
          </FormControl>
        </ThemeProvider>
      </div>
      {ReactHtmlParser(diffHtml)}
    </div>
  );
};

export default DiffInfo;
