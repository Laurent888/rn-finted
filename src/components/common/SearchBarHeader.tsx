import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import { MaterialCommunityIcons as MIcon } from '@expo/vector-icons';
import Box from './Box';

interface SearchBarHeaderProps {
  value: string;
  onChangeText: (t: string) => void;
  onSubmitEditing: () => void;
  onBackPress?: () => void;
}

const SearchBarHeader = ({ value, onChangeText, onSubmitEditing, onBackPress }: SearchBarHeaderProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <Box
      py={[top + 10, 10]}
      px={[10, 20]}
      style={{ backgroundColor: '#fff', borderBottomColor: '#f4f4f4', borderBottomWidth: 1 }}
      flexDirection="row"
    >
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress}>
          <MIcon name="arrow-left" size={25} style={{ paddingRight: 10 }} />
        </TouchableOpacity>
      )}

      <Searchbar
        value={value}
        placeholder="Search items"
        style={{ elevation: 1, height: 40, backgroundColor: '#f4f4f4', width: `${onBackPress ? '90%' : '100%'}` }}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
    </Box>
  );
};

SearchBarHeader.defaultProps = {
  onBackPress: null,
};

export default SearchBarHeader;
