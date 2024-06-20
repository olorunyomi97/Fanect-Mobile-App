import {
  GET_USERS,
  GET_USER_PROFILE,
  API_ERROR,
  GET_USER_SUBSCRIPTIONS,
  GET_USER_SUBSCRIPTIONS_SUCCESS,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_SUCCESS,
} from './actionTypes';

const INIT_STATE = {
  error: null,
  loading: true,
  user_data: [],
  subscriptions: [],
};

const Profile = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: true,
        error: null,
      };

    case GET_USER_PROFILE:
      return {
        ...state,
        user_data: action.payload,
        loading: true,
        error: null,
      };

    case GET_USER_SUBSCRIPTIONS:
      return {
        ...state,
        loading: true,
        subscriptions_loading: true,
        error: null,
      };

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        user_data: action.payload,
        loading: false,
        error: null,
      };

    case GET_USER_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptions_loading: false,
        subscriptions: action.payload,
        loading: false,
        error: null,
      };

    case API_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        upload_loading: false,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default Profile;
