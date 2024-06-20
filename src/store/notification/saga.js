import { takeEvery, call, put } from '@redux-saga/core/effects';
import { getNotifications } from '../../helpers/backend_helper';
import { getNotificationFailure, getNotificationSuccess } from './actions';

import { GET_NOTIFICATION } from './actionTypes';

function* doFetchNotifications() {
  try {
    const resp = yield call(getNotifications);
    console.log('notifications', resp);
    yield put(getNotificationSuccess(resp?.data));
  } catch (error) {
    console.log('error', error);
    yield put(getNotificationFailure());
  }
}

function* NotificationSaga() {
  yield takeEvery(GET_NOTIFICATION.REQUEST, doFetchNotifications);
}

export default NotificationSaga;
