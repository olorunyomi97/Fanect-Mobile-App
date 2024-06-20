import { TOGGLE_NOTIFICATIONS } from './actionTypes';

const initialState = {
  loading: false,
};

const ToggleNotifications = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_NOTIFICATIONS.REQUEST:
      return { loading: true };

    case TOGGLE_NOTIFICATIONS.SUCCESS:
      return { loading: false };

    case TOGGLE_NOTIFICATIONS.FAILURE:
      return { loading: false };

    default:
      return state;
  }
};

export default ToggleNotifications;
