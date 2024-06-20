import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, UPDATE_USER_DATA} from './actionTypes';
import { apiError, loginSuccess, logoutUserSuccess, updateUserData, updateUserDataSuccess, updateUserDataFailure } from './actions';

import { postLoginUser } from '../../../helpers/backend_helper.js';
import { saveData } from '../../../helpers/async_storage_helper.js';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { show_toast_notifications } from '../../../helpers/notifications';
import { clearAsync } from '../../../helpers/jwt-token-access/accessToken';
import { VERIFY_CHANGE_EMAIL } from '../../settings/verifyChangeEmail/actionTypes';
import * as RootNavigation from '../../../helpers/navigation_helper';

function* dologinUser({ payload: { user, history } }) {
  try {
    const response = yield call(postLoginUser, user);
    if (response.data !== undefined) {
      if (response.is_active == true) {
        saveData('auth_user', response.data);
        yield put(loginSuccess(response.data));
        yield put(updateUserData(response.data));
        history.navigate('General', {
          screen: 'Home',
        });
      } else {
        history.navigate('Auth', {
          screen: 'Verification',
          params: {
            response: { ...response, ...{ type: 'verify_register' } },
          },
        });
      }
    }
  } catch (error) {
    console.log(error.response);
    yield put(apiError(error.response.data.error.message));
    // yield put(apiError(error));
  }
}

function* logoutUser({ payload: { RootNavigation } }) {
  try {
    AsyncStorage.removeItem('auth_user');
    clearAsync();
    RootNavigation.navigate('Auth', { screen: 'Login' });
    yield put(updateUserData({}));
    // history.navigate('Auth', { screen: 'Login'});
    yield put(logoutUserSuccess());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* doUpdateUserData(action) {
  try {
    saveData('auth_user', action.payload);
    yield put(updateUserDataSuccess());
    // show_toast_notifications('User account updated', 'success');
  } catch (error) {
    yield put(updateUserDataFailure());
  }
}

function* loginSaga() {
  yield takeEvery(LOGIN_USER, dologinUser);
  yield takeEvery(LOGOUT_USER, logoutUser);

  // yield takeLatest(VERIFY_CHANGE_EMAIL.SUCCESS, logoutUser);
  //
  yield takeEvery(UPDATE_USER_DATA.REQUEST, doUpdateUserData);
}

export default loginSaga;
