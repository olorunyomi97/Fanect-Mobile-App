import { put, takeLatest, call } from '@redux-saga/core/effects';

import { addContent } from '../../../helpers/backend_helper';
import { addContentFailure, addContentSuccess } from './actions';

import { ADD_CONTENT } from './actionTypes';
import { show_toast_notifications } from '../../../helpers/notifications';
import * as RootNavigation from '../../../helpers/navigation_helper';

function* doAddContent(action) {
  console.log('saga hitt', action.payload);

  const data = action.payload;

  try {
    const formData = new FormData();

    data.images.forEach(image => {
      formData.append('file', {
        uri: image.uri,
        type: image.uri.includes('mp4') ? 'video/mp4' : 'image/jpg',
        name: 'image',
      });
    });

    if (data?.caption) {
      formData.append('caption', data.caption);
    }
    formData.append('alignment', 'left');
    formData.append('color', '#FFFFFF');

    // console.log('fdd', formData);

    // console.log('formdd', formData._parts);

    const resp = yield call(addContent, formData);
    console.log('rssp', resp);
    yield put(addContentSuccess());
    show_toast_notifications('Content added successfully', 'success');
    RootNavigation.navigate('General', { screen: 'Home' });
  } catch (error) {
    console.log('error', error);
    console.log('adc err', error.response);
    yield put(addContentFailure());
    show_toast_notifications('Unable to add content', 'error');
  }
}

function* AddContentSaga() {
  yield takeLatest(ADD_CONTENT.REQUEST, doAddContent);
}

export default AddContentSaga;
