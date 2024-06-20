import {
  START_LIVE_STREAM,
  START_LIVE_STREAM_SUCCESS,
  API_ERROR,
  END_LIVE_STREAM,
} from './actionTypes';

export const startLiveStreamAction = () => {
  return {
    type: START_LIVE_STREAM,
    payload: {},
  };
};

export const endLiveStreamAction = data => {
  return {
    type: END_LIVE_STREAM,
    payload: data,
  };
};

export const getStartStreamSuccess = streams => {
  return {
    type: START_LIVE_STREAM_SUCCESS,
    payload: { streams },
  };
};

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
