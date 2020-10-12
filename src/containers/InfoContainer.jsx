/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core/';
import QueryInfo from '../components/QueryInfo';
import ResponseInfo from '../components/ResponseInfo';
import StateInfo from '../components/StateInfo';
import DiffInfo from '../components/DiffInfo';
import SphereLoader from '../components/SphereLoader/SphereLoader';
import {TimeTravelDirections} from '../components/TimeTravelDirections';

const epochTheme = createMuiTheme({ palette: { primary: { main: '#20909f' } } });

// material UI component for TabPanel
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
  tabLabel: {
    fontSize: '.7rem',
    minHeight: '2rem',
    maxHeight: '2rem',
    minWidth: '25%',
  },
  tabsRoot: {
    minHeight: '2rem',
    height: '2rem',
  },
  // tabPanel: {
  //   minHeight: '100vh',
  // },
}));

const InfoContainer = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // get selected query based on state
  const selectedQuery = useSelector((state) => state.apollo.activeQuery);
  const loadingApollo = useSelector((state) => state.apollo.loadingApollo);
  const timeTravelPossible = useSelector((state) => state.apollo.timeTravelPossible);
  const [timeTravelEnabled, toggleTimeTravel] = React.useState(timeTravelPossible);

  return (
    <div>
    {timeTravelEnabled?(<div className="info-container">
    <ThemeProvider theme={epochTheme}>
      <AppBar position="static" style={{ height: '2rem' }}>
        <Tabs
          className={classes.tabsRoot}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          TabIndicatorProps={{
            style: {
              top: '0px',
            },
          }}
        >
          <Tab label="Query" className={classes.tabLabel} {...a11yProps(0)} />
          <Tab label="Response" className={classes.tabLabel} {...a11yProps(1)} />
          <Tab label="Cache" className={classes.tabLabel} {...a11yProps(2)} />
          <Tab label="Diff" className={classes.tabLabel} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
    </ThemeProvider>
    {loadingApollo && (
      <div className="loader">
        <h2>Waiting for data from Apollo Client</h2>
        <SphereLoader />
      </div>
    )}
    {!loadingApollo && (
      <div className="active-panel">
        <TabPanel value={value} index={0} className={classes.tabPanel}>
          <QueryInfo
            queryString={selectedQuery.queryString}
            variables={selectedQuery.variables}
          />
        </TabPanel>
        <TabPanel value={value} index={1} className={classes.tabPanel}>
          <ResponseInfo response={selectedQuery.response} />
        </TabPanel>
        <TabPanel value={value} index={2} className={classes.tabPanel}>
          <StateInfo stateSnapshot={selectedQuery.cacheSnapshot} />
        </TabPanel>
        <TabPanel value={value} index={3} className={classes.tabPanel}>
          <DiffInfo diff={selectedQuery.diff} />
        </TabPanel>
      </div>
    )}
  </div>
):(<TimeTravelDirections 
     onClose={() => {
                     console.log("Close Directions");
                      toggleTimeTravel(true)
                    }
              }
  />)}
    </div>

      );
};

TabPanel.propTypes = {
  children: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default InfoContainer;
