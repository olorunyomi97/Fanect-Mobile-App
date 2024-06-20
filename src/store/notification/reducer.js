import { GET_NOTIFICATION } from './actionTypes';

const initialState = {
  loading: false,
  notification: [],
};

const Notification = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_NOTIFICATION.REQUEST:
      return { ...state, loading: true };

    case GET_NOTIFICATION.SUCCESS:
      return { notification: payload.notification, loading: false };

    case GET_NOTIFICATION.FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default Notification;
