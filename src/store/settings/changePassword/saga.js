import { call, put, takeLatest } from 'redux-saga/effects';
import { changePassword } from '../../../helpers/backend_helper';

import { changePasswordSuccess, changePasswordFailure } from './actions';
import { CHANGE_PASSWORD } from './actionTypes';

import { show_toast_notifications } from '../../../helpers/notifications';
import * as RootNavigation from '../../../helpers/navigation_helper';

function* doChangePassword(action) {
  console.log('action from updateProfile', action);

  const { data, cb } = action.payload;

  console.log('dtaa', data);

  try {
    yield call(changePassword, data);
    yield put(changePasswordSuccess());
    cb();
    show_toast_notifications('password successfully changed', 'success');
    RootNavigation.navigate('Auth', { screen: 'Login' });
  } catch (error) {
    yield put(changePasswordFailure());
    show_toast_notifications(error?.response?.data?.error?.message, 'error');
  }
}

function* ChangePasswordSaga() {
  yield takeLatest(CHANGE_PASSWORD.REQUEST, doChangePassword);
}

export default ChangePasswordSaga;
