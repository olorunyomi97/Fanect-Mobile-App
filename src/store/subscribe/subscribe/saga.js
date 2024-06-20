import { takeLatest, call, put, take } from '@redux-saga/core/effects';

import {
  subscribeToCeleb,
  checkValidSubscription,
  NewUnSubscribeFromCeleb,
} from '../../../helpers/backend_helper';
import {
  subscribeToCelebSuccess,
  subscribeToCelebFailure,
  unSubscribeFromCeleb,
  unSubscribeFromCelebSuccess,
  unSubscribeFromCelebFailure,
  checkValidSubscriptionSuccess,
  checkValidSubscriptionFailure,
} from './actions';
import {
  CHECK_VALID_SUBSCRIPTION,
  SUBSCRIBE_TO_CELEB,
  UNSUBSCRIBE_FROM_CELEB,
} from './actionTypes';
import { show_toast_notifications } from '../../../helpers/notifications';

function* doSubscribeToCeleb(action) {
  try {
    const resp = yield call(subscribeToCeleb, action.payload.celeb);
    console.log('sub resp', resp);
    yield put(subscribeToCelebSuccess());

    action.payload.cb();

    show_toast_notifications(
      'You are now subscribed to this celebrity',
      'success',
    );
  } catch (error) {
    console.log('sub err', error);
    yield put(subscribeToCelebFailure());
    show_toast_notifications(
      error?.response?.error?.message || 'Unable to subscribe to celeb',
      'error',
    );
  }
}

function* doUnSubscribeToCeleb(action) {
  try {
    const response = yield call(NewUnSubscribeFromCeleb, {
      celeb_id: action.payload.celeb_id,
    });
    // show_toast_notifications('Unsubscribed to celebrity Successfully', 'success');
    yield put(unSubscribeFromCelebSuccess());

    // action.payload.cb();

    show_toast_notifications('Subscription canceled successfully', 'success');
  } catch (error) {
    console.log(error);
    yield put(unSubscribeFromCelebFailure());
    show_toast_notifications(
      error?.response?.error?.message || 'Unable to unsubscribe from celebrity',
      'error',
    );
  }
}

function* doCheckValidSubscription(action) {
  try {
    const resp = yield call(checkValidSubscription, action.payload);
    yield put(checkValidSubscriptionSuccess(resp?.data));
  } catch (error) {
    yield put(checkValidSubscriptionFailure());
    // show_toast_notifications(
    //   error?.response?.error?.message || 'Unable to unsubscribe from celeb',
    //   'error',
    // );
  }
}

function* SubscribeToCelebSaga() {
  yield takeLatest(SUBSCRIBE_TO_CELEB.REQUEST, doSubscribeToCeleb);
  yield takeLatest(UNSUBSCRIBE_FROM_CELEB.REQUEST, doUnSubscribeToCeleb);
  yield takeLatest(CHECK_VALID_SUBSCRIPTION.REQUEST, doCheckValidSubscription);
}

export default SubscribeToCelebSaga;
