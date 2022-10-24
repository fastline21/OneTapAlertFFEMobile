import axios from 'axios';

import {
  EMERGENCIES_LOADING,
  EMERGENCIES_SUCCESS,
  EMERGENCIES_ERROR,
  EMERGENCIES_CLEAR_RESPONSE,
  SUBMIT_EMERGENCY,
  GET_EMERGENCY,
} from '../types/emergencies.type';

import { REACT_APP_SERVER_URL } from '@env';

import { setToken } from '../../utilities/token';

const setLoading = () => (dispatch) => {
  dispatch({
    type: EMERGENCIES_LOADING,
  });
};

export const emergenciesClearResponse = () => (dispatch) => {
  dispatch({
    type: EMERGENCIES_CLEAR_RESPONSE,
  });
};

export const submitEmergency = (data) => async (dispatch) => {
  setLoading()(dispatch);

  try {
    await setToken('auth_token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      `${REACT_APP_SERVER_URL}/api/emergencies`,
      data,
      config
    );

    dispatch({
      type: EMERGENCIES_SUCCESS,
    });

    dispatch({
      type: GET_EMERGENCY,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: EMERGENCIES_ERROR,
      payload: error.response.data,
    });
  }
};
