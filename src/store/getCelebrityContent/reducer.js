import { CLEAR_CELEBRITY_CONTENT, GET_CELEBRITY_CONTENT } from './actionTypes';

const initialState = {
  loading: false,
  celebrityContent: [],
};

const CelebrityContent = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CELEBRITY_CONTENT.REQUEST:
      return { ...state, loading: true };

    case GET_CELEBRITY_CONTENT.SUCCESS:
      return { ...state, loading: false, celebrityContent: payload };

    case GET_CELEBRITY_CONTENT.FAILURE:
      return { ...state, loading: false };

    case CLEAR_CELEBRITY_CONTENT:
      return { ...state, celebrityContent: [] };

    default:
      return state;
  }
};

export default CelebrityContent;
