import { call, put, takeLatest } from 'redux-saga/effects';

import { toggleNotificationSetting } from '../../../helpers/backend_helper';
import {
  toggleNotificationsSuccess,
  toggleNotificationsFailure,
} from './actions';
import { TOGGLE_NOTIFICATIONS } from './actionTypes';
import { show_toast_notifications } from '../../../helpers/notifications';
import { updateUserData } from '../../auth/login/actions';

function* doToggleNotification(action) {
  try {
    const resp = yield call(toggleNotificationSetting, action.payload);

    yield put(updateUserData(resp?.data));
    yield put(toggleNotificationsSuccess());
    show_toast_notifications('notification successfully changed', 'success');
  } catch (error) {
    yield put(toggleNotificationsFailure());
    show_toast_notifications(error?.response?.data?.error?.message, 'error');
  }
}

function* ToggleNotificationSaga() {
  yield takeLatest(TOGGLE_NOTIFICATIONS.REQUEST, doToggleNotification);
}

export default ToggleNotificationSaga;
