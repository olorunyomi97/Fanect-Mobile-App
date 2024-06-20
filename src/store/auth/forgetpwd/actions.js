import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  API_ERROR,
} from './actionTypes';

export const userForgetPassword = (user, history) => {
  return {
    type: FORGET_PASSWORD,
    payload: { user, history },
  };
};

export const userForgetPasswordSuccess = message => {
  return {
    type: FORGET_PASSWORD_SUCCESS,
    payload: message,
  };
};

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
