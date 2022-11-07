import axios from 'axios';

import {
  EMERGENCIES_LOADING,
  EMERGENCIES_SUCCESS,
  EMERGENCIES_ERROR,
  EMERGENCIES_CLEAR_RESPONSE,
  SUBMIT_EMERGENCY,
  GET_EMERGENCY,
  GET_ALL_EMERGENCIES,
  CLEAR_EMERGENCY,
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
  try {
    setLoading()(dispatch);

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

    console.log(`${REACT_APP_SERVER_URL}/api/emergencies`);

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

export const getAllEmergenciesByStatus = (data) => async (dispatch) => {
  setLoading()(dispatch);

  try {
    await setToken('auth_token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.get(
      `${REACT_APP_SERVER_URL}/api/emergencies/status/${data}`,
      config
    );

    dispatch({
      type: GET_ALL_EMERGENCIES,
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

export const getEmergency = (data) => async (dispatch) => {
  setLoading()(dispatch);

  try {
    await setToken('auth_token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.get(
      `${REACT_APP_SERVER_URL}/api/emergencies/${data}`,
      config
    );

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

export const clearEmergency = () => (dispatch) => {
  dispatch({
    type: CLEAR_EMERGENCY,
  });
};

export const changeEmergencyStatus = (data) => async (dispatch) => {
  try {
    setLoading()(dispatch);

    await setToken('auth_token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { emergency_id, ...rest } = data;

    const res = await axios.patch(
      `${REACT_APP_SERVER_URL}/api/emergencies/${emergency_id}`,
      rest,
      config
    );

    dispatch({
      type: EMERGENCIES_SUCCESS,
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
