import { DEACTIVATE_PROFILE, DEACTIVATE_PROFILE_SUCCESS, DEACTIVATE_PROFILE_FAILURE, API_ERROR } from './actionTypes';

export const deactivateProfile = response => {
    return {
        type: DEACTIVATE_PROFILE,
        payload: response,
    };
};

export const deactivateProfileSuccess = response => {
    return {
        type: DEACTIVATE_PROFILE_SUCCESS,
        payload: response,
        
    };
};

export const deactivateProfileFailure = error => {
    return {
        type: DEACTIVATE_PROFILE_FAILURE,
        payload: error,
        
    };
};

export const apiError = error => {
    return {
        type: API_ERROR,
        payload: error,
    };
};