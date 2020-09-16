import { createAction } from '@reduxjs/toolkit';

// Action Types
export const COMPOSE_NETWORK_QUERY = 'appendSnapshot';

// Action Creators
export const composeNetworkQuery = createAction(COMPOSE_NETWORK_QUERY);
