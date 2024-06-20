import { TOGGLE_LIKE } from './actionTypes';

const initialState = {
  loading: false,
};

const ToggleLike = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_LIKE.REQUEST:
      return { loading: true };

    case TOGGLE_LIKE.SUCCESS:
      return { loading: false };

    case TOGGLE_LIKE.FAILURE:
      return { loading: false };

    default:
      return state;
  }
};

export default ToggleLike;
