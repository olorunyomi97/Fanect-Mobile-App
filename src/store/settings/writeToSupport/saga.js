import { call, put, takeLatest } from 'redux-saga/effects';
import { writeToSupport } from '../../../helpers/backend_helper';

import { writeToSupportSuccess, writeToSupportFailure } from './actions';
import { WRITE_TO_SUPPORT } from './actionTypes';
import { show_toast_notifications } from '../../../helpers/notifications';

function* doWriteToSupport(action) {
  try {
    console.log(action.payload);
    yield call(writeToSupport, action.payload);
    yield put(writeToSupportSuccess());
    show_toast_notifications('support successfully logged', 'success');
  } catch (error) {
    yield put(writeToSupportFailure());
    show_toast_notifications(error.response?.data?.error?.message, 'error');
  }
}

function* WriteToSupportSaga() {
  yield takeLatest(WRITE_TO_SUPPORT.REQUEST, doWriteToSupport);
}

export default WriteToSupportSaga;
