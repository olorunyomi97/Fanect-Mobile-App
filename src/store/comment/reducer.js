import {
  ADD_COMMENT,
  CLEAR_POST_COMMENTS,
  GET_POST_COMMENTS,
} from './actionTypes';

const initialState = {
  loading: false,
  postCommentLoading: false,
  postComments: null,
};

const Comment = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_COMMENT.REQUEST:
      return { ...state, loading: true };

    case GET_POST_COMMENTS.REQUEST:
      return { ...state, postCommentLoading: true };

    case ADD_COMMENT.SUCCESS:
    case ADD_COMMENT.FAILURE:
      return { ...state, loading: false };

    case GET_POST_COMMENTS.SUCCESS:
      return { ...state, postCommentLoading: false, postComments: payload };

    case GET_POST_COMMENTS.FAILURE:
      return { ...state, postCommentLoading: false };

    case CLEAR_POST_COMMENTS:
      return { ...state, postComments: null };

    default:
      return state;
  }
};

export default Comment;
