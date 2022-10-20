import { GET_ALL_USERS, REGISTER_USER } from "../types/users.type";

const initialState = {
  users: null,
  user: null,
  registerUser: null,
  error: false,
  success: false,
  loading: false,
  message: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case REGISTER_USER:
      return {
        ...state,
        registerUser: { ...state.registerUser, ...action.payload },
      };
    default:
      return state;
  }
};
