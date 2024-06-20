import { takeLatest, call, put } from '@redux-saga/core/effects';

import { getPaymentHistory } from '../../helpers/backend_helper';
import { getPaymentHistorySuccess, getPaymentHistoryFailure } from './actions';

import { GET_PAYMENT_HISTORY } from './actionTypes';

function* doGetPaymentHistory() {
  try {
    const resp = yield call(getPaymentHistory);
    console.log('payment history', resp);
    yield put(getPaymentHistorySuccess(resp?.data));
  } catch (error) {
    console.log('error', error);
    yield put(getPaymentHistoryFailure());
  }
}

function* PaymentHistorySaga() {
  yield takeLatest(GET_PAYMENT_HISTORY.REQUEST, doGetPaymentHistory);
}

export default PaymentHistorySaga;
