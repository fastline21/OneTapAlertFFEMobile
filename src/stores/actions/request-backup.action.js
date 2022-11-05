import axios from 'axios';

import { REACT_APP_SERVER_URL } from '@env';

import {
  REQUEST_BACKUP_LOADING,
  REQUEST_BACKUP_SUCCESS,
  REQUEST_BACKUP_ERROR,
  REQUEST_BACKUP_CLEAR_RESPONSE,
} from '../types/request-backup.type';

const setLoading = () => (dispatch) => {
  dispatch({
    type: REQUEST_BACKUP_LOADING,
  });
};

export const submitRequestBackup = (data) => async (dispatch) => {
  setLoading()(dispatch);

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      `${REACT_APP_SERVER_URL}/api/request-backups`,
      data,
      config
    );

    console.log('res.data', res.data);

    dispatch({
      type: REQUEST_BACKUP_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: REQUEST_BACKUP_ERROR,
      payload: error.response.data,
    });
  }
};

export const requestBackupClearResponse = () => (dispatch) => {
  dispatch({
    type: REQUEST_BACKUP_CLEAR_RESPONSE,
  });
};
