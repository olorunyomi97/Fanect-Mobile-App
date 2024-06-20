import axios from 'axios';
import constants from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../store';

//apply base url for axios
const API_URL = constants.API_URL;

const axiosApi = axios.create({
  baseURL: API_URL,
});

const getToken = async () => {
  const token = store.getState().Login.user_data?.jwt_token;
  axiosApi.defaults.headers.common.Authorization = 'Bearer ' + token;
};

getToken();

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config });
}

export async function post(url, data, config = {}) {
  const token = await AsyncStorage.getItem('token');
  return axiosApi.post(url, data, { ...config });
}

export async function put(url, data, config = {}) {
  return axiosApi.put(url, data, { ...config });
}

export async function patch(url, data, config = {}) {
  return axiosApi.patch(url, data, { ...config });
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, { ...config });
}
