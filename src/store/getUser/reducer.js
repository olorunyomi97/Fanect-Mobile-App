import { GET_USER } from './actionTypes';

const initialState = {
  loading: false,
  user: {},
};

const GetUser = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER.REQUEST:
      return { ...state, loading: true };

    case GET_USER.SUCCESS:
      return { ...state, loading: false, user: payload };

    case GET_USER.FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default GetUser;
