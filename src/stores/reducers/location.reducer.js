import {
  GET_LOCATION,
  LOCATION_ERROR,
  LOCATION_LOADING,
} from '../types/location.type';

const initialState = {
  location: null,
  error: null,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION:
      const { latitude, longitude } = action.payload;

      return {
        ...state,
        location: {
          latitude,
          longitude,
        },
        loading: false,
      };
    case LOCATION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LOCATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
