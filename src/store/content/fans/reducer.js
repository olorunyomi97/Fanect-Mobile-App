import { stat } from 'react-native-fs';
import { GET_FEED_FANS } from './actionTypes';

const initialState = {
  loading: false,
  feed: [],
};

const AddContent = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FEED_FANS.REQUEST:
      return { ...state, loading: true };

    case GET_FEED_FANS.SUCCESS: {
      const refreshing = payload.refreshing;
      const feed = payload.feed;
      return {
        ...state,
        loading: false,
        feed: refreshing ? feed : [...state.feed, ...feed],
      };
    }

    case GET_FEED_FANS.FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default AddContent;
