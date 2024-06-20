import {
  ADD_COMMENT,
  CLEAR_POST_COMMENTS,
  GET_POST_COMMENTS,
} from './actionTypes';

export const addComment = (postId, comment, cb) => {
  return {
    type: ADD_COMMENT.REQUEST,
    payload: { postId, comment, cb },
  };
};

export const addCommentSuccess = () => {
  return {
    type: ADD_COMMENT.SUCCESS,
  };
};

export const addCommentFailure = () => {
  return {
    type: ADD_COMMENT.FAILURE,
  };
};

export const getPostComments = postId => {
  return {
    type: GET_POST_COMMENTS.REQUEST,
    payload: postId,
  };
};

export const getPostCommentsSuccess = comments => {
  return {
    type: GET_POST_COMMENTS.SUCCESS,
    payload: comments,
  };
};

export const getPostCommentsFailure = () => {
  return {
    type: GET_POST_COMMENTS.FAILURE,
  };
};

export const clearPostComments = () => {
  return {
    type: CLEAR_POST_COMMENTS,
  };
};
