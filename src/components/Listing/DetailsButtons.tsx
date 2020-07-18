import React from "react";
import { StyleSheet } from "react-native";

import ButtonWide from "../../components/common/ButtonWide";

const DetailsButtons = () => {
  return (
    <>
      <ButtonWide
        label="Category"
        desc="Other clothing"
        onPress={() => console.log("Hello")}
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
