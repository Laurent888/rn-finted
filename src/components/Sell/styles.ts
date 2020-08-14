import { StyleSheet } from 'react-native';
import theme from '@theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    marginBottom: 20,
  },
  inputContainer: {
    padding: theme.padding.large,
    paddingTop: 20,
    paddingBottom: 5,
    borderBottomColor: theme.colors.lightGrey,
    borderBottomWidth: 0.5,
  },
  label: {
    marginBottom: 10,
    color: theme.colors.mediumGrey,
  },
  inputText: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.mediumGrey,
    marginBottom: 20,
    paddingVertical: 5,
    color: theme.colors.darkGrey,
  },
  multiline: {
    height: 160,
  },
});
