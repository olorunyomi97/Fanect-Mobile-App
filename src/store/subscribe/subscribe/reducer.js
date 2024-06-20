import {
  CHECK_VALID_SUBSCRIPTION,
  CLEAR_SUB_CHECK,
  SUBSCRIBE_TO_CELEB,
  UNSUBSCRIBE_FROM_CELEB,
} from './actionTypes';

const initialState = {
  loading: false,
  checkingValidity: false,
  validity: {},
};

const SubscribeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SUBSCRIBE_TO_CELEB.REQUEST:
    case UNSUBSCRIBE_FROM_CELEB.REQUEST:
      return { ...state, loading: true };

    case CHECK_VALID_SUBSCRIPTION.REQUEST:
      return { ...state, checkingValidity: true };

    case SUBSCRIBE_TO_CELEB.SUCCESS:
      return {
        loading: false,
        checkingValidity: false,
        validity: { is_subscribed: true },
      };
    case SUBSCRIBE_TO_CELEB.FAILURE:
    case UNSUBSCRIBE_FROM_CELEB.SUCCESS:
    case UNSUBSCRIBE_FROM_CELEB.FAILURE:
      return { ...state, loading: false };

    case CHECK_VALID_SUBSCRIPTION.SUCCESS:
      return { ...state, checkingValidity: false, validity: payload };

    case CHECK_VALID_SUBSCRIPTION.FAILURE:
      return { ...state, checkingValidity: false };

    case CLEAR_SUB_CHECK:
      return { ...state, validity: {} };

    default:
      return state;
  }
};

export default SubscribeReducer;
