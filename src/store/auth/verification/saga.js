import { takeEvery, put, call } from 'redux-saga/effects';

import { VERIFY_OTP, RESEND_OTP } from './actionTypes';
import { resendOtpSuccess, verifyOtpSuccess, apiError } from './actions';
//Include Both Helper File with needed methods
import {
  postVerifyRegisterOtp,
  postVerifyResetPasswordOtp,
  postResendOtp,
  verifyChangeEmail,
} from '../../../helpers/backend_helper';
import { saveData } from '../../../helpers/async_storage_helper';
import { loginSuccess, logoutUser } from '../login/actions';
import { clearAsync } from '../../../helpers/jwt-token-access/accessToken';
import * as RootNavigation from '../../../helpers/navigation_helper';

function* doUserVerifyOtp({ payload: { otp_data, history } }) {
  try {
    let response = null;
    if (otp_data.type == 'verify_register') {
      response = yield call(postVerifyRegisterOtp, otp_data);
    } else if (otp_data.type == 'change_email') {
      response = yield call(verifyChangeEmail, otp_data);
    } else {
      response = yield call(postVerifyResetPasswordOtp, otp_data);
    }

    yield put(verifyOtpSuccess(response));

    if (otp_data.type == 'verify_register') {
      saveData('auth_user', response.data);
      yield put(loginSuccess(response.data));
      history.navigate('General', {
        screen: 'Home',
      });
    } else if (otp_data.type == 'change_email') {
      console.log('here');
      yield call(logoutUser());
      clearAsync();
      yield put(logoutUserSuccess());
      history.navigate('Auth', {
        screen: 'Login',
      });
      console.log('here1');
    } else {
      history.navigate('Auth', {
        screen: 'ResetPassword',
        params: { response },
      });
    }
  } catch (error) {
    console.log(error);
    yield put(apiError(error.response.data.error.message));
  }
}

function* doUserResendOtp({ payload: { otp_data, history } }) {
  try {
    console.log(otp_data.email, '<===== user otp data ====>');
    const response = yield call(postResendOtp, otp_data);

    console.log(response, '<===== respone fro resend user otp ===>');
    yield put(resendOtpSuccess(response));
  } catch (error) {
    console.log(apiError);
    yield put(apiError(error));
  }
}

function* verificationSaga() {
  yield takeEvery(VERIFY_OTP, doUserVerifyOtp);
  yield takeEvery(RESEND_OTP, doUserResendOtp);
}

export default verificationSaga;
