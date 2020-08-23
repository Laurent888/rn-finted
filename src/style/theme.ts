import { DefaultTheme } from 'react-native-paper';
import { Dimensions } from 'react-native';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      white: string;
      lightGrey: string;
      mediumGrey: string;
      darkGrey: string;
      black: string;
      primary: string;
      success: string;
    }

    interface Theme {
      dimensions: {
        width: number;
        height: number;
      };
      padding: {
        small: number;
        medium: number;
        large: number;
        container: number;
      };
      fontSize: {
        caption: number;
        normal: number;
        large: number;
        title: number;
      };
    }
  }
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    white: '#fff',
    primary: '#e6b87f',
    lightGrey: '#ccc',
    mediumGrey: '#aaa',
    darkGrey: '#575757',
    black: '#333',
    success: '#1aa32c',
  },
  dimensions: {
    width: WIDTH,
    height: HEIGHT,
  },
  fontSize: {
    caption: 12,
    normal: 16,
    large: 20,
    title: 24,
  },
  padding: {
    small: 5,
    medium: 10,
    large: 15,
    container: 20,
  },
};

export default theme;
