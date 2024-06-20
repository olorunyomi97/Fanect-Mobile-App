import { COMPLETE_TRANSACTION } from './actionTypes';

const initialState = {
  loading: false,
};

const CompleteTransactionReducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case COMPLETE_TRANSACTION.REQUEST:
      return { ...state, loading: true };

    case COMPLETE_TRANSACTION.SUCCESS:
    case COMPLETE_TRANSACTION.FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default CompleteTransactionReducer;
