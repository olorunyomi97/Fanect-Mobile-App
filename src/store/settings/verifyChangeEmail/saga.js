import { call, put, takeLatest } from 'redux-saga/effects';
import { verifyChangeEmail } from '../../../helpers/backend_helper';
import { show_toast_notifications } from '../../../helpers/notifications';

import { verifyChangeEmailFailure, verifyChangeEmailSuccess } from './actions';
import { VERIFY_CHANGE_EMAIL } from './actionTypes';
import { logoutUser, logoutUserSuccess, updateUserData,} from '../../../store/auth/login/actions';
import { clearAsync } from '../../../helpers/jwt-token-access/accessToken';
import * as RootNavigation from '../../../helpers/navigation_helper';

function* doVerifyChangeEmail(action) {
  try {
    const { otp_data, history } = action.payload;
    yield call(verifyChangeEmail, otp_data);
    clearAsync();
    yield put(updateUserData({}));
    yield put(verifyChangeEmailSuccess(history));
    show_toast_notifications('Email updated', 'success');
    RootNavigation.navigate('Auth', { screen: 'Login' });
    // history.navigate('Auth', {
    //   screen: 'Login',
    // });
  } catch (error) {
    console.log("it's here", error.response);
    yield put(verifyChangeEmailFailure());
    show_toast_notifications(error.response?.data?.error?.message, 'error');
  }
}

function* VerifyChangeEmailSaga() {
  yield takeLatest(VERIFY_CHANGE_EMAIL.REQUEST, doVerifyChangeEmail);
}

export default VerifyChangeEmailSaga;
