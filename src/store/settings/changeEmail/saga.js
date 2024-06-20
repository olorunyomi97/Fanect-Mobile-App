import { call, put, takeLatest } from 'redux-saga/effects';
import { changeEmail, postChangeEmailResendOtp } from '../../../helpers/backend_helper';

import { changeEmailSuccess, resendChangeOtpSuccess, changeEmailFailure } from './actions';
import { CHANGE_EMAIL, CHANGE_EMAIL_OTP_RESEND } from './actionTypes';

import { show_toast_notifications } from '../../../helpers/notifications';
import * as RootNavigation from '../../../helpers/navigation_helper';

function* doChangeEmail(action) {
  console.log('action from updateProfile', action);

  const { email, password, retry } = action.payload;

  try {
    const resp = yield call(changeEmail, { email, password });
    console.log('rp', resp);
    // yield put(changeEmailSuccess());
    // show_toast_notifications('Email address updated', 'success');
    const updatedVerifyChangeEmail = {...{type: 'change_email', password: action.payload.password}, ...resp.data };
    console.log(updatedVerifyChangeEmail, '<===== updated change verify email ===>')
    if (!retry) {
      RootNavigation.navigate('VerifyChangeEmail', updatedVerifyChangeEmail);
    }
  } catch (error) {
    yield put(changeEmailFailure());
    show_toast_notifications(error?.response?.data?.error?.message, 'error');
  }
}


function* doChangeEmailResendOtp({ payload: { otp_data } }) {
  try {
    console.log(otp_data, '<===== user otp data ====>')
    const response = yield call(postChangeEmailResendOtp, otp_data);

    console.log(response, '<===== respone fro resend user otp ===>');
    yield put(resendChangeOtpSuccess(response));
  } catch (error) {
    console.log(apiError);
    yield put(apiError(error));
  }
}

function* ChangeEmailSaga() {
  yield takeLatest(CHANGE_EMAIL, doChangeEmail);
  yield takeLatest(CHANGE_EMAIL_OTP_RESEND, doChangeEmailResendOtp);
}

export default ChangeEmailSaga;
