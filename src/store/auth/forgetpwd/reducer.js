import { show_toast_notifications } from '../../../helpers/notifications';
import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  API_ERROR,
} from './actionTypes';

const initialState = {
  forgetSuccessMsg: null,
  forgetError: null,
  loading: false,
};

const ForgotPassword = (state = initialState, action) => {
  switch (action.type) {
    case FORGET_PASSWORD:
      state = {
        ...state,
        forgetSuccessMsg: null,
        forgetError: null,
        loading: true,
      };
      break;
    case FORGET_PASSWORD_SUCCESS:
      state = {
        ...state,
        forgetSuccessMsg: action.payload,
        loading: false,
      };
      break;
    case API_ERROR:
      show_toast_notifications(action.payload, 'error');
      state = { ...state, forgetError: action.payload, loading: false };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default ForgotPassword;
