import { GET_PAYMENT_HISTORY } from './actionTypes';

export const getPaymentHistory = () => {
  return {
    type: GET_PAYMENT_HISTORY.REQUEST,
  };
};

export const getPaymentHistorySuccess = paymentHistory => {
  return {
    type: GET_PAYMENT_HISTORY.SUCCESS,
    payload: paymentHistory,
  };
};

export const getPaymentHistoryFailure = () => {
  return {
    type: GET_PAYMENT_HISTORY.FAILURE,
  };
};
