import { StyleSheet, Platform, StatusBar } from 'react-native';

export const safeAreaView = StyleSheet.create({
  safeAreaAndroid: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
