import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Screens, TabNavigator } from "@routeTypes";

import ButtonWide from "../../components/common/ButtonWide";
import { logout } from "../../lib/utils";

const Settings = () => {
  const n = useNavigation();

  const handleLogOut = () => {
    logout();
    n.navigate(TabNavigator.HOME_TAB);
  };

  return (
    <ScrollView>
      <View>
        <ButtonWide label="Profile details" />
        <ButtonWide label="Payments" />
        <ButtonWide label="Postage" />
        <ButtonWide label="Security" />
      </View>
      <View>
        <ButtonWide label="Log out" onPress={handleLogOut} />
      </View>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
