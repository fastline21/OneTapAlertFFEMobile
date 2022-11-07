import axios from 'axios';

import { REACT_APP_SERVER_URL } from '@env';

import {
  GET_ALL_BARANGAYS,
  BARANGAYS_LOADING,
  BARANGAYS_SUCCESS,
  BARANGAYS_ERROR,
  BARANGAYS_CLEAR_RESPONSE,
} from '../types/barangays.type';

const setLoading = () => (dispatch) => {
  dispatch({
    type: BARANGAYS_LOADING,
  });
};

export const getAllBarangays = () => async (dispatch) => {
  setLoading()(dispatch);

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.get(
      `${REACT_APP_SERVER_URL}/api/barangays`,
      config
    );

    dispatch({
      type: GET_ALL_BARANGAYS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: BARANGAYS_ERROR,
      payload: error.response.data,
    });
  }
};
