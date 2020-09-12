import * as React from 'react';
import { diff, formatters } from 'jsondiffpatch';
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux';
import { Switch, Typography } from '@material-ui/core/';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import { diff1, diff2, diff3, diff4, diffHtml, nullDiff } from '../dummyData/data';
import '../styles/diff.css';

const epochTheme = createMuiTheme({ palette: { primary: { main: '#20909f' } } });

// export interface DiffInfoProps {}

const DiffInfo = () => {
  const [unchanged, setUnchanged] = React.useState(false);
  const { activeQuery, prevQuery } = useSelector((state) => state.apollo);
  console.log('aQ and pQ cacheSS ->', activeQuery.cacheSnapshot, prevQuery.cacheSnapshot);

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

  return (
    <div className="diff-info">
      <div className="unchanged-toggle-div">
        <ThemeProvider theme={epochTheme}>
          <Switch checked={unchanged} color="primary" onClick={handleChange} name="switch" />
        </ThemeProvider>

        <Typography>Full Cache</Typography>
      </div>
      {ReactHtmlParser(diffHtml)}
    </div>
  );
};

export default DiffInfo;
