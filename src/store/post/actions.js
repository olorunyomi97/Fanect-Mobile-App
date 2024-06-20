import { GET_POST } from './actionTypes';

export const getPost = post_id => {
  return {
    type: GET_POST.REQUEST,
    payload: post_id,
  };
};

export const getPostSuccess = (post, refreshing) => {
  return {
    type: GET_POST.SUCCESS,
    payload: { post, refreshing },
  };
};

export const getPostFailure = () => {
  return {
    type: GET_POST.FAILURE,
  };
};
