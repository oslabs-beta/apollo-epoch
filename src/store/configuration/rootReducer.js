import { combineReducers } from 'redux';
import apolloReducer from '../entities/apollo';

/*
This will combine our slice reducers into a single rootReducer that can be
handled by the configure store function which creates our store. We can optionally
tuck these behind an entities prop in our store by creating an entitiesReducer
layer between this and our actual slice reducers
*/

export default combineReducers({
  apollo: apolloReducer,
});
