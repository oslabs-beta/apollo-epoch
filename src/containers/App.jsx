/* eslint-disable react/button-has-type */
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/';
import HistoryContainer from './HistoryContainer';
import InfoContainer from './InfoContainer';
import { initializeBackgroundConnection } from '../store/entities/apollo';
import { initializeNetworkListener } from '../store/messagesAndActionTypes/initializeActions';
import '../styles/main.css';

const breakpointValues = {
  xs: 0,
  sm: 400,
  md: 500,
  lg: 700,
  xl: 1200,
};

const devtoolTheme = createMuiTheme({ breakpoints: { values: breakpointValues } });

// const epochTheme = createMuiTheme({ palette: { primary: { main: '#20909f' } } });

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

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const loadingApollo = useSelector((state) => state.apollo.loadingApollo);

  React.useEffect(() => {
    console.log(
      'Initializing Background Connection on Tab: ',
      chrome.devtools.inspectedWindow.tabId
    );
    dispatch(initializeBackgroundConnection());
    dispatch(initializeNetworkListener());
  }, []);

  return (
    <div className={classes.root}>
      <ThemeProvider theme={devtoolTheme}>
        <Grid container>
          {/* <Grid item xs={12}>
            <div className="heading">
              {loadingApollo && (
                <div className="loader">
                  <h2>Detecting Apollo</h2>
                  <SphereLoader />
                </div>
              )}
            </div>
          </Grid> */}
          <div className="info-container-wrapper">
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} sm={5} md={4} className="grid-item-history">
                  {/* // render out history  */}
                  <HistoryContainer />
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
