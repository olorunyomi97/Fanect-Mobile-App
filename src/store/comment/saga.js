import { put, takeLatest, call } from '@redux-saga/core/effects';

import { addComment, getPostComments } from '../../helpers/backend_helper';
import {
  addCommentSuccess,
  addCommentFailure,
  getPostCommentsSuccess,
  getPostCommentsFailure,
} from './actions';

import { ADD_COMMENT, GET_POST_COMMENTS } from './actionTypes';
import { show_toast_notifications } from '../../helpers/notifications';

function* doAddComment(action) {
  try {
    const { postId, comment, cb } = action.payload;

    yield call(addComment, { postId, comment });
    yield put(addCommentSuccess());
    cb();
    show_toast_notifications('Comment sent successfully', 'success');
  } catch (error) {
    yield put(addCommentFailure());
    show_toast_notifications('Unable to add comment', 'error');
  }
}

function* doGetPostComments(action) {
  console.log('comment post id', action.payload);
  try {
    const postId = action.payload;

    const resp = yield call(getPostComments, postId);

    console.log('commentsss', resp);
    yield put(getPostCommentsSuccess(resp?.data));
    // show_toast_notifications('Comment sent successfully', 'success');
  } catch (error) {
    yield put(getPostCommentsFailure());
    show_toast_notifications('Unable to fetch comment', 'error');
  }
}

function* AddCommentSaga() {
  yield takeLatest(ADD_COMMENT.REQUEST, doAddComment);
  yield takeLatest(GET_POST_COMMENTS.REQUEST, doGetPostComments);
}

export default AddCommentSaga;
