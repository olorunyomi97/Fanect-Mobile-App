import { POST_STORY, API_ERROR } from './actionTypes';

const initialState = {
  error: '',
  apiError: null,
  loading: false,
};

const story = (state = initialState, action) => {
  switch (action.type) {
    case POST_STORY:
      state = {
        ...state,
        loading: true,
        error: '',
      };
      break;
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};
export default story;
