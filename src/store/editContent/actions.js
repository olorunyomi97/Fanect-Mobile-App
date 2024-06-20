import { EDIT_CONTENT } from './actionTypes';

export const editContent = modifiedContent => {
  return {
    type: EDIT_CONTENT.REQUEST,
    payload: modifiedContent,
  };
};

export const editContentSuccess = () => {
  return {
    type: EDIT_CONTENT.SUCCESS,
  };
};

export const editContentFailure = () => {
  return {
    type: EDIT_CONTENT.FAILURE,
  };
};
