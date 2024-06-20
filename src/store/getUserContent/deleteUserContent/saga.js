import { takeLatest, call, put } from '@redux-saga/core/effects';

import { deleteUserContent } from '../../../helpers/backend_helper';
import { deleteUserContentFailure, deleteUserContentSuccess } from './actions';
import { DELETE_USER_CONTENT } from './actionTypes';
import { show_toast_notifications } from '../../../helpers/notifications';
import { getUserContent } from '../actions';

function* doDeleteUserContent(action) {
  console.log('del cont id', action.payload);
  try {
    const resp = yield call(deleteUserContent, action.payload);

    yield put(getUserContent());
    show_toast_notifications('Post deleted', 'success');
    yield put(deleteUserContentSuccess());
  } catch (error) {
    console.log('error report', error);

    yield put(deleteUserContentFailure());
    show_toast_notifications(
      error?.response?.data?.error?.message || 'Network error',
      'error',
    );
  }
}

function* DeleteUserContentSaga() {
  yield takeLatest(DELETE_USER_CONTENT.REQUEST, doDeleteUserContent);
}

export default DeleteUserContentSaga;
