import { takeEvery, call, put } from '@redux-saga/core/effects';
import { getPost } from '../../helpers/backend_helper';
import { getPostFailure, getPostSuccess } from './actions';

import { GET_POST } from './actionTypes';

function* doFetchPost() {
  try {
    const resp = yield call(getPost, action.payload);
    yield put(getPostSuccess(resp?.data));
  } catch (error) {
    console.log('error', error);
    yield put(getPostFailure());
  }
}

function* PostSaga() {
  yield takeEvery(GET_POST.REQUEST, doFetchPost);
}

export default PostSaga;
