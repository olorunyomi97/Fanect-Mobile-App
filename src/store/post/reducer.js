import { GET_POST } from './actionTypes';

const initialState = {
  loading: false,
  post: {},
};

const Post = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POST.REQUEST:
      return { ...state, loading: true };

    case GET_POST.SUCCESS:
      return { ...state, post: payload.post, loading: false };

    case GET_POST.FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default Post;
