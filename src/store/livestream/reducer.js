import {
  START_LIVE_STREAM,
  START_LIVE_STREAM_SUCCESS,
  API_ERROR,
  END_LIVE_STREAM,
} from './actionTypes';

const initialState = {
  error: '',
  apiError: null,
  loading: false,
  streams: null,
};

const Livestream = (state = initialState, action) => {
  switch (action.type) {
    case START_LIVE_STREAM:
      state = {
        ...state,
        loading: true,
        error: '',
      };
      break;

    case END_LIVE_STREAM:
      state = {
        ...state,
        loading: true,
        error: '',
      };
      break;

    case START_LIVE_STREAM_SUCCESS:
      state = {
        ...state,
        streams: payload.streams,
        loading: false,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};
export default Livestream;
