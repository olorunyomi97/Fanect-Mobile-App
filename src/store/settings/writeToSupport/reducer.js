import { WRITE_TO_SUPPORT } from './actionTypes';

const initialState = {
  loading: false,
};

const WriteToSupport = (state = initialState, { type, payload }) => {
  switch (type) {
    case WRITE_TO_SUPPORT.REQUEST:
      return { loading: true };

    case WRITE_TO_SUPPORT.SUCCESS:
    case WRITE_TO_SUPPORT.FAILURE:
      return { loading: false };

    default:
      return state;
  }
};

export default WriteToSupport;
