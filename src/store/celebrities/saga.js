import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { GET_CELEBRITIES, SEARCH_CELEBRITIES } from './actionTypes';

import { getCelebritiesSuccess, apiError } from './actions';

//Include Both Helper File with needed methods
import {
  getFanectCelebrities,
  searchFanectCelebrities,
} from '../../helpers/backend_helper.js';

function* doGetCelebrities() {
  try {
    const response = yield call(getFanectCelebrities);
    yield put(getCelebritiesSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(apiError(error.message));
  }
}

function* doSearchCelebrities({ payload }) {
  console.log(payload);
  try {
    const response = yield call(searchFanectCelebrities, payload);
    console.log(response);
    yield put(getCelebritiesSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(apiError(error.message));
  }
}

// function* doGetSubscriptions() {
//     try {
//         const response = yield call(getUserSubscriptions);
//         yield put(getUserSubscriptionsSuccess(response.data));
//     } catch (error) {
//         console.log(error);
//         yield put(apiError(error.message));
//     }
// }

function* CelebritySaga() {
  yield takeLatest(GET_CELEBRITIES, doGetCelebrities);
  yield takeLatest(SEARCH_CELEBRITIES, doSearchCelebrities);
  // yield takeLatest(GET_USER_SUBSCRIPTIONS, doGetSubscriptions);
}

export default CelebritySaga;
