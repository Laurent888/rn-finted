import React from 'react';
import { View } from 'react-native';
import ButtonWide from '../../components/common/ButtonWide';
import Box from '@components/common/Box';

interface Props {
  price: string;
}

const Postage = ({ price }: Props) => {
  return (
    <Box py={[40, 40]}>
      <ButtonWide label="Postage" desc={price} />
    </Box>
  );
};

export default Postage;
