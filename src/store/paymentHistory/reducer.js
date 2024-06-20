import { GET_PAYMENT_HISTORY } from './actionTypes';

const initialState = {
  loading: false,
  paymentHistory: null,
};

const PaymentHistory = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PAYMENT_HISTORY.REQUEST:
      return { ...state, loading: true };

    case GET_PAYMENT_HISTORY.SUCCESS:
      return { loading: false, paymentHistory: payload };

    case GET_PAYMENT_HISTORY.FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default PaymentHistory;
