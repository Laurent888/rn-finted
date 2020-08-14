import { AsyncStorage } from 'react-native';

export const logout = async () => {
  await AsyncStorage.removeItem('TOKEN');
};

export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
