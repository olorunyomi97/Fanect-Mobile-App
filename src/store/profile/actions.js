import {
  GET_USERS,
  API_ERROR,
  GET_USER_PROFILE,
  GET_USER_SUBSCRIPTIONS,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_SUBSCRIPTIONS_SUCCESS,
} from './actionTypes';

export const getUserProfile = user_id => {
  return {
    type: GET_USER_PROFILE,
    payload: user_id,
  };
};

export const getUserSubscriptions = () => {
  return {
    type: GET_USER_SUBSCRIPTIONS,
  };
};

export const getUserSubscriptionsSuccess = response => {
  return {
    type: GET_USER_SUBSCRIPTIONS_SUCCESS,
    payload: response,
  };
};

export const getUserProfileSuccess = response => {
  return {
    type: GET_USER_PROFILE_SUCCESS,
    payload: response,
  };
};

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
