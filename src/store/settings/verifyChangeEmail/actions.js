import { show_toast_notifications } from '../../../helpers/notifications';
import { VERIFY_CHANGE_EMAIL, VERIFY_RESEND_OTP } from './actionTypes';

export const verifyChangeEmail = (otp_data, history) => {
  return {
    type: VERIFY_CHANGE_EMAIL.REQUEST,
    payload: { otp_data, history },
  };
};

export const verifyChangeEmailSuccess = history => {
  return {
    type: VERIFY_CHANGE_EMAIL.SUCCESS,
    payload: { history },
  };
};

export const verifyChangeEmailFailure = error => {
  return {
    type: VERIFY_CHANGE_EMAIL.FAILURE,
    payload: error,
  };
};

export const verifyResendOtp = (otp_data, history) => {
  console.log(otp_data, '<====== hello ther =====>');
  return {
    type: VERIFY_RESEND_OTP.REQUEST,
    payload: { otp_data, history },
  };
};

export const verifyResendOtpSuccess = response => {
  show_toast_notifications('OTP resent', 'success');
  return {
    type: VERIFY_RESEND_OTP.SUCCESS,
    payload: response,
  };
};
