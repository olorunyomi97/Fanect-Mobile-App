import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  VERIFY_USER_LOGIN,
  VERIFY_LOGIN,
  UPDATE_USER_DATA,
} from './actionTypes';

export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  };
};

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const verifyLogin = response => {
  return {
    type: VERIFY_LOGIN,
    payload: response,
  };
};

export const verifyUserLogin = verify_payload => {
  return {
    type: VERIFY_USER_LOGIN,
    payload: { verify_payload },
  };
};

export const logoutUser = (history) => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  };
};

export const logoutUserSuccess = (history) => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {history},
  };
};

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  };
};

export const updateUserData = updatedUserData => {
  return {
    type: UPDATE_USER_DATA.REQUEST,
    payload: updatedUserData,
  };
};

export const updateUserDataSuccess = () => {
  return {
    type: UPDATE_USER_DATA.SUCCESS,
  };
};

export const updateUserDataFailure = () => {
  return {
    type: UPDATE_USER_DATA.FAILURE,
  };
};
