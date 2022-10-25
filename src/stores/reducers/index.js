import { combineReducers } from 'redux';

import usersReducer from './users.reducer';
import barangaysReducer from './barangays.reducer';
import authReducer from './auth.reducer';
import locationReducer from './location.reducer';
import emergenciesReducer from './emergencies.reducer';
import emergencyProofsReducer from './emergency-proofs.reducer';
import incidentReportsReducer from './incident-reports.reducer';

export default combineReducers({
  usersState: usersReducer,
  barangaysState: barangaysReducer,
  authState: authReducer,
  locationState: locationReducer,
  emergenciesState: emergenciesReducer,
  emergencyProofsState: emergencyProofsReducer,
  incidentReportsState: incidentReportsReducer,
});
