import { TOGGLE_SETTING } from './actionTypes';

export const toggleSetting = setting => {
  return {
    type: TOGGLE_SETTING.REQUEST,
    payload: setting,
  };
};
