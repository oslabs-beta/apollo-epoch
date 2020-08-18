import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import initializePort from '../middleware/createBackgroundPort';
import logger from '../middleware/logger';

export default function () {
  return configureStore({
    reducer: rootReducer,
    middleware: [
      ...getDefaultMiddleware(), // returns THUNK and compose w/ DevTools
      logger,
      initializePort,
    ],
  });
}
