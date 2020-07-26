import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import theme from "@theme";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { safeAreaView } from "../lib/safeAreaView";
import { Screens } from "@routeTypes";

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    width: theme.dimensions.width,
    height: 250,
    paddingVertical: 30,
    position: "relative",
    marginTop: 40,
  },
  image: {
    width: "35%",
    height: "60%",
    position: "absolute",
  },
  i1: {
    top: "10%",
    left: "12%",
  },
  i2: {
    top: "55%",
    left: "32%",
  },
  i3: {
    top: "10%",
    left: "52%",
  },
  headerTop: {
    marginVertical: 20,
    paddingHorizontal: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skip: {
    padding: 10,
  },
  header: {
    fontSize: theme.fontSize.large,
    fontWeight: "600",
    color: theme.colors.black,
    letterSpacing: 1,
    textAlign: "center",
    lineHeight: 25,
  },
  headerContainer: {
    width: "60%",
    marginBottom: 30,
  },
  btnContainer: {
    width: 200,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  bar: {
    height: 30,
    width: 1,
    backgroundColor: theme.colors.lightGrey,
  },
});

const imageUrl = {
  i1:
    "https://images.unsplash.com/photo-1558769132-92e717d613cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
  i2:
    "https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  i3:
    "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
};

const LoginHome = () => {
  const n = useNavigation();
  return (
    <SafeAreaView style={[s.container, safeAreaView.safeAreaAndroid]}>
      <View style={s.headerTop}>
        <Text>Choose Language</Text>
        <TouchableWithoutFeedback onPress={() => n.goBack()} style={s.skip}>
          <Text>Skip</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={s.imageContainer}>
        <Image source={{ uri: imageUrl.i1 }} style={[s.image, s.i1]} />
        <Image source={{ uri: imageUrl.i2 }} style={[s.image, s.i2]} />
        <Image source={{ uri: imageUrl.i3 }} style={[s.image, s.i3]} />
      </View>

      <View style={s.headerContainer}>
        <Text style={s.header}>Sell pre-loved clothes completely free</Text>
      </View>

      <View style={s.btnContainer}>
        <TouchableWithoutFeedback onPress={() => n.navigate(Screens.LOGIN)}>
          <Text>Sign in</Text>
        </TouchableWithoutFeedback>

        <View style={s.bar} />

        <TouchableWithoutFeedback onPress={() => n.navigate(Screens.REGISTER)}>
          <Text>Register</Text>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

export default LoginHome;
