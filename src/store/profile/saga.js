import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// Crypto Redux States
import { GET_USER_PROFILE, GET_USER_SUBSCRIPTIONS } from './actionTypes';

import {
  getUserProfileSuccess,
  getUserSubscriptionsSuccess,
  apiError,
} from './actions';

//Include Both Helper File with needed methods
import {
  fetchUserProfile,
  getUserSubscriptions,
} from '../../helpers/backend_helper.js';
import { updateUserData } from '../auth/login/actions';

function* doGetProfile() {
  try {
    const response = yield call(fetchUserProfile);

    yield put(updateUserData(response?.data[0]));
    yield put(getUserProfileSuccess(response?.data[0]));
  } catch (error) {
    console.log(error);
    yield put(apiError(error.message));
  }
}

function* doGetSubscriptions() {
  try {
    const response = yield call(getUserSubscriptions);
    yield put(getUserSubscriptionsSuccess(response.data));
  } catch (error) {
    console.log(error);
    yield put(apiError(error.message));
  }
}

function* profileSaga() {
  yield takeEvery(GET_USER_PROFILE, doGetProfile);
  yield takeLatest(GET_USER_SUBSCRIPTIONS, doGetSubscriptions);
}

export default profileSaga;
