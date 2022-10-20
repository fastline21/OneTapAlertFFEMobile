import { GET_ALL_BARANGAYS } from "../types/barangays.type";

const initialState = {
  barangays: null,
  barangay: null,
  loading: false,
  success: false,
  error: false,
  message: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BARANGAYS:
      return {
        ...state,
        barangays: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
