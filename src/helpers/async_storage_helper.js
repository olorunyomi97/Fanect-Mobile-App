import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, data) => {
  AsyncStorage.setItem(key, JSON.stringify(data));
};

export const readData = async key => {
  try {
    return JSON.parse(await AsyncStorage.getItem(key));
  } catch (e) {
    throw e;
  }
};
