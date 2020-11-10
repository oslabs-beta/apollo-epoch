import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import initializePort from '../middleware/createBackgroundPort';
import listenToNetwork from '../middleware/createNetworkListener';
import composeNetworkQuery from '../middleware/composeNetworkObj';
import logger from '../middleware/logger';

export default function () {
  return configureStore({
    reducer: rootReducer,
    middleware: [
      ...getDefaultMiddleware(), // returns THUNK and compose w/ DevTools
      logger,
      listenToNetwork,
      initializePort,
      composeNetworkQuery,
    ],
  });
}
