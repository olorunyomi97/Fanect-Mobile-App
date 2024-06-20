import { TOGGLE_NOTIFICATIONS } from './actionTypes';

export const toggleNotifications = settings => {
  return {
    type: TOGGLE_NOTIFICATIONS.REQUEST,
    payload: settings,
  };
};

export const toggleNotificationsSuccess = () => {
  return {
    type: TOGGLE_NOTIFICATIONS.SUCCESS,
  };
};

export const toggleNotificationsFailure = () => {
  return {
    type: TOGGLE_NOTIFICATIONS.REQUEST,
  };
};
