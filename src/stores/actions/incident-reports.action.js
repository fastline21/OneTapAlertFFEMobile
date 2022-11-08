import axios from 'axios';

import { REACT_APP_SERVER_URL } from '@env';

import {
  INCIDENT_REPORTS_LOADING,
  INCIDENT_REPORTS_SUCCESS,
  INCIDENT_REPORTS_ERROR,
  INCIDENT_REPORTS_CLEAR_RESPONSE,
} from '../types/incident-reports.type';

const setLoading = () => (dispatch) => {
  dispatch({
    type: INCIDENT_REPORTS_LOADING,
  });
};

export const submitIncidentReport = (data) => async (dispatch) => {
  try {
    setLoading()(dispatch);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      `${REACT_APP_SERVER_URL}/api/incident-reports`,
      data,
      config
    );

    dispatch({
      type: INCIDENT_REPORTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: INCIDENT_REPORTS_ERROR,
      payload: error.response.data,
    });
  }
};

export const incidentReportsClearResponse = () => (dispatch) => {
  dispatch({
    type: INCIDENT_REPORTS_CLEAR_RESPONSE,
  });
};
