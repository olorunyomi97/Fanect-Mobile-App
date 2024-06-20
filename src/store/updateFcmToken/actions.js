import { UPDATE_FCM_TOKEN } from './actionTypes';

export const updateToken = token => {
  return {
    type: UPDATE_FCM_TOKEN.REQUEST,
    payload: token,
  };
};

export const updateTokenSuccess = () => {
  return {
    type: UPDATE_FCM_TOKEN.SUCCESS,
  };
};

export const updateTokenFailure = () => {
  return {
    type: UPDATE_FCM_TOKEN.FAILURE,
  };
};
