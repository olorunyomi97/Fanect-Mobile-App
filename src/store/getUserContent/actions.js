import { GET_USER_CONTENT } from './actionTypes';

export const getUserContent = celebId => {
  return {
    type: GET_USER_CONTENT.REQUEST,
    payload: celebId,
  };
};

export const getUserContentSuccess = content => {
  return {
    type: GET_USER_CONTENT.SUCCESS,
    payload: content,
  };
};

export const getUserContentFailure = () => {
  return {
    type: GET_USER_CONTENT.FAILURE,
  };
};
