/* eslint-disable react/button-has-type */
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/';
import HistoryView from '../components/HistoryView';
import InfoContainer from './InfoContainer';
import { initializeBackgroundConnection } from '../store/entities/apollo';
import { initializeNetworkListener } from '../store/messagesAndActionTypes/initializeActions';
import '../styles/main.css';

// defined breakpoints for desktop, tablet, mobile views
const breakpointValues = {
  xs: 0,
  sm: 400,
  md: 500,
  lg: 700,
  xl: 1200,
};

const devtoolTheme = createMuiTheme({ breakpoints: { values: breakpointValues } });

// material UI styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

// main App container renders out the InfoContainer and the HistoryView (left sidebar)
const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // upon rendering this component, dispatch action to Redux to connect to the background script and start listening for network requests to the graphQL endpoint
  React.useEffect(() => {
    dispatch(initializeBackgroundConnection());
    dispatch(initializeNetworkListener());
  }, []);

  return (
    <div className={classes.root}>
      <ThemeProvider theme={devtoolTheme}>
        <Grid container>
          <div className="info-container-wrapper">
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} sm={5} md={4} className="grid-item-history">
                  <HistoryView />
                </Grid>
                <Grid item xs={12} sm={7} md={8}>
                  <InfoContainer />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default App;
