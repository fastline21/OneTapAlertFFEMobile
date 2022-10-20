import { combineReducers } from "redux";

import usersReducer from "./users.reducer";
import barangaysReducer from "./barangays.reducer";

export default combineReducers({
  usersState: usersReducer,
  barangaysState: barangaysReducer,
});
