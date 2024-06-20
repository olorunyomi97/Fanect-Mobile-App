import { GET_USER_CONTENT } from './actionTypes';

const initialState = {
  loading: true,
  userContent: [],
};

const UserContentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_CONTENT.REQUEST:
      return { ...state, loading: true };

    case GET_USER_CONTENT.SUCCESS:
      return { ...state, loading: false, userContent: payload };

    case GET_USER_CONTENT.FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default UserContentReducer;
