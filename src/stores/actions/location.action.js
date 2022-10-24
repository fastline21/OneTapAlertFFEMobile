import {
  GET_LOCATION,
  LOCATION_ERROR,
  LOCATION_LOADING,
} from '../types/location.type';

import { getLocation } from '../../utilities/location';

export const getCurrentLocation = () => async (dispatch) => {
  setLoading()(dispatch);

  try {
    const res = await getLocation();

    dispatch({
      type: GET_LOCATION,
      payload: res.coords,
    });
  } catch (error) {
    dispatch({
      type: LOCATION_ERROR,
      payload: error,
    });
  }
};

const setLoading = () => (dispatch) => {
  dispatch({
    type: LOCATION_LOADING,
  });
};
