import { takeLatest, call, put } from '@redux-saga/core/effects';

import { completeTransaction } from '../../../helpers/backend_helper';
import { show_toast_notifications } from '../../../helpers/notifications';
import {
  completeTransactionSuccess,
  completeTransactionFailure,
} from './actions';
import { COMPLETE_TRANSACTION } from './actionTypes';

function* doCompleteTransaction(action) {
  try {
    const resp = yield call(completeTransaction, action.payload.paymentDetails);

    yield put(completeTransactionSuccess(resp));
    if (action.payload?.cb) {
      yield call(action.payload?.cb);
    }
    show_toast_notifications('Payment Successful', 'success');
  } catch (error) {
    console.log('trans resp err', error);
    yield put(completeTransactionFailure());
    show_toast_notifications('Transaction failed', 'error');
  }
}

function* CompleteTransactionSaga() {
  yield takeLatest(COMPLETE_TRANSACTION.REQUEST, doCompleteTransaction);
}

export default CompleteTransactionSaga;
