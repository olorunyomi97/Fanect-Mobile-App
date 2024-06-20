import AsyncStorage from '@react-native-async-storage/async-storage';

export const authUser = async () => {
  return await AsyncStorage.getItem('auth_user');
};

export const clearAsync = async () => {
  console.log('here oo');
  return await AsyncStorage.clear();
};

export const accessToken = async () => {
  return (await authUser) ? await authUser.jwt_token : '';
};

export async function currUser() {
  return (await authUser) ? authUser.user : {};
}
