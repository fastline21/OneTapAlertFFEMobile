import { combineReducers } from 'redux';

import usersReducer from './users.reducer';
import barangaysReducer from './barangays.reducer';
import authReducer from './auth.reducer';
import locationReducer from './location.reducer';
import emergenciesReducer from './emergencies.reducer';

export default combineReducers({
  usersState: usersReducer,
  barangaysState: barangaysReducer,
  authState: authReducer,
  locationState: locationReducer,
  emergenciesState: emergenciesReducer,
});
