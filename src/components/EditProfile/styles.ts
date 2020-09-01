import { StyleSheet } from 'react-native';
import theme from '@theme';

export default StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 30,
  },
  inputContent: {
    backgroundColor: theme.colors.white,
  },
  textSize: {
    fontSize: theme.fontSize.normal,
  },
  fakeInputContainer: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#777',
    paddingHorizontal: 10,
    paddingVertical: 15,
    color: '#777',
  },
  birthdayFont: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
  },
});
