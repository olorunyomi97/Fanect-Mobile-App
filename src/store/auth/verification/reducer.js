import {
  VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  RESEND_OTP,
  RESEND_OTP_SUCCESS,
  API_ERROR,
} from './actionTypes';

const initialState = {
  error: null,
  apiError: null,
  loading: false,
  otp_data: {},
};

const verification = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_OTP:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;

    case VERIFY_OTP_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
      };
      break;

    case RESEND_OTP:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;

    case RESEND_OTP_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
      };
      break;

    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default verification;
