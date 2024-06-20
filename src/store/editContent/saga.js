import { takeLatest, call, put } from '@redux-saga/core/effects';

import { editContent } from '../../helpers/backend_helper';
import { editContentSuccess, editContentFailure } from './actions';
import { EDIT_CONTENT } from './actionTypes';
import { show_toast_notifications } from '../../helpers/notifications';
import { getUserContent } from '../getUserContent/actions';
import * as RootNavigation from '../../helpers/navigation_helper';

function* doEditContent(action) {
  try {
    // const modifiedContent = action.payload;

    // const formData = new FormData();

    // modifiedContent.images.forEach(image => {
    //   if (image?.uri) {
    //     formData.append('file', {
    //       uri: image.uri,
    //       type: image.uri.includes('mp4') ? 'video/mp4' : 'image/jpg',
    //       name: 'image',
    //     });
    //   } else {
    //     formData.append('file', {
    //       uri: image,
    //       type: image.includes('mp4') ? 'video/mp4' : 'image/jpg',
    //       name: 'image',
    //     });
    //   }
    // });

    // if (modifiedContent?.caption) {
    //   formData.append('caption', modifiedContent.caption);
    // }
    // formData.append('alignment', 'left');
    // formData.append('color', '#FFFFFF');

    // console.log('fileeeeeee', formData);

    const resp = yield call(editContent, action.payload);
    console.log('rsp', resp);
    yield put(editContentSuccess());
    show_toast_notifications('Content Updated', 'success');
    yield put(getUserContent());
    RootNavigation.navigate('General', { screen: 'Profile' });
  } catch (error) {
    console.log('error report', error);

    yield put(editContentFailure());
    show_toast_notifications('Unable to update content', 'error');
  }
}

function* EditContentSaga() {
  yield takeLatest(EDIT_CONTENT.REQUEST, doEditContent);
}

export default EditContentSaga;
