import { SET_SUBSCRIPTION_PRICE } from './actionTypes';

const initialState = {
  loading: false,
};

const SetSubscriptionPriceReducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case SET_SUBSCRIPTION_PRICE.REQUEST:
      return { ...state, loading: true };

    case SET_SUBSCRIPTION_PRICE.SUCCESS:
    case SET_SUBSCRIPTION_PRICE.FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default SetSubscriptionPriceReducer;
