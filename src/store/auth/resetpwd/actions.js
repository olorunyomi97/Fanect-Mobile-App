import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  API_ERROR,
} from './actionTypes';

export const userResetPassword = (user, history) => {
  return {
    type: RESET_PASSWORD,
    payload: { user, history },
  };
};

export const userResetPasswordSuccess = message => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: message,
  };
};

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
