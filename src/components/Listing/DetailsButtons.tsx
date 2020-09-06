import React from 'react';
import { StyleSheet } from 'react-native';

import { Screens } from '@routeTypes';
import ButtonWide from '../common/ButtonWide';
import { formatDate } from '../../lib/utils';

interface Props {
  category: [string, string];
  createdAt: string;
  navigation: any;
}

const DetailsButtons = ({ category, navigation, createdAt }: Props) => {
  const formattedDate = formatDate(createdAt);

  return (
    <>
      <ButtonWide label="Category" desc={category[1]} onPress={() => navigation.push(Screens.NEWSFEED)} />
      <ButtonWide label="Size" desc="L / 40 /12" />
      <ButtonWide label="Colour" desc="Purple, Red" />
      <ButtonWide label="Views" desc="21" />
      <ButtonWide label="Added" desc={formattedDate} />
      <ButtonWide label="People Interested" desc="0" />
    </>
  );
};

export default DetailsButtons;

const s = StyleSheet.create({});
