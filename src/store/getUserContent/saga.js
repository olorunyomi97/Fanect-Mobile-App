import { takeLatest, call, put } from '@redux-saga/core/effects';

import { getUserContent } from '../../helpers/backend_helper';
import { getUserContentSuccess, getUserContentFailure } from './actions';
import { GET_USER_CONTENT } from './actionTypes';
import { show_toast_notifications } from '../../helpers/notifications';

function* doGetUserContent(action) {
  try {
    const resp = yield call(getUserContent, action.payload);

    yield put(getUserContentSuccess(resp.data));
  } catch (error) {
    console.log('error report', error?.response);

    yield put(getUserContentFailure());
    show_toast_notifications(
      'Unable to fetch your content at the moment',
      'error',
    );
  }
}

function* GetUserContentSaga() {
  yield takeLatest(GET_USER_CONTENT.REQUEST, doGetUserContent);
}

export default GetUserContentSaga;
