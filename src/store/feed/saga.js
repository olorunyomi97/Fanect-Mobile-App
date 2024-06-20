import { takeLatest, takeEvery, call, put } from '@redux-saga/core/effects';
import { getFeed } from '../../helpers/backend_helper';
import { getFeedFailure, getFeedSuccess } from './actions';

import { GET_FEED } from './actionTypes';

function* doFetchFeed() {
  try {
    const resp = yield call(getFeed);
    yield put(getFeedSuccess(resp?.data));
  } catch (error) {
    console.log('error', error);
    yield put(getFeedFailure());
  }
}

function* FeedSaga() {
  yield takeEvery(GET_FEED.REQUEST, doFetchFeed);
}

export default FeedSaga;
