import { POST_STORY, API_ERROR } from './actionTypes';

export const postStoryAction = (data, history) => {
  return {
    type: POST_STORY,
    payload: { data, history },
  };
};

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
