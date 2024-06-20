import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { accessToken, currUser } from './jwt-token-access/accessToken';
import constants from './constants';
import { readData } from './async_storage_helper';
import store from '../store';

//apply base url for axios
const API_URL = constants.API_URL;

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.headers.common.Authorization =
  'Bearer ' + store.getState().Login.user_data?.jwt_token;

axiosApi.interceptors.request.use(
  response => response,
  error => Promise.reject(error),
);

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, data, { ...config })
    .then(response => response.data);
}

//For special cases multipart where axios gives much issues and limitations
export async function postWithFetch(url, data, config = {}) {
  const token = await readData('auth_user');
  let myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + token.jwt_token);
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow',
  };

  return fetch(API_URL + url, requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => error);
}

export async function put(url, data, config = {}) {
  return axiosApi.put(url, data, { ...config }).then(response => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data);
}
