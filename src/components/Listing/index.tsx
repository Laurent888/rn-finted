import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

import theme from "@theme";
import ListingHeader from "./ListingHeader";
import ItemDescription from "./ItemDescription";
import DetailsButtons from "./DetailsButtons";
import Postage from "./Postage";

const Listing = () => {
  return (
    <ScrollView>
      <View style={s.imgContainer}>
        <Image
          style={s.img}
          source={{
            uri:
              "https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
          }}
        />
      </View>
      <View style={s.contentContainer}>
        <View style={s.userInfo}>
          <View>
            <Text>Avatar</Text>
          </View>
          <View>
            <Text>Text</Text>
            <Text>Stars</Text>
          </View>
        </View>

        <ListingHeader />
        <ItemDescription />
        <DetailsButtons />

        <Postage price="23e" />
      </View>
    </ScrollView>
  );
};

export default Listing;

const s = StyleSheet.create({
  imgContainer: {
    width: "100%",
    height: 400,
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentContainer: {},
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "lightblue",
    paddingVertical: 10,
    paddingHorizontal: theme.padding.container,
  },
});
