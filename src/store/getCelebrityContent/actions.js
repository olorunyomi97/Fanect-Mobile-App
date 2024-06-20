import { CLEAR_CELEBRITY_CONTENT, GET_CELEBRITY_CONTENT } from './actionTypes';

export const getCelebrityContent = celebrityId => {
  return {
    type: GET_CELEBRITY_CONTENT.REQUEST,
    payload: celebrityId,
  };
};

export const getCelebrityContentSuccess = celebrityContent => {
  return {
    type: GET_CELEBRITY_CONTENT.SUCCESS,
    payload: celebrityContent,
  };
};

export const getCelebrityContentFailure = () => {
  return {
    type: GET_CELEBRITY_CONTENT.FAILURE,
  };
};

export const clearCelebContent = () => {
  return {
    type: CLEAR_CELEBRITY_CONTENT,
  };
};
