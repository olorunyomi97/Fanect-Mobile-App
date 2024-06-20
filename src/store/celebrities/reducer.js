import {
  GET_CELEBRITIES,
  GET_CELEBRITIES_PROFILE,
  SEARCH_CELEBRITIES,
  API_ERROR,
  GET_CELEBRITIES_SUBSCRIPTIONS,
  GET_CELEBRITIES_SUBSCRIPTIONS_SUCCESS,
  GET_CELEBRITIES_PROFILE_SUCCESS,
  GET_CELEBRITIES_SUCCESS,
} from './actionTypes';

const INIT_STATE = {
  error: null,
  loading: true,
  user_data: [],
  celebrities: [],
  is_celeb_subscribed: false,
};

const Celebrities = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CELEBRITIES:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SEARCH_CELEBRITIES:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case GET_CELEBRITIES_SUCCESS:
      return {
        ...state,
        celebrities: action.payload.data,
        loading: false,
      };

    // case GET_USER_PROFILE:
    //     return {
    //         ...state,
    //         user: action.payload,
    //         loading: true,
    //         error: null,
    //     };

    // case GET_USER_SUBSCRIPTIONS:
    //     return {
    //         ...state,
    //         loading: true,
    //         subscriptions_loading: true,
    //         error: null,
    //     };

    // case GET_USER_PROFILE_SUCCESS:
    //     return {
    //         ...state,
    //         user: action.payload,
    //         loading: true,
    //         error: null,
    //     };

    // case GET_USER_SUBSCRIPTIONS_SUCCESS:
    //     return {
    //         ...state,
    //         subscriptions_loading: false,
    //         subscriptions: action.payload,
    //         loading: false,
    //         error: null,
    //     };

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

export default Celebrities;
