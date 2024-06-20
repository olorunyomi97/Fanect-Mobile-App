import { generateActions } from '../../../helpers/generateActions';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const API_ERROR = 'LOGIN_API_ERROR';

export const VERIFY_LOGIN = 'VERIFY_LOGIN';
export const VERIFY_USER_LOGIN = 'VERIFY_USER_LOGIN';

export const UPDATE_USER_DATA = generateActions('UPDATE_USER_DATA');
