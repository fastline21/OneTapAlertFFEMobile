import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const getToken = async (key) => {
  return await SecureStore.getItemAsync(key);
};

export const removeToken = async (key, options = {}) => {
  return await SecureStore.deleteItemAsync(key, options);
};

export const setToken = async (key) => {
  axios.defaults.headers.common['x-auth-token'] = await getToken(key);
};

export const storeToken = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};
