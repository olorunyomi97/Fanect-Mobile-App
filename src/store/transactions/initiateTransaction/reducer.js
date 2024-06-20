import { INITIATE_TRANSACTION, RESET_TRANSACTION } from './actionTypes';

const initialState = {
  loading: false,
  transactionDetail: null,
};

const InitiateTransactionReducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case INITIATE_TRANSACTION.REQUEST:
      return { ...state, loading: true };

    case INITIATE_TRANSACTION.SUCCESS:
      return { ...state, loading: false, transactionDetail: payload };

    case INITIATE_TRANSACTION.FAILURE:
      return { ...state, loading: false };

    case RESET_TRANSACTION:
      return { ...state, transactionDetail: null };

    default:
      return state;
  }
};

export default InitiateTransactionReducer;
