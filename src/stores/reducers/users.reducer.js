import {
  GET_ALL_USERS,
  REGISTER_USER,
  USERS_SUCCESS,
  USERS_ERROR,
  USERS_CLEAR_RESPONSE,
  USERS_LOADING,
} from '../types/users.type';

const initialState = {
  users: null,
  user: null,
  registerUser: null,
  error: false,
  success: false,
  loading: false,
  message: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case REGISTER_USER:
      return {
        ...state,
        registerUser: { ...state.registerUser, ...action.payload },
      };
    case USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message,
      };
    case USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.message,
      };
    case USERS_CLEAR_RESPONSE:
      return {
        ...state,
        loading: false,
        success: false,
        error: false,
        message: null,
      };
    case USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
