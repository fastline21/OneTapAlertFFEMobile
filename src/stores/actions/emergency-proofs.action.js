import axios from 'axios';

import {
  EMERGENCY_PROOFS_LOADING,
  EMERGENCY_PROOFS_SUCCESS,
  EMERGENCY_PROOFS_ERROR,
  EMERGENCY_PROOFS_CLEAR_RESPONSE,
} from '../types/emergency-proofs.type';

import { REACT_APP_SERVER_URL } from '@env';

import { setToken } from '../../utilities/token';

export const submitEmergencyProof = (data) => async (dispatch) => {
  try {
    setLoading()(dispatch);

    await setToken('auth_token');

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    await axios.post(
      `${REACT_APP_SERVER_URL}/api/emergency-proofs`,
      data,
      config
    );

    dispatch({
      type: EMERGENCY_PROOFS_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: EMERGENCY_PROOFS_ERROR,
      payload: error.response.data,
    });
  }
};

const setLoading = () => (dispatch) => {
  dispatch({
    type: EMERGENCY_PROOFS_LOADING,
  });
};

export const emergencyProofClearResponse = () => (dispatch) => {
  dispatch({
    type: EMERGENCY_PROOFS_CLEAR_RESPONSE,
  });
};
