import { takeLatest, call, put } from '@redux-saga/core/effects';

import { getUser } from '../../helpers/backend_helper';
import { getUserSuccess, getUserFailure } from './actions';
import { GET_USER } from './actionTypes';

function* doGetUser(action) {
  // console.log('getting user payl!!!', action.payload);

  try {
    const resp = yield call(getUser, action.payload);
    // console.log('getting user!!!', resp);
    yield put(getUserSuccess(resp?.data));
  } catch (error) {
    console.log('error', error);
    yield put(getUserFailure());
  }
}

function* GetUserSaga() {
  yield takeLatest(GET_USER.REQUEST, doGetUser);
}

export default GetUserSaga;
