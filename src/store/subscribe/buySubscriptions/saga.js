import { takeLatest, call, put } from '@redux-saga/core/effects';

import { buySubscriptions } from '../../../helpers/backend_helper';
import { buySubscriptionSuccess, buySubscriptionFailure } from './actions';
import { BUY_SUBSCRIPTION } from './actionTypes';
import { show_toast_notifications } from '../../../helpers/notifications';
import * as RootNavigation from '../../../helpers/navigation_helper';

function* doBuySubscription(action) {
  console.log('buy sub payl', action.payload);
  try {
    const resp = yield call(
      buySubscriptions,
      action.payload.subscriptionDetail,
    );
    console.log('sub rsp', resp);
    yield put(buySubscriptionSuccess());
    RootNavigation.navigate('PaymentStack', {
      screen: 'GiftSubscription',
      params: resp?.data,
    });
    show_toast_notifications('Subscription purchased successfully', 'success');
  } catch (error) {
    console.log('buy sub err', error);
    yield put(buySubscriptionFailure);
    show_toast_notifications(
      error?.response?.error?.message || 'Unable to purchase subscriptions',
      'error',
    );
  }
}

function* BuySubscriptionSaga() {
  yield takeLatest(BUY_SUBSCRIPTION.REQUEST, doBuySubscription);
}

export default BuySubscriptionSaga;
