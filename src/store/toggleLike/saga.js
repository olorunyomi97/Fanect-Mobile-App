import { takeLatest, call, put } from '@redux-saga/core/effects';

import { show_toast_notifications } from '../../helpers/notifications';
import { toggleLike } from '../../helpers/backend_helper';
import { toggleLikeSuccess, toggleLikeFailure } from './actions';
import { TOGGLE_LIKE } from './actionTypes';

function* doToggleLike(action) {
  try {
    const resp = yield call(toggleLike, action.payload);
    console.log('trans resp', resp);
    yield put(toggleLikeSuccess());
    // show_toast_notifications('Post Liked', 'success');
  } catch (error) {
    yield put(toggleLikeFailure());
    show_toast_notifications('Post Like failure', 'error');
  }
}

function* ToggleLikeSaga() {
  yield takeLatest(TOGGLE_LIKE.REQUEST, doToggleLike);
}

export default ToggleLikeSaga;
