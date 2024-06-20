import { TOGGLE_LIKE } from './actionTypes';

export const toggleLike = postId => {
  return {
    type: TOGGLE_LIKE.REQUEST,
    payload: postId,
  };
};

export const toggleLikeSuccess = () => {
  return {
    type: TOGGLE_LIKE.SUCCESS,
  };
};

export const toggleLikeFailure = () => {
  return {
    type: TOGGLE_LIKE.FAILURE,
  };
};
