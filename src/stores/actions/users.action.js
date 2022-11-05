import axios from 'axios';

import { REACT_APP_SERVER_URL } from '@env';

import {
  GET_ALL_USERS,
  USERS_LOADING,
  USERS_SUCCESS,
  USERS_ERROR,
  USERS_CLEAR_RESPONSE,
  REGISTER_USER,
  SUBMIT_REGISTER,
} from '../types/users.type';

const setLoading = () => (dispatch) => {
  dispatch({
    type: USERS_LOADING,
  });
};

export const getAllUsers = () => async (dispatch) => {
  setLoading()(dispatch);

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.get(`${REACT_APP_SERVER_URL}/api/users`, config);

    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
};

export const submitRegister = (data) => async (dispatch) => {
  setLoading()(dispatch);

  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.post(
      `${REACT_APP_SERVER_URL}/api/users/register`,
      data,
      config
    );

    dispatch({
      type: USERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: USERS_ERROR,
      payload: error.response.data,
    });
  }
};

export const registerUser = (data) => (dispatch) => {
  dispatch({
    type: REGISTER_USER,
    payload: data,
  });
};

export const usersClearResponse = () => (dispatch) => {
  dispatch({
    type: USERS_CLEAR_RESPONSE,
  });
};

export const setUsersError = (data) => (dispatch) => {
  dispatch({
    type: USERS_ERROR,
    payload: {
      message: data,
    },
  });
};

export const upgradeUserType = (data) => async (dispatch) => {
  try {
    setLoading()(dispatch);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { userID, ...rest } = data;

    const res = await axios.patch(
      `${REACT_APP_SERVER_URL}/api/users/${userID}`,
      rest,
      config
    );

    dispatch({
      type: USERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: USERS_ERROR,
      payload: error.response.data,
    });
  }
};
