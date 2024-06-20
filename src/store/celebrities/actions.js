import {
  GET_CELEBRITIES,
  GET_CELEBRITIES_SUCCESS,
  API_ERROR,
  SEARCH_CELEBRITIES,
  SEARCH_CELEBRITIES_SUCCESS,
  GET_CELEBRITIES_PROFILE,
  GET_CELEBRITIES_SUBSCRIPTIONS,
  GET_CELEBRITIES_PROFILE_SUCCESS,
  GET_CELEBRITIES_SUBSCRIPTIONS_SUCCESS,
} from './actionTypes';

export const getCelebrities = () => {
  return {
    type: GET_CELEBRITIES,
  };
};

export const searchCelebrities = params => {
  return {
    type: SEARCH_CELEBRITIES,
    payload: params,
  };
};

export const getCelebritiesSuccess = response => {
  console.log(response, 27);
  return {
    type: GET_CELEBRITIES_SUCCESS,
    payload: response,
  };
};

export const searchCelebritiesSuccess = response => {
  return {
    type: SEARCH_CELEBRITIES_SUCCESS,
    payload: response,
  };
};

// export const getUserProfile = user_id => {
//     return {
//         type: GET_USER_PROFILE,
//         payload: user_id,
//     };
// };

// export const getUserSubscriptions = () => {
//     return {
//         type: GET_USER_SUBSCRIPTIONS,
//     };
// };

// export const getUserSubscriptionsSuccess = response => {
//     return {
//         type: GET_USER_SUBSCRIPTIONS_SUCCESS,
//         payload: response,
//     };
// };

// export const getUserProfileSuccess = response => {
//     return {
//         type: GET_USER_PROFILE_SUCCESS,
//         payload: response,
//     };
// };

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
