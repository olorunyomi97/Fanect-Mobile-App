import { takeLatest, call, put } from '@redux-saga/core/effects';

import { initiateTransaction } from '../../../helpers/backend_helper';
import { show_toast_notifications } from '../../../helpers/notifications';
import {
  initiateTransactionSuccess,
  initiateTransactionFailure,
} from './actions';
import { INITIATE_TRANSACTION } from './actionTypes';

function* doInitiateTransaction(action) {
  const { initiateTransactionDetail, cb } = action.payload;
  try {
    const resp = yield call(initiateTransaction, initiateTransactionDetail);

    yield put(initiateTransactionSuccess(resp.data));
    yield cb();
    // show_toast_notifications('Payment Successful', 'success');
  } catch (error) {
    console.log(error);
    yield put(initiateTransactionFailure());
    show_toast_notifications('Unable to complete transaction', 'error');
  }
}

function* InitiateTransactionSaga() {
  yield takeLatest(INITIATE_TRANSACTION.REQUEST, doInitiateTransaction);
}

export default InitiateTransactionSaga;
