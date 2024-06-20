import { put, takeLatest, call } from '@redux-saga/core/effects';

import { getEarningsHistory } from '../../helpers/backend_helper';
import {
  getCelebEarningsHistorySuccess,
  getCelebEarningsHistoryFailure,
} from './actions';

import { GET_CELEB_EARNINGS_HISTORY } from './actionTypes';
// import { show_toast_notifications } from '../../helpers/notifications';

function* doGetCelebEarningsHistory() {
  try {
    const resp = yield call(getEarningsHistory);
    console.log('earning history', resp);
    yield put(getCelebEarningsHistorySuccess(resp?.data));
  } catch (error) {
    console.log('error', error);
    yield put(getCelebEarningsHistoryFailure());
    // show_toast_notifications('Unable to fetch celeb earning history', 'error');
  }
}

function* EarningsHistorySaga() {
  yield takeLatest(
    GET_CELEB_EARNINGS_HISTORY.REQUEST, doGetCelebEarningsHistory);
}

export default EarningsHistorySaga;
