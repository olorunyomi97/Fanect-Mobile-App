import { BUY_SUBSCRIPTION } from './actionTypes';

const initialState = {
  loading: false,
};

const BuySubscriptionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case BUY_SUBSCRIPTION.REQUEST:
      return { ...state, loading: true };

    case BUY_SUBSCRIPTION.SUCCESS:
    case BUY_SUBSCRIPTION.FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default BuySubscriptionReducer;
