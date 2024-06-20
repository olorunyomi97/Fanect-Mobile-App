import { VERIFY_CHANGE_EMAIL } from './actionTypes';

const initialState = {
  loading: false,
};

const VerifyChangeEmail = (state = initialState, { type, payload }) => {
  switch (type) {
    case VERIFY_CHANGE_EMAIL.REQUEST:
      return { loading: true };

    case VERIFY_CHANGE_EMAIL.SUCCESS:
      return { loading: false };

    case VERIFY_CHANGE_EMAIL.FAILURE:
      return { loading: false };

    default:
      return state;
  }
};

export default VerifyChangeEmail;
