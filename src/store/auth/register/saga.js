import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

//Account Redux states
import { REGISTER_USER } from './actionTypes';
import {
  registerUserSuccessful,
  apiError,
  getUserByIdSuccess,
} from './actions';

//Include Both Helper File with needed methods

import { postRegisterUser } from '../../../helpers/backend_helper.js';
import { show_toast_notifications } from '../../../helpers/notifications';

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user, history } }) {
  try {
    const response = yield call(postRegisterUser, user);
    console.log(user)
    if (response != undefined) {
      const updated_response = { ...response, ...{ type: 'verify_register' } };
      history.navigate('Auth', {
        screen: 'Verification',
        params: {
          response: updated_response,
        },
      });
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log(error.response);
    const error_response =
      error.response.data.error.data == undefined
        ? error.response.data.error.message
        : error.response.data.error.data.message;
    show_toast_notifications(error_response, 'error');
    yield put(apiError(error_response));
  }
}

function* registerSaga() {
  yield takeEvery(REGISTER_USER, registerUser);
}

export default registerSaga;
