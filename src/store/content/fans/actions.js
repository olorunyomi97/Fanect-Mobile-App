import { GET_FEED_FANS } from './actionTypes';

export const getFeedFans = refreshing => {
  return {
    type: GET_FEED_FANS.REQUEST,
    payload: refreshing,
  };
};

export const getFeedFansSuccess = () => {
  return {
    type: GET_FEED_FANS.SUCCESS,
  };
};

export const getFeedFansFailure = () => {
  return {
    type: GET_FEED_FANS.FAILURE,
  };
};
