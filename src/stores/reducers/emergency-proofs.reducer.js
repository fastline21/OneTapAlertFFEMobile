import {
  EMERGENCY_PROOFS_LOADING,
  EMERGENCY_PROOFS_SUCCESS,
  EMERGENCY_PROOFS_ERROR,
  EMERGENCY_PROOFS_CLEAR_RESPONSE,
} from '../types/emergency-proofs.type';

const initialState = {
  loading: false,
  success: false,
  error: false,
  message: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case EMERGENCY_PROOFS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case EMERGENCY_PROOFS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload?.message,
      };
    case EMERGENCY_PROOFS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.message,
      };
    case EMERGENCY_PROOFS_CLEAR_RESPONSE:
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
