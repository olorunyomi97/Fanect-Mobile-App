import { DELETE_USER_CONTENT } from './actionTypes';

export const deleteUserContent = contentId => {
  return {
    type: DELETE_USER_CONTENT.REQUEST,
    payload: contentId,
  };
};

export const deleteUserContentSuccess = () => {
  return {
    type: DELETE_USER_CONTENT.SUCCESS,
  };
};

export const deleteUserContentFailure = () => {
  return {
    type: DELETE_USER_CONTENT.FAILURE,
  };
};
