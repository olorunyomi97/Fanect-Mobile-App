import { GET_NOTIFICATION } from './actionTypes';

export const getNotification = refreshing => {
  console.log('action');
  return {
    type: GET_NOTIFICATION.REQUEST,
    payload: refreshing,
  };
};

export const getNotificationSuccess = (notification, refreshing) => {
  return {
    type: GET_NOTIFICATION.SUCCESS,
    payload: { notification, refreshing },
  };
};

export const getNotificationFailure = () => {
  return {
    type: GET_NOTIFICATION.FAILURE,
  };
};
