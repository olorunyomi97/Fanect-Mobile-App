import { takeLatest, call, put } from '@redux-saga/core/effects';

import { createReport } from '../../helpers/backend_helper';
import { createReportSuccess, createReportFailure } from './actions';
import { CREATE_REPORT } from './actionTypes';
import { show_toast_notifications } from '../../helpers/notifications';

function* doCreateReport(action) {
  console.log('hit saga');

  const cb = action.payload.cb;

  try {
    const resp = yield call(createReport, action.payload.values);
    console.log('rsp', resp);
    yield put(createReportSuccess());
    show_toast_notifications('Report submitted', 'success');
    cb();
  } catch (error) {
    console.log('error report', error);

    yield put(createReportFailure());
    show_toast_notifications('Unable to submit report', 'error');
  }
}

function* CreateReportSaga() {
  yield takeLatest(CREATE_REPORT.REQUEST, doCreateReport);
}

export default CreateReportSaga;
