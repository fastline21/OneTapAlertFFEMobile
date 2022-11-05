import {
  REQUEST_BACKUP_LOADING,
  REQUEST_BACKUP_SUCCESS,
  REQUEST_BACKUP_ERROR,
  REQUEST_BACKUP_CLEAR_RESPONSE,
} from '../types/request-backup.type';

const initialState = {
  loading: false,
  success: false,
  error: false,
  message: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_BACKUP_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_BACKUP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message,
      };
    case REQUEST_BACKUP_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.message,
      };
    case REQUEST_BACKUP_CLEAR_RESPONSE:
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
