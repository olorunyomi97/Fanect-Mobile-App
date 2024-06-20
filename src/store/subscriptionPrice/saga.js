import { takeLatest, call, put } from '@redux-saga/core/effects';

import { setSubscriptionPrice } from '../../helpers/backend_helper';
import {
  setSubscriptionPriceSuccess,
  setSubscriptionPriceFailure,
} from './actions';
import { SET_SUBSCRIPTION_PRICE } from './actionTypes';
import { show_toast_notifications } from '../../helpers/notifications';

function* doSetSubscriptionPrice(action) {
  console.log('sub price', action.payload);

  try {
    const resp = yield call(setSubscriptionPrice, action.payload.subPrice);
    console.log('rsp', resp);
    show_toast_notifications(
      'Your subscription price has been updated',
      'success',
    );
    action.payload.cb();
    yield put(setSubscriptionPriceSuccess());
  } catch (error) {
    console.log('error report', error);

    yield put(setSubscriptionPriceFailure());
    show_toast_notifications(
      error?.response?.data?.error?.message || 'Network error',
      'error',
    );
  }
}

function* SetSubscriptionPriceSaga() {
  yield takeLatest(SET_SUBSCRIPTION_PRICE.REQUEST, doSetSubscriptionPrice);
}

export default SetSubscriptionPriceSaga;
