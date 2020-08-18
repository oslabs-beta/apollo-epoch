import { createAction } from '@reduxjs/toolkit';

// Action Types
export const LOG = 'logPayload';
export const ERROR = 'logError';

// Action Creators
export const log = createAction(LOG);
export const error = createAction(ERROR);
