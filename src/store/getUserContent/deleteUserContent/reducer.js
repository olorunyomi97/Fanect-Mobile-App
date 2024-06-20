import { DELETE_USER_CONTENT } from './actionTypes';

const initialState = {
  loading: false,
};

const DeleteContentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DELETE_USER_CONTENT.REQUEST:
      return { ...state, loading: true };

    case DELETE_USER_CONTENT.SUCCESS:
    case DELETE_USER_CONTENT.FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default DeleteContentReducer;
