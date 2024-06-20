import { GET_USER } from './actionTypes';

export const getUser = userId => {
  return {
    type: GET_USER.REQUEST,
    payload: userId,
  };
};

export const getUserSuccess = user => {
  return {
    type: GET_USER.SUCCESS,
    payload: user,
  };
};

export const getUserFailure = () => {
  return {
    type: GET_USER.FAILURE,
  };
};
