import { takeLatest, takeEvery, call, put } from '@redux-saga/core/effects';
import { getStories } from '../../helpers/backend_helper';
import { getStoriesSuccess, getStoriesFailure } from './actions';

import { GET_STORIES } from './actionTypes';

function* doFetchStories() {
  try {
    const resp = yield call(getStories);
    console.log('<<<<stories>r>>', JSON.stringify(resp));
    if (resp) {
      yield put(getStoriesSuccess(resp?.data));
    }
  } catch (error) {
    console.log('error stories', error);
    yield put(getStoriesFailure());
  }
}

function* StoriesSaga() {
  yield takeLatest(GET_STORIES.REQUEST, doFetchStories);
}

export default StoriesSaga;
