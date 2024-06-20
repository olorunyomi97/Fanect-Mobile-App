import { COMPLETE_TRANSACTION } from './actionTypes';

export const completeTransaction = (paymentDetails, cb) => {
  return {
    type: COMPLETE_TRANSACTION.REQUEST,
    payload: { paymentDetails, cb },
  };
};

export const completeTransactionSuccess = () => {
  return {
    type: COMPLETE_TRANSACTION.SUCCESS,
  };
};

export const completeTransactionFailure = () => {
  return {
    type: COMPLETE_TRANSACTION.FAILURE,
  };
};
