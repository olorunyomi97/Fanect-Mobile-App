import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { FORGET_PASSWORD } from './actionTypes';
import { userForgetPasswordSuccess, apiError } from './actions';
import { postForgotPassword } from '../../../helpers/backend_helper';

//Include Both Helper File with needed methods

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* doforgetUser({ payload: { user, history } }) {
  try {
    const response = yield call(postForgotPassword, { email: user.email });
    if (response !== undefined) {
      yield put(userForgetPasswordSuccess(response.data));
      const updated_response = { ...response, ...{ type: 'forgot_password' } };
      history.navigate('Auth', {
        screen: 'Verification',
        params: {
          response: updated_response,
        },
      });
    }
  } catch (error) {
    yield put(apiError(error.response.data.error.message));
  }
}

export function* ForgotPasswordSaga() {
  yield takeEvery(FORGET_PASSWORD, doforgetUser);
}

export default ForgotPasswordSaga;
