import { CHANGE_EMAIL, CHANGE_EMAIL_SUCCESS, CHANGE_EMAIL_FAILURE, CHANGE_EMAIL_OTP_RESEND, CHANGE_EMAIL_OTP_RESEND_SUCCESS } from './actionTypes';

const initialState = {
  loading: false,
  paylaod: null,
};

const ChangeEmail = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_EMAIL:
      return { loading: true };

    case CHANGE_EMAIL_SUCCESS:
    case CHANGE_EMAIL_FAILURE:
      return { loading: false };

    case CHANGE_EMAIL_OTP_RESEND:
      return { loading: false };

    case CHANGE_EMAIL_OTP_RESEND_SUCCESS:
      console.log(payload.response, 'payload from returning data');
      return { ...state, payload:payload.response.data , loading: false };

    default:
      return state;
  }
};

export default ChangeEmail;
