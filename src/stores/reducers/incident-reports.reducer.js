import {
  INCIDENT_REPORTS_LOADING,
  INCIDENT_REPORTS_SUCCESS,
  INCIDENT_REPORTS_ERROR,
  INCIDENT_REPORTS_CLEAR_RESPONSE,
} from '../types/incident-reports.type';

const initialState = {
  loading: false,
  success: false,
  error: false,
  message: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_REPORTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case INCIDENT_REPORTS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message,
      };
    case INCIDENT_REPORTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.message,
      };
    case INCIDENT_REPORTS_CLEAR_RESPONSE:
      return {
        ...state,
        loading: false,
        success: false,
        error: false,
        message: null,
      };
    default:
      return state;
  }
};
