import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Box from '@components/common/Box';
import { searchCategories } from '@constants/categories';
import ButtonWide from '@components/common/ButtonWide';
import { capitalize } from '../../lib/utils';
import { SearchCategoriesProps } from '@constants/categories';

interface Props {
  categoryType: keyof SearchCategoriesProps;
  onPress: () => void;
}

const TabCategoryList = ({ categoryType, onPress }: Props) => {
  const categoriesToRender = searchCategories[categoryType];

  return (
    <Box>
      {categoriesToRender.values.map((item: string) => (
        <ButtonWide key={item} label={capitalize(item)} onPress={onPress} />
      ))}
    </Box>
  );
};

export default TabCategoryList;
