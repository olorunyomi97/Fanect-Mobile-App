import { SET_SUBSCRIPTION_PRICE } from './actionTypes';

export const setSubscriptionPrice = (subPrice, cb) => {
  return {
    type: SET_SUBSCRIPTION_PRICE.REQUEST,
    payload: { subPrice, cb },
  };
};

export const setSubscriptionPriceSuccess = () => {
  return {
    type: SET_SUBSCRIPTION_PRICE.SUCCESS,
  };
};

export const setSubscriptionPriceFailure = () => {
  return {
    type: SET_SUBSCRIPTION_PRICE.FAILURE,
  };
};
