import { createAction } from '@reduxjs/toolkit';

// Action Types
const INITIALIZE_BACKGROUND_CONNECTION = 'connectToBackground';
const CONNECTION_SUCCESS = 'backgroundConnectionSuccess';
const CONNECTION_FAILURE = 'backgroundConnectionFailure';

// Action Creators
// eslint-disable-next-line import/prefer-default-export
export const connectToBackground = createAction(INITIALIZE_BACKGROUND_CONNECTION);
export const connectionSuccess = createAction(CONNECTION_SUCCESS);
export const connectionFailure = createAction(CONNECTION_FAILURE);
