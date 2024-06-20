import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  API_ERROR,
  GET_PUBLIC_USER_DETAILS_SUCCESS,
} from './actionTypes';

const initialState = {
  error: null,
  message: null,
  loading: false,
  user: null,
};

const register = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;

    case REGISTER_USER_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        user: action.payload,
        registrationError: null,
      };
      break;

    case API_ERROR:
      state = {
        ...state,
        user: null,
        loading: false,
        registrationError: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default register;
