import { takeLatest, call, put } from '@redux-saga/core/effects';
import { getCelebrityContent } from '../../helpers/backend_helper';
import {
  getCelebrityContentSuccess,
  getCelebrityContentFailure,
  clearCelebContent,
} from './actions';

import { GET_CELEBRITY_CONTENT } from './actionTypes';

function* doFetchCelebrityContent(action) {
  console.log('clb id', action.payload);

  try {
    const resp = yield call(getCelebrityContent, action.payload);
    console.log('celebrity content', resp);
    yield put(getCelebrityContentSuccess(resp?.data));
  } catch (error) {
    console.log('error', error);
    yield put(getCelebrityContentFailure());
  }
}

function* CelebrityContentSaga() {
  yield takeLatest(GET_CELEBRITY_CONTENT.REQUEST, doFetchCelebrityContent);
}

export default CelebrityContentSaga;
