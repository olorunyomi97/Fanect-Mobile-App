import { takeLatest, call, put } from '@redux-saga/core/effects';

import { updateFcmToken } from '../../helpers/backend_helper';
import { updateTokenSuccess, updateTokenFailure } from './actions';
import { UPDATE_FCM_TOKEN } from './actionTypes';

function* doUpdateFcmToken(action) {
  try {
    yield call(updateFcmToken, action.payload);
    yield put(updateTokenSuccess());
  } catch (error) {
    console.log('error', error);
    yield put(updateTokenFailure());
  }
}

function* UpdateFcmSaga() {
  yield takeLatest(UPDATE_FCM_TOKEN.REQUEST, doUpdateFcmToken);
}

export default UpdateFcmSaga;
