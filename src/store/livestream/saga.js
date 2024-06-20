import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Platform } from 'react-native';
import { START_LIVE_STREAM, END_LIVE_STREAM } from './actionTypes';
import { apiError, getStartStreamSuccess } from './actions';
import * as url from '../../helpers/url_helper';
import {
  startLiveStream,
  endLiveStream,
} from '../../helpers/backend_helper.js';
import { saveData } from '../../helpers/async_storage_helper.js';

function* doStartLiveStream() {
  try {
    const resp = yield call(startLiveStream);
    console.log(
      '*******########<<<<start livestream data>>>****########',
      JSON.stringify(resp),
    );
    if (resp) {
      if (resp) {
        saveData('user_live_stream_details', resp);
      }
    }
  } catch (error) {
    console.log(
      '###*******########<<<<startstart live stream error' +
        JSON.stringify(error),
    );
  }
}

function* doEndLiveStream({ payload }) {
  try {
    const resp = yield call(endLiveStream, payload);
    // alert('END LIVE STREAM*******########<<<<end livestream data>>>****########', JSON.stringify(resp)," ---id::::",payload);

    if (resp) {
      if (resp) {
        //alert('END LIVE STREAM*******########<<<<end livestream data>>>****########', JSON.stringify(resp));
        //saveData('user_live_stream_details', resp);
      }
    }
  } catch (error) {
    console.log(
      'END LIVE STREAM ERROR*******########<<<<end livestream data>>>****########',
      JSON.stringify(error),
    );
  }
}

function* liveStreamSaga() {
  yield takeEvery(START_LIVE_STREAM, doStartLiveStream);
  yield takeEvery(END_LIVE_STREAM, doEndLiveStream);
}

export default liveStreamSaga;
