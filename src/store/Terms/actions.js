import { GET_TERMS, GET_TERMS_SUCCESS, GET_PRIVACY_POLICY, GET_PRIVACY_POLICY_SUCCESS, API_ERROR } from './actionTypes';

export const getTerms = () => {
    return {
        type: GET_TERMS,
    }
}

export const getTermsSuccess = response => {
    return {
      type: GET_TERMS_SUCCESS,
      payload: response,
    };
};


export const getPrivacyPolicy = () => {
    return {
        type: GET_PRIVACY_POLICY,
    }
}

export const getPrivacyPolicySuccess = (response) => {
    return {
      type: GET_PRIVACY_POLICY_SUCCESS,
      payload: response
    };
};

export const apiError = error => {
    return {
      type: API_ERROR,
      payload: error,
    };
  };