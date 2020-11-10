/* eslint-disable react/button-has-type */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/';
import HistoryView from '../components/HistoryView';
import InfoContainer from './InfoContainer';
import { initializeBackgroundConnection } from '../store/entities/apollo';
import { initializeNetworkListener } from '../store/messagesAndActionTypes/initializeActions';
import '../styles/main.css';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {TimeTravelDirections} from '../components/TimeTravelDirections';


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
  modal: {
    display: 'flex',
    flexDirect: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 0,
    // border: '4px dotted pink',
    width: '100vw',
  },
  modalPaper: {
    border: '2px solid #000',
    backgroundColor: '#000',
    padding: theme.spacing(1),
    outline: 0,

    [theme.breakpoints.down('sm')]: {
      minHeight: '90vh',
      maxWidth: '90vw',
      maxHeight:'90vh',
      minWidth: '90vw'
    },
    [theme.breakpoints.up('md')]: {
      minHeight: '40vh',
      maxHeight: '50vh',
      overflowY: 'auto',
      
      
    },
    // [theme.breakpoints.up('lg')]: {
    //   height: '50vh',
    //   width: '50vw',
    // },
  },
}));


// main App container renders out the InfoContainer and the HistoryView (left sidebar)
const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    console.log({ open });
    setOpen(true);
  };

  const handleClose = () => {
    console.log({ open });
    setOpen(false);
  };

  
  // upon rendering this component, dispatch action to Redux to connect to the background script and start listening for network requests to the graphQL endpoint
  React.useEffect(() => {
    dispatch(initializeBackgroundConnection());
    dispatch(initializeNetworkListener());
  }, []);

  return (
    <div className={classes.root}>
      <ThemeProvider theme={devtoolTheme}>
        <Grid container>
        <div style={{ display: 'flex', position: 'absolute' }}>    
          <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            style={{ outline: 'none' }}
          >
            <Fade in={open}>
              <div>
                <div className={classes.modalPaper} style={{ outline: 'none' }}>
                  <TimeTravelDirections onClose={handleClose} modal={true}/>
                </div>
              </div>
            </Fade>
          </Modal>
        </div>
          <div className="info-container-wrapper">
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} sm={5} md={4} className="grid-item-history">
                  <HistoryView handleOpen={handleOpen} />
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
