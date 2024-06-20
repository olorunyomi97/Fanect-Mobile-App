import AsyncStorage from '@react-native-async-storage/async-storage';

export default function authHeader() {
  const obj = JSON.parse(AsyncStorage.getItem('authUser'));

  if (obj && obj.accessToken) {
    return { Authorization: obj.accessToken };
  } else {
    return {};
  }
}
