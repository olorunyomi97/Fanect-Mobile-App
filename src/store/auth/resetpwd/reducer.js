import { show_toast_notifications } from '../../../helpers/notifications';
import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  API_ERROR,
} from './actionTypes';

const initialState = {
  resetSuccessMsg: null,
  resetError: null,
  loading: false,
  success_modal: false,
};

const ResetPassword = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD:
      state = {
        ...state,
        resetSuccessMsg: null,
        resetError: null,
        loading: true,
        success_modal: false,
      };
      break;
    case RESET_PASSWORD_SUCCESS:
      state = {
        ...state,
        resetSuccessMsg: action.payload,
        loading: false,
        success_modal: true,
      };
      break;
    case API_ERROR:
      show_toast_notifications(action.payload, 'error');
      state = {
        ...state,
        resetError: action.payload,
        loading: false,
        success_modal: false,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default ResetPassword;
