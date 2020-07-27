import React from "react";
import { StyleSheet, View, FlatList, AsyncStorage } from "react-native";

import ItemCard from "../components/common/ItemCard";
import { useQuery, useApolloClient, ApolloClient } from "@apollo/client";
import {
  GET_ME,
  GET_USERS,
  IS_LOGGED_IN,
  CART_ITEMS,
  GET_CURRENT_USER,
} from "../constant/queries";
import { Button } from "react-native-paper";
import { logout } from "../lib/utils";
import { useLinkProps, StackActions } from "@react-navigation/native";
import { Screens, TabNavigator } from "@routeTypes";

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
  const client: ApolloClient<any> = useApolloClient();
  const { data, loading, error } = useQuery(IS_LOGGED_IN);
  const { data: data1 } = useQuery(GET_CURRENT_USER);
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Button
        onPress={async () => {
          const res = await AsyncStorage.getItem("TOKEN");
          console.log(data, res, "TEST");
          console.log(data1, "USER IN CACHE");
        }}
      >
        Test
      </Button>
      <Button
        onPress={() => {
          logout();
          client.writeQuery({
            query: IS_LOGGED_IN,
            data: {
              isLoggedIn: false,
            },
          });
        }}
      >
        DELETE CACHE
      </Button>

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
