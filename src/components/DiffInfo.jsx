import * as React from 'react';
import { diff, formatters } from 'jsondiffpatch';
import ReactHtmlParser from 'react-html-parser';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Typography } from '@material-ui/core/';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { getTimeline, setActiveQuery, fetchApollo } from '../store/entities/apollo'; // Per Redux Docs, defining outside component perserves memoized memory state

// import { diff1, diff2, diff3, diff4, diffHtml, nullDiff } from '../dummyData/data';
import '../styles/diff.css';

// export interface HistoryViewProps {}
const getTimelineData = getTimeline;

const epochTheme = createMuiTheme({ palette: { primary: { main: '#20909f' } } });

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    color: 'white',
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },
  },
  icon: {
    fill: 'white',
  },
}));

// export interface DiffInfoProps {}

const DiffInfo = () => {
  const classes = useStyles();
  const queryHistory = useSelector(getTimelineData);
  const [unchanged, setUnchanged] = React.useState(false);
  const { activeQuery, prevQuery } = useSelector((state) => state.apollo);
  console.log('aQ and pQ cacheSS ->', activeQuery.cacheSnapshot, prevQuery.cacheSnapshot);

  const [diffQuery, changeDiffQuery] = React.useState();

  const handleChangeDiff = (event) => changeDiffQuery(event.target.value);

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

          <Typography>Full Cache</Typography>
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
                  {`${typeAbbrevs[qid.type]}: ${qid.name}`}
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
