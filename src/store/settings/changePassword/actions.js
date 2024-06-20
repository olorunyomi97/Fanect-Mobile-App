import { CHANGE_PASSWORD } from './actionTypes';

export const changePassword = (data, cb) => {
  return {
    type: CHANGE_PASSWORD.REQUEST,
    payload: { data, cb },
  };
};

export const changePasswordSuccess = () => {
  return {
    type: CHANGE_PASSWORD.SUCCESS,
  };
};

export const changePasswordFailure = () => {
  return {
    type: CHANGE_PASSWORD.FAILURE,
  };
};
