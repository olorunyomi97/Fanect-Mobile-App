import { CHANGE_PASSWORD, API_ERROR } from './actionTypes';

const initialState = {
  loading: false,
};

const ChangePassword = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_PASSWORD.REQUEST:
      return { loading: true };

    case CHANGE_PASSWORD.SUCCESS:
    case CHANGE_PASSWORD.FAILURE:
      return { loading: false };

    default:
      return state;
  }
};

export default ChangePassword;
