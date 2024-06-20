import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Platform } from 'react-native';
import { POST_STORY } from './actionTypes';
import { apiError } from './actions';
import * as url from '../../helpers/url_helper';
import { postStory } from '../../helpers/backend_helper.js';

function* doPostStory({ payload: { data, history } }) {
  let filename = data.uri.substring(
    data.uri.lastIndexOf('/') + 1,
    data.uri.length,
  );
  let fileExtension = data.uri.substr(data.uri.lastIndexOf('.') + 1);
  let filetype = '';

  if (fileExtension.toLowerCase() == 'jpeg') {
    filetype = 'image/jpeg';
  } else if (fileExtension.toLowerCase() == 'jpg') {
    filetype = 'image/jpg';
  } else if (fileExtension.toLowerCase() == 'png') {
    filetype = 'image/jpg';
  } else if (fileExtension.toLowerCase() == 'mp4') {
    filetype = 'video/mp4';
  } else {
    filetype = 'image/jpeg';
  }

  let storyFormData = new FormData();
  storyFormData.append('file', {
    uri: data.uri,
    type: filetype,
    name: filename,
  });
  storyFormData.append('caption', 'Story ' + filename);
  try {
    const response = yield call(postStory, storyFormData);
    if (response.status == 'success') {
      history.replace('General', {
        screen: 'Home',
      });
    }
  } catch (error) {
    if (error.response) {
      yield put(apiError(error.response.data.error.message));
    } else if (error.request) {
      yield put(apiError(error.request));
    } else {
      yield put(apiError(error.message));
    }
  }
}

function* storySaga() {
  yield takeEvery(POST_STORY, doPostStory);
}

export default storySaga;
