import { GET_FEED } from './actionTypes';

const initialState = {
  loading: false,
  feed: [],
};

const Feed = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FEED.REQUEST:
      return { ...state, loading: true };

    case GET_FEED.SUCCESS:
      return { ...state, feed: payload.feed, loading: false };

    case GET_FEED.FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default Feed;
