import { CHANGE_EMAIL, CHANGE_EMAIL_SUCCESS, CHANGE_EMAIL_FAILURE, CHANGE_EMAIL_OTP_RESEND, CHANGE_EMAIL_OTP_RESEND_SUCCESS } from './actionTypes';

export const changeEmail = ({ email, password, retry }) => {
  return {
    type: CHANGE_EMAIL,
    payload: { email, password, retry },
  };
};

export const changeEmailResendOtp = (otp_data) => {
  console.log(otp_data);
  return {
    type: CHANGE_EMAIL_OTP_RESEND,
    payload: { otp_data }
  }
}

export const resendChangeOtpSuccess = (response) => {
  console.log(response, '<==== action response ===> ');
  return {
    type: CHANGE_EMAIL_OTP_RESEND_SUCCESS,
    payload: { response },
  };
};

export const changeEmailSuccess = ({verify_token}) => {
  return {
    type: CHANGE_EMAIL_SUCCESS,
    payload: { verify_token },
  };
};

export const changeEmailFailure = () => {
  return {
    type: CHANGE_EMAIL_FAILURE,
  };
};
