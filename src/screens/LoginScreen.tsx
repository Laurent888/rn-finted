import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Screens } from "@routeTypes";

import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import theme from "@theme";

const LoginScreen = ({ navigation }) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("This field is required"),
    password: Yup.string()
      .min(4, "Must be 4 characters or more")
      .required("This field is required"),
  });

  return (
    <View style={s.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          handleBlur,
          errors,
          touched,
        }) => {
          if (errors.email && touched.email) {
            console.log(errors);
          }
          return (
            <View style={s.form}>
              <InputField
                name="email"
                label="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                containerStyle={s.input}
              />
              <InputField
                name="password"
                label="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                containerStyle={s.input}
              />
              <Button mode="contained" onPress={handleSubmit}>
                Login
              </Button>
            </View>
          );
        }}
      </Formik>

      <Button onPress={() => navigation.navigate(Screens.REGISTER)}>
        Register
      </Button>
    </View>
  );
};

export default LoginScreen;

const s = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  form: {
    padding: theme.padding.medium,
    backgroundColor: theme.colors.white,
  },
  input: {
    marginBottom: 20,
  },
});
