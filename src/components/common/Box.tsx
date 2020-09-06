import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type AlignmentType = 'flex-start' | 'flex-end' | 'center' | 'stretch';
type JustifyType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | undefined;

type ArrayMargin = [number, number];

interface BoxProps {
  children: React.ReactNode;
  mx?: ArrayMargin;
  my?: ArrayMargin;
  px?: ArrayMargin;
  py?: ArrayMargin;
  justifyContent?: JustifyType;
  alignItems?: AlignmentType;
  flexDirection?: 'row' | 'column';
  style?: ViewStyle;
  stretch?: boolean;
}

const getPaddings = (px: ArrayMargin, py: ArrayMargin) => {
  return {
    paddingLeft: px[0] || 0,
    paddingRight: px[1] || 0,
    paddingTop: py[0] || 0,
    paddingBottom: py[1] || 0,
  };
};

const getMargins = (mx: ArrayMargin, my: ArrayMargin) => {
  return {
    marginLeft: mx[0] || 0,
    marginRight: mx[1] || 0,
    marginTop: my[0] || 0,
    marginBottom: my[1] || 0,
  };
};

const getFlexType = (
  flexDirection: 'row' | 'column',
  justifyContent: JustifyType,
  alignItems: AlignmentType
): ViewStyle => {
  return {
    flexDirection,
    justifyContent,
    alignItems: flexDirection === 'row' ? 'center' : alignItems,
  };
};

const s = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
});

const Box = ({
  mx = [0, 0],
  my = [0, 0],
  px = [0, 0],
  py = [0, 0],
  flexDirection = 'column',
  justifyContent = 'center',
  alignItems = 'flex-start',
  style,
  children,
  stretch,
}: BoxProps) => {
  return (
    <View
      style={[
        s.container,
        { width: stretch ? '100%' : 'auto' },
        getPaddings(px, py),
        getMargins(mx, my),
        getFlexType(flexDirection, justifyContent, alignItems),
        { ...style },
      ]}
    >
      {children}
    </View>
  );
};

Box.defaultProps = {
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  mx: [0, 0],
  my: [0, 0],
  px: [0, 0],
  py: [0, 0],
  style: null,
};

export default Box;
