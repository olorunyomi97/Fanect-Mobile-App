import { GET_CELEB_EARNINGS_HISTORY } from './actionTypes';

const initialState = {
  loading: false,
  earningsHistory: [],
};

const EarningsHistory = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CELEB_EARNINGS_HISTORY.REQUEST:
      return { ...state, loading: true };

    case GET_CELEB_EARNINGS_HISTORY.SUCCESS:
      return { loading: false, earningsHistory: payload };

    case GET_CELEB_EARNINGS_HISTORY.FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default EarningsHistory;
