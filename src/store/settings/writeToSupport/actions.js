import { WRITE_TO_SUPPORT } from './actionTypes';

export const writeToSupport = support_detail => {
  return {
    type: WRITE_TO_SUPPORT.REQUEST,
    payload: support_detail,
  };
};

export const writeToSupportSuccess = () => {
  return {
    type: WRITE_TO_SUPPORT.SUCCESS,
  };
};

export const writeToSupportFailure = () => {
  return {
    type: WRITE_TO_SUPPORT.FAILURE,
  };
};
