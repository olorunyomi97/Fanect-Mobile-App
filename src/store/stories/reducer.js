import { GET_STORIES } from './actionTypes';

const initialState = {
  loading: false,
  stories: [],
};

const Stories = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_STORIES.REQUEST:
      return { ...state, loading: true };

    case GET_STORIES.SUCCESS:
      return { ...state, loading: false, stories: payload.stories };

    case GET_STORIES.FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default Stories;
