import { CREATE_REPORT } from './actionTypes';

const initialState = {
  loading: false,
};

const Report = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_REPORT.REQUEST:
      return { ...state, loading: true };

    case CREATE_REPORT.SUCCESS:
    case CREATE_REPORT.FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default Report;
