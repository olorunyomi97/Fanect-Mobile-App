import { show_toast_notifications } from '../../../helpers/notifications';
import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  API_ERROR,
  GET_PUBLIC_USER_DETAILS,
  GET_PUBLIC_USER_DETAILS_SUCCESS,
} from './actionTypes';

export const registerUser = (user, history) => {
  return {
    type: REGISTER_USER,
    payload: { user, history },
  };
};

export const getUserById = user_id => {
  return {
    type: GET_PUBLIC_USER_DETAILS,
    payload: { user_id },
  };
};

export const getUserByIdSuccess = user => {
  return {
    type: GET_PUBLIC_USER_DETAILS_SUCCESS,
    payload: user,
  };
};

export const registerUserSuccessful = user => {
  return {
    type: REGISTER_USER_SUCCESSFUL,
    payload: user,
  };
};

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
