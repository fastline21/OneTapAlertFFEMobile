import {
  EMERGENCIES_LOADING,
  EMERGENCIES_SUCCESS,
  EMERGENCIES_ERROR,
  EMERGENCIES_CLEAR_RESPONSE,
  SUBMIT_EMERGENCY,
} from '../types/emergencies.type';

const initialState = {
  loading: false,
  success: false,
  error: false,
  message: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case EMERGENCIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case EMERGENCIES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message,
      };
    case EMERGENCIES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.message,
      };
    case EMERGENCIES_CLEAR_RESPONSE:
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
