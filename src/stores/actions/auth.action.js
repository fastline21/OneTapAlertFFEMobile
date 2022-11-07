import axios from 'axios';

import { REACT_APP_SERVER_URL } from '@env';

import {
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_CLEAR_RESPONSE,
  AUTH_USER,
  LOGIN_USER,
  LOGOUT_USER,
} from '../types/auth.type';

import { setToken } from '../../utilities/token';

const setLoading = () => (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
  });
};

export const loginUser = (data) => async (dispatch) => {
  try {
    setLoading()(dispatch);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      `${REACT_APP_SERVER_URL}/api/auth`,
      data,
      config
    );

    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });

    authUser()(dispatch);
  } catch (error) {
    console.error(error);
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data,
    });
  }
};

export const authUser = () => async (dispatch) => {
  try {
    setLoading()(dispatch);

    await setToken('auth_token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.get(`${REACT_APP_SERVER_URL}/api/auth`, config);

    dispatch({
      type: AUTH_USER,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data,
    });
  }
};

export const authClearResponse = () => (dispatch) => {
  dispatch({
    type: AUTH_CLEAR_RESPONSE,
  });
};

export const setAuthError = (data) => (dispatch) => {
  dispatch({
    type: AUTH_ERROR,
    payload: { message: data },
  });
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};
