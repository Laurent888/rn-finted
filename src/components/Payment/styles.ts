import { StyleSheet } from 'react-native';
import theme from '@theme';

export default StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.colors.white,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  borderBottomSection: {
    borderBottomColor: theme.colors.lightGrey,
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: theme.fontSize.normal,
    fontWeight: '600',
    color: theme.colors.mediumGrey,
  },
  text: {
    fontSize: theme.fontSize.normal,
  },
  mediumGrey: {
    color: theme.colors.mediumGrey,
  },
  caption: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.mediumGrey,
    paddingVertical: 6,
  },

  // Shipping Option
  shippingOptionRow: {
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.lightGrey,
  },
  shippingLogo: {
    width: 50,
    height: 35,
    marginRight: 10,
    borderRadius: 5,
  },
  shippingPrice: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.mediumGrey,
  },

  // Confirmation Box
  paymentConfirmationContainer: {
    backgroundColor: theme.colors.white,
    borderTopColor: theme.colors.lightGrey,
    borderTopWidth: 0.5,
    elevation: 5,
  },
});
