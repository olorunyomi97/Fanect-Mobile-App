import { UPDATE_FCM_TOKEN } from './actionTypes';

const initialState = {
  loading: false,
};

const UpdateFcmToken = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_FCM_TOKEN.REQUEST:
      return { ...state, loading: true };

    case UPDATE_FCM_TOKEN.SUCCESS:
      return { ...state, loading: false };

    case UPDATE_FCM_TOKEN.FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default UpdateFcmToken;
