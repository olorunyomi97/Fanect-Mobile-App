import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// Crypto Redux States
import {
  SUBSCRIBE_TO_CELEBRITY,
  UNSUBSCRIBE_FROM_CELEBRITY,
  GET_DETAILS_OF_SUBSCRIPTION,
  APPLY_GIFT_CODE,
} from './actionTypes';

import { CHECK_VALID_SUBSCRIPTION } from '../subscribe/subscribe/actionTypes';
import {
  subscribeToCelebritySuccess,
  unsubscribeFromCelebritySuccess,
  getDetailsOfSubscriptionCode,
  getDetailsOfSubscriptionCodeSuccess,
  apiError,
} from './actions';

//Include Both Helper File with needed methods
import {
  checkValidSubscription,
  subscribeToFanectCeleb,
  unsubscribeFromFanectCeleb,
  getSubscriptionCodeDetails,
  postApplyGiftCode,
} from '../../helpers/backend_helper.js';
import { checkValidSubscriptionSuccess } from '../subscribe/subscribe/actions';
import * as RootNavigation from '../../helpers/navigation_helper';
import { show_toast_notifications } from '../../helpers/notifications';

function* doSubscribeToCelebrity({ payload }) {
  try {
    const response = yield call(subscribeToFanectCeleb, payload);
    yield put(subscribeToCelebritySuccess(response));
  } catch (error) {
    yield put(apiError(error.response.data.error.message));
  }
}

function* doApplyGiftCode({ payload }) {
  try {
    console.log(payload, '<=== haa ==>');
    const response = yield call(postApplyGiftCode, payload);
    show_toast_notifications('Subscription successful', 'success');
    RootNavigation.navigate('General', { screen: 'Home' });
  } catch (error) {
    yield put(apiError(error.response.data.error.message));
  }
}

function* doUnSubscribeToCelebrity({ payload }) {
  try {
    console.log(payload);
    const response = yield call(unsubscribeFromFanectCeleb, payload);
    show_toast_notifications(
      'Unsubscribed from celebrity Successfully',
      'success',
    );
    // yield put(unsubscribeFromCelebritySuccess(response));
  } catch (error) {
    yield put(apiError(error.response.data.error.message));
  }
}

function* doGetSubscriptionCodeDetails({ payload }) {
  try {
    const response = yield call(getSubscriptionCodeDetails, payload);
    console.log(response.data);
    yield put(getDetailsOfSubscriptionCodeSuccess(response.data));
  } catch (error) {
    console.log(error);
    // yield put(apiError(error.response.data.error.message));
  }
}

// function* doCheckValidSubscription({ payload }) {
//   try {
//     const resp = yield call(checkValidSubscription, { celeb_id: payload });
//     yield put(checkValidSubscriptionSuccess(resp?.data));
//   } catch (error) {
//     yield put(apiError(error.response.data.error.message));
//   }
// }

function* SubscriptionSaga() {
  yield takeEvery(APPLY_GIFT_CODE, doApplyGiftCode);
  yield takeEvery(SUBSCRIBE_TO_CELEBRITY, doSubscribeToCelebrity);
  yield takeEvery(UNSUBSCRIBE_FROM_CELEBRITY, doUnSubscribeToCelebrity);
  yield takeLatest(GET_DETAILS_OF_SUBSCRIPTION, doGetSubscriptionCodeDetails);
}

export default SubscriptionSaga;
