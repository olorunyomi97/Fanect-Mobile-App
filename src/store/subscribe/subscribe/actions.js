import {
  CHECK_VALID_SUBSCRIPTION,
  SUBSCRIBE_TO_CELEB,
  UNSUBSCRIBE_FROM_CELEB,
  CLEAR_SUB_CHECK,
} from './actionTypes';

export const subscribeToCeleb = (celeb, cb) => {
  return {
    type: SUBSCRIBE_TO_CELEB.REQUEST,
    payload: { celeb, cb },
  };
};

export const subscribeToCelebSuccess = () => {
  return {
    type: SUBSCRIBE_TO_CELEB.SUCCESS,
  };
};

export const subscribeToCelebFailure = () => {
  return {
    type: SUBSCRIBE_TO_CELEB.FAILURE,
  };
};

export const unSubscribeFromCeleb = (celeb_id, cb) => {
  return {
    type: UNSUBSCRIBE_FROM_CELEB.REQUEST,
    payload: { celeb_id, cb },
  };
};

export const unSubscribeFromCelebSuccess = () => {
  return {
    type: UNSUBSCRIBE_FROM_CELEB.SUCCESS,
  };
};

export const unSubscribeFromCelebFailure = () => {
  return {
    type: UNSUBSCRIBE_FROM_CELEB.FAILURE,
  };
};

export const checkValidSubscription = celebId => {
  return {
    type: CHECK_VALID_SUBSCRIPTION.REQUEST,
    payload: celebId,
  };
};

export const checkValidSubscriptionSuccess = resp => {
  return {
    type: CHECK_VALID_SUBSCRIPTION.SUCCESS,
    payload: resp,
  };
};

export const checkValidSubscriptionFailure = () => {
  return {
    type: CHECK_VALID_SUBSCRIPTION.FAILURE,
  };
};

export const clearSubCheck = () => {
  return {
    type: CLEAR_SUB_CHECK,
  };
};
