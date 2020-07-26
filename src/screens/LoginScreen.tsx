import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Screens, TabNavigator } from "@routeTypes";
import { useMutation } from "@apollo/client";
import theme from "@theme";
import { LOGIN } from "@constants/queries";

import { isLoggedInVar } from "../lib/apollo";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";

const LoginScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: "Log in",
    });
  }, []);

  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  const [loginUser, { loading, error }] = useMutation(LOGIN, {
    onCompleted: async ({ login }) => {
      await AsyncStorage.setItem("TOKEN", login as string);
      isLoggedInVar(true);
      navigation.goBack();
    },
    onError(error) {
      setErrorMsg(error.message);

      setTimeout(() => {
        setErrorMsg(null);
      }, 4000);
    },
  });

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
      {errorMsg && (
        <View style={s.errorContainer}>
          <Text style={s.errorMsg}>{errorMsg}</Text>
        </View>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const token = await loginUser({
            variables: { email: values.email, password: values.password },
          });

          console.log(token, "IN LOGIN PAGE");
        }}
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
  errorContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  errorMsg: {
    color: theme.colors.error,
    backgroundColor: "rgba(147,36,36,0.20)",
    paddingVertical: 10,
    paddingHorizontal: 30,
    textTransform: "capitalize",
  },
});
