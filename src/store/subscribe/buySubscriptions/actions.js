import { BUY_SUBSCRIPTION } from './actionTypes';

export const buySubscription = (subscriptionDetail, cb) => {
  return {
    type: BUY_SUBSCRIPTION.REQUEST,
    payload: { subscriptionDetail, cb },
  };
};

export const buySubscriptionSuccess = () => {
  return {
    type: BUY_SUBSCRIPTION.SUCCESS,
  };
};

export const buySubscriptionFailure = () => {
  return {
    type: BUY_SUBSCRIPTION.FAILURE,
  };
};
