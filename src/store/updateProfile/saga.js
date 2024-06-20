import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  updateProfile,
  deleteProfilePic,
  updateProfilePic,
} from '../../helpers/backend_helper';
import {
  updateProfileSuccess,
  updateProfileFailure,
  deleteProfilePicSuccess,
  deleteProfilePicFailure,
  updateProfilePicSuccess,
  updateProfilePicFailure,
} from './actions';
import {
  DELETE_PROFILE_PIC,
  UPDATE_PROFILE,
  UPDATE_PROFILE_PIC,
} from './actionTypes';

import { show_toast_notifications } from '../../helpers/notifications';
import { updateUserData } from '../auth/login/actions';

function* doUpdateProfile(action) {
  try {
    const resp = yield call(updateProfile, action.payload);
    yield put(updateUserData(resp?.data));
    yield put(updateProfileSuccess());
    show_toast_notifications('Profile Updated', 'success');
  } catch (error) {
    console.log(error);
    yield put(updateProfileFailure());
    show_toast_notifications('Unable to update profile', 'error');
  }
}

function* doDeleteProfilePic(action) {
  try {
    const resp = yield call(deleteProfilePic, action.payload);
    yield put(updateUserData(resp?.data));
    yield put(deleteProfilePicSuccess());
    show_toast_notifications('Profile pic deleted', 'success');
  } catch (error) {
    console.log(error);
    yield put(deleteProfilePicFailure());
    show_toast_notifications('Unable to delete profile pic', 'error');
  }
}

function* doUpdateProfilePic(action) {
  console.log('payload from saga', action);

  const image = action.payload;

  try {
    const body = new FormData();

    body.append('file', {
      name: 'pics.jpg',
      uri: image.path,
      type: image.mime,
    });

    const resp = yield call(updateProfilePic, body);
    console.log('updated pp data', resp);
    yield put(updateProfilePicSuccess());
    show_toast_notifications('Profile pic updated', 'success');
  } catch (error) {
    yield put(updateProfilePicFailure());
    show_toast_notifications('Unable to update profile pic', 'error');
  }
}

function* UpdateProfileSaga() {
  yield takeEvery(UPDATE_PROFILE.REQUEST, doUpdateProfile);
  yield takeLatest(DELETE_PROFILE_PIC.REQUEST, doDeleteProfilePic);
  yield takeEvery(UPDATE_PROFILE_PIC.REQUEST, doUpdateProfilePic);
}

export default UpdateProfileSaga;
