import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ItemCard from "../components/common/ItemCard";

const mockData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
];

const Newsfeed = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={() => <ItemCard navigation={navigation} />}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        columnWrapperStyle={{
          paddingVertical: 10,
          justifyContent: "space-between",
        }}
      />
    </View>
  );
};

export default Newsfeed;

const styles = StyleSheet.create({});
