import { GET_CELEB_EARNINGS_HISTORY } from './actionTypes';

export const getCelebEarningsHistory = () => {
  return {
    type: GET_CELEB_EARNINGS_HISTORY.REQUEST,
  };
};

export const getCelebEarningsHistorySuccess = earningsHistory => {
  return {
    type: GET_CELEB_EARNINGS_HISTORY.SUCCESS,
    payload: earningsHistory,
  };
};

export const getCelebEarningsHistoryFailure = () => {
  return {
    type: GET_CELEB_EARNINGS_HISTORY.FAILURE,
  };
};
