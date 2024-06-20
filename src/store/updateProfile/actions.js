import { UPDATE_PROFILE, DELETE_PROFILE_PIC, UPDATE_PROFILE_PIC } from './actionTypes';

export const updateProfile = ({ username, fullname, bio }) => {
  return {
    type: UPDATE_PROFILE.REQUEST,
    payload: { username, fullname, bio },
  };
};

export const updateProfileSuccess = () => {
  return {
    type: UPDATE_PROFILE.SUCCESS,
  };
};

export const updateProfileFailure = () => {
  return {
    type: UPDATE_PROFILE.FAILURE,
  };
};

export const deleteProfilePic = current_userdata => {
  return {
    type: DELETE_PROFILE_PIC.REQUEST,
  };
};

export const deleteProfilePicSuccess = () => {
  return {
    type: DELETE_PROFILE_PIC.SUCCESS,
  };
};

export const deleteProfilePicFailure = () => {
  return {
    type: DELETE_PROFILE_PIC.FAILURE,
  };
};

export const updateProfilePic = profilePic => {
  return {
    type: UPDATE_PROFILE_PIC.REQUEST,
    payload: profilePic,
  };
};

export const updateProfilePicSuccess = () => {
  return {
    type: UPDATE_PROFILE_PIC.SUCCESS,
  };
};

export const updateProfilePicFailure = () => {
  return {
    type: UPDATE_PROFILE_PIC.FAILURE,
  };
};
