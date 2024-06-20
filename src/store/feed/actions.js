import { GET_FEED } from './actionTypes';

export const getFeed = refreshing => {
  return {
    type: GET_FEED.REQUEST,
    payload: refreshing,
  };
};

export const getFeedSuccess = (feed, refreshing) => {
  return {
    type: GET_FEED.SUCCESS,
    payload: { feed, refreshing },
  };
};

export const getFeedFailure = () => {
  return {
    type: GET_FEED.FAILURE,
  };
};
