import { GET_STORIES } from './actionTypes';

export const getStories = refreshing => {
  return {
    type: GET_STORIES.REQUEST,
    payload: refreshing,
  };
};

export const getStoriesSuccess = (stories, refreshing) => {
  return {
    type: GET_STORIES.SUCCESS,
    payload: { stories, refreshing },
  };
};

export const getStoriesFailure = () => {
  return {
    type: GET_STORIES.FAILURE,
    payload: stories,
  };
};
