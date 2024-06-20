import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { RESET_PASSWORD } from './actionTypes';
import { userResetPasswordSuccess, apiError } from './actions';
import { postResetPassword } from '../../../helpers/backend_helper';

//Include Both Helper File with needed methods

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* doresetUserPassword({ payload: { user, history } }) {
  try {
    const response = yield call(postResetPassword, user);
    if (response.data !== undefined) {
      yield put(userResetPasswordSuccess(response.data));
    }
  } catch (error) {
    console.log(error.response.data.error.message, 19);
    yield put(apiError(error.response.data.error.message));
  }
}

export function* ResetPasswordSaga() {
  yield takeEvery(RESET_PASSWORD, doresetUserPassword);
}

export default ResetPasswordSaga;
