import { Toast } from 'native-base';

export const show_toast_notifications = (message, status) => {
  const id = 'test-toast';

  if (!Toast.isActive(id)) {
    Toast.show({
      id,
      title: message
        ? message.toString().toLowerCase()
        : 'something went wrong, please check your internet connection and try again',
      status: status,
      placement: 'top',
    });
  }
};
