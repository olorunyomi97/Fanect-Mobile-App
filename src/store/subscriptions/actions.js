import {
  SUBSCRIBE_TO_CELEBRITY,
  API_ERROR,
  UNSUBSCRIBE_FROM_CELEBRITY,
  BUY_CELEBRITY_SUBSCRIPTIONS,
  APPLY_GIFT_CODE,
  UNSUBSCRIBE_FROM_CELEBRITY_SUCCESS,
  UNSUBSCRIBE_FROM_CELEBRITY_FAILURE,
  SUBSCRIBE_TO_CELEBRITY_SUCCESS,
  BUY_CELEBRITY_SUBSCRIPTIONS_SUCCESS,
  APPLY_GIFT_CODE_SUCCESS,
  GET_DETAILS_OF_SUBSCRIPTION,
  GET_DETAILS_OF_SUBSCRIPTION_SUCCESS,
} from './actionTypes';

export const subscribeToCelebrity = celebrity_data => {
  return {
    type: SUBSCRIBE_TO_CELEBRITY,
    payload: celebrity_data,
  };
};

export const subscribeToCelebritySuccess = response => {
  return {
    type: SUBSCRIBE_TO_CELEBRITY_SUCCESS,
    payload: response,
  };
};

export const unsubscribeFromCelebrity = response => {
  return {
    type: UNSUBSCRIBE_FROM_CELEBRITY,
    payload: response,
  };
};

export const unsubscribeFromCelebritySuccess = response => {
  return {
    type: UNSUBSCRIBE_FROM_CELEBRITY_SUCCESS,
    payload: response,
  };
};

export const unsubscribeFromCelebrityFailure = error => {
  return {
    type: UNSUBSCRIBE_FROM_CELEBRITY_FAILURE,
    payload: error,
  };
};

export const buyCelebritySubscription = celebrity_data => {
  return {
    type: BUY_CELEBRITY_SUBSCRIPTIONS,
    payload: celebrity_data,
  };
};

export const buyCelebritySubscriptionSuccess = response => {
  return {
    type: BUY_CELEBRITY_SUBSCRIPTIONS_SUCCESS,
    payload: response,
  };
};

export const getDetailsOfSubscriptionCode = subscription_data => {
  return {
    type: GET_DETAILS_OF_SUBSCRIPTION,
    payload: subscription_data,
  };
};

export const getDetailsOfSubscriptionCodeSuccess = response => {
  return {
    type: GET_DETAILS_OF_SUBSCRIPTION_SUCCESS,
    payload: response,
  };
};

export const applyGiftCode = response => {
  return {
    type: APPLY_GIFT_CODE,
    payload: response,
  };
};

export const applyGiftCodeSuccess = response => {
  return {
    type: APPLY_GIFT_CODE_SUCCESS,
    payload: response,
  };
};

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
