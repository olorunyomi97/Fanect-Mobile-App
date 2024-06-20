import {
  UPDATE_PROFILE,
  DELETE_PROFILE_PIC,
  UPDATE_PROFILE_PIC,
} from './actionTypes';

const initialState = {
  loading: false,
  deletingProfilePic: false,
  updatingProfilePic: false,
};

const UpdateProfile = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_PROFILE.REQUEST:
      return { ...state, loading: true };

    case DELETE_PROFILE_PIC.REQUEST:
      return { ...state, deletingProfilePic: true };

    case UPDATE_PROFILE_PIC.REQUEST:
      return { ...state, updatingProfilePic: true };

    case UPDATE_PROFILE.SUCCESS:
    case UPDATE_PROFILE.FAILURE:
      return { ...state, loading: false };

    case DELETE_PROFILE_PIC.SUCCESS:
    case DELETE_PROFILE_PIC.FAILURE:
      return { ...state, deletingProfilePic: false };

    case UPDATE_PROFILE_PIC.SUCCESS:
    case UPDATE_PROFILE_PIC.FAILURE:
      return { ...state, updatingProfilePic: false };

    default:
      return state;
  }
};

export default UpdateProfile;
