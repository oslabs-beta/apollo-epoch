import * as React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core/';
import QueryInfo from '../components/QueryInfo';
import ResponseInfo from '../components/ResponseInfo';
import StateInfo from '../components/StateInfo';
import DiffInfo from '../components/DiffInfo';

const epochTheme = createMuiTheme({ palette: { primary: { main: '#20909f' } } });

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component="span" variant="body2">
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    overflowY: 'auto',
  },
}));

const InfoContainer = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // get selected query based on state
  const selectedQuery = useSelector((state) => state.apollo.activeQuery);

  return (
    <div className="info-container">
      <ThemeProvider theme={epochTheme}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} variant="scrollable">
            <Tab label="Query" {...a11yProps(0)} />
            <Tab label="Response" {...a11yProps(1)} />
            <Tab label="Cache" {...a11yProps(2)} />
            <Tab label="Diff" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
      </ThemeProvider>
      <div className="active-panel">
        <TabPanel value={value} index={0}>
          <QueryInfo queryString={selectedQuery.queryString} variables={selectedQuery.variables} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ResponseInfo response={selectedQuery.response} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <StateInfo stateSnapshot={selectedQuery.cacheSnapshot} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <DiffInfo diff={selectedQuery.diff} />
        </TabPanel>
      </div>
    </div>
  );
};

export default InfoContainer;
