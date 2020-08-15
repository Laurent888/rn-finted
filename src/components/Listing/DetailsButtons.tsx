import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import ButtonWide from '../../components/common/ButtonWide';
import { StackNavigationProp } from '@react-navigation/stack';
import { Screens } from '@routeTypes';

interface Props {
  category: [string];
  navigation: any;
}

const DetailsButtons = ({ category, navigation }: Props) => {
  return (
    <>
      <ButtonWide
        label="Category"
        desc={category[1]}
        onPress={() => navigation.push(Screens.NEWSFEED)}
      />
      <ButtonWide label="Size" desc="L / 40 /12" />
      <ButtonWide label="Colour" desc="Purple, Red" />
      <ButtonWide label="Views" desc="21" />
      <ButtonWide label="Added" desc="Today 6:40am" />
      <ButtonWide label="People Interested" desc="0" />
    </>
  );
};

export default DetailsButtons;

const s = StyleSheet.create({});
