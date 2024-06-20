import {
  SUBSCRIBE_TO_CELEBRITY,
  UNSUBSCRIBE_FROM_CELEBRITY,
  BUY_CELEBRITY_SUBSCRIPTIONS,
  APPLY_GIFT_CODE,
  GET_DETAILS_OF_SUBSCRIPTION,
  GET_DETAILS_OF_SUBSCRIPTION_SUCCESS,
  UNSUBSCRIBE_FROM_CELEBRITY_SUCCESS,
  SUBSCRIBE_TO_CELEBRITY_SUCCESS,
  BUY_CELEBRITY_SUBSCRIPTIONS_SUCCESS,
  API_ERROR,
} from './actionTypes';

const INIT_STATE = {
  error: null,
  loading: true,
  is_subscribed: false,
  user_data: [],
  subscriptions: [],
  subscription_code_details: {},
  is_celeb_subscribed: false,
  is_unsubscribed: false,
};

const Subscriptions = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SUBSCRIBE_TO_CELEBRITY:
      return {
        ...state,
        error: null,
        data: action.payload,
        loading: false,
        is_celeb_subscribed: false,
      };

    case SUBSCRIBE_TO_CELEBRITY_SUCCESS:
      return {
        ...state,
        is_subscribed: action.payload,
        loading: false,
        is_celeb_subscribed: action.payload.celebrity_id,
      };

    case UNSUBSCRIBE_FROM_CELEBRITY:
      return {
        ...state,
        loading: false,
        error: null,
        is_unsubscribed: false,
        // data: action.payload,
      };

    case APPLY_GIFT_CODE:
      return {
        ...state,
        error: null,
        data: action.payload,
        loading: false,
      };

    case UNSUBSCRIBE_FROM_CELEBRITY_SUCCESS:
      return {
        ...state,
        loading: false,
        is_subscribed: action.payload,
        is_unsubscribed: action.payload.data,
      };

    case GET_DETAILS_OF_SUBSCRIPTION:
      return {
        ...state,
        data: action.payload,
      };

    case GET_DETAILS_OF_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscription_code_details: action.payload,
        loading: false,
      };

    case API_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        upload_loading: false,
      };

    default:
      return state;
  }
};

export default Subscriptions;
