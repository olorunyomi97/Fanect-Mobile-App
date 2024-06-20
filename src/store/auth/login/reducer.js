import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  VERIFY_LOGIN,
  UPDATE_USER_DATA,
} from './actionTypes';

const initialState = {
  error: '',
  apiError: null,
  loading: false,
  otp_data: {},
  is_signed_in: false,
  user_token: null,
  user_data: null,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
        error: '',
      };
      break;

    case LOGIN_SUCCESS:
      state = {
        ...state,
        user_token: action.payload.jwt_token,
        user_data: action.payload,
        loading: false,
        is_signed_in: true,
      };
      break;

    case VERIFY_LOGIN:
      state = {
        ...state,
        otp_data: action.payload,
        loading: false,
      };
      break;

    case LOGOUT_USER:
      state = { ...state, is_signed_in: false };
      break;

    case LOGOUT_USER_SUCCESS:
      state = {
        error: '',
        apiError: null,
        loading: false,
        otp_data: {},
        is_signed_in: false,
        user_token: null,
        user_data: null,
      };
      break;

    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;

    case UPDATE_USER_DATA.REQUEST:
      let payload = action.payload;
      if (!action.payload.globals || !action.payload.jwt_token) {
        payload = {
          globals: state.user_data.globals,
          jwt_token: state.user_data.jwt_token,
          user: action.payload,
        };
      }

      return { ...state, user_data: payload };

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
