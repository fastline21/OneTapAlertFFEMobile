import {
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_CLEAR_RESPONSE,
  AUTH_USER,
  LOGIN_USER,
} from '../types/auth.type';

import { storeToken } from '../../utilities/token';

const initialState = {
  auth: null,
  loading: false,
  success: false,
  error: false,
  message: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      storeToken('auth_token', action.payload.token);

      return state;
    case AUTH_USER:
      return {
        ...state,
        loading: false,
        auth: action.payload,
        success: true,
      };
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message,
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.message,
      };
    case AUTH_CLEAR_RESPONSE:
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
