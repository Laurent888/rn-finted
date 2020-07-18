import React from "react";
import { View } from "react-native";
import ButtonWide from "../../components/common/ButtonWide";

interface Props {
  price: string;
}

const Postage = ({ price }: Props) => {
  return (
    <View style={{ marginVertical: 40 }}>
      <ButtonWide label="Postage" desc={price} />
    </View>
  );
};

export default Postage;
