import { show_toast_notifications } from '../../../helpers/notifications';
import {
  VERIFY_OTP,
  API_ERROR,
  VERIFY_OTP_SUCCESS,
  RESEND_OTP,
  RESEND_OTP_SUCCESS,
} from './actionTypes';

export const verifyOtp = (otp_data, history) => {
  return {
    type: VERIFY_OTP,
    payload: { otp_data, history },
  };
};

export const verifyOtpSuccess = response => {
  console.log(response);
  show_toast_notifications('success', 'success');
  return {
    type: VERIFY_OTP_SUCCESS,
    payload: response,
  };
};

export const resendOtp = (otp_data, history) => {
  console.log(otp_data, '<====== hello ther =====>');
  return {
    type: RESEND_OTP,
    payload: { otp_data, history },
  };
};

export const resendOtpSuccess = response => {
  show_toast_notifications('OTP resent', 'success');
  return {
    type: RESEND_OTP_SUCCESS,
    payload: response,
  };
};

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
