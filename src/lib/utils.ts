import { AsyncStorage } from 'react-native';
import dayjs from 'dayjs';

export const logout = async () => {
  await AsyncStorage.removeItem('TOKEN');
  console.log('Token removed, in Logout');
};

export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatDate = (createdAt) => {
  const currentDate = new Date();

  const testYesterdayDate = dayjs(currentDate).subtract(1, 'day').format('DDMMYY');
  const testCurrentDate = dayjs(currentDate).format('DDMMYY');
  const testCreatedDate = dayjs(createdAt).format('DDMMYY');

  if (testCurrentDate === testCreatedDate) {
    return `Today ${dayjs(createdAt).format('HH:mm')}`;
  } else if (testCreatedDate === testYesterdayDate) {
    return `Yesterday ${dayjs(createdAt).format('HH:mm')}`;
  } else {
    return dayjs(createdAt).format('DD/MM HH:mm');
  }
};
