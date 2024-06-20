import { INITIATE_TRANSACTION, RESET_TRANSACTION } from './actionTypes';

export const initiateTransaction = (initiateTransactionDetail, cb) => {
  return {
    type: INITIATE_TRANSACTION.REQUEST,
    payload: { initiateTransactionDetail, cb },
  };
};

export const initiateTransactionSuccess = transactionDetail => {
  return {
    type: INITIATE_TRANSACTION.SUCCESS,
    payload: transactionDetail,
  };
};

export const initiateTransactionFailure = () => {
  return {
    type: INITIATE_TRANSACTION.FAILURE,
  };
};

export const resetTransaction = () => {
  return {
    type: RESET_TRANSACTION,
  };
};
