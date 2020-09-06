import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useApolloClient, ApolloClient } from '@apollo/client';
import theme from '@theme';
import { LOGIN, IS_LOGGED_IN } from '@constants/queries';
import { TabNavigator, Screens } from '@routeTypes';

import Button from '../components/common/Button';
import InputField from '../components/common/InputField';

const LoginScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Log in',
    });
  }, []);

  const client: ApolloClient<any> = useApolloClient();
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  const [loginUser, { loading, error }] = useMutation(LOGIN, {
    onCompleted: async ({ login }) => {
      console.log('FROM LOGIN');
      await AsyncStorage.setItem('TOKEN', login as string);
      client.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: true,
        },
      });

      navigation.navigate(TabNavigator.PROFILE_TAB, {
        screens: Screens.HOME,
      });
    },
    onError(error) {
      setErrorMsg(error.message);
      setTimeout(() => {
        setErrorMsg(null);
      }, 4000);
    },
  });

  const initialValues = {
    email: 'eric@test.com',
    password: '123123',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('This field is required'),
    password: Yup.string().min(4, 'Must be 4 characters or more').required('This field is required'),
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
          await loginUser({
            variables: { email: values.email, password: values.password },
          });
        }}
      >
        {({ handleChange, handleSubmit, values, handleBlur, errors, touched }) => {
          if (errors.email && touched.email) {
            console.log(errors);
          }
          return (
            <View style={s.form}>
              <InputField
                name="email"
                label="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                containerStyle={s.input}
              />
              <InputField
                name="password"
                label="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                containerStyle={s.input}
              />
              <Button mode="contained" onPress={handleSubmit}>
                Login
              </Button>
            </View>
          );
        }}
      </Formik>
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
    alignItems: 'center',
    marginVertical: 15,
  },
  errorMsg: {
    color: theme.colors.error,
    backgroundColor: 'rgba(147,36,36,0.20)',
    paddingVertical: 10,
    paddingHorizontal: 30,
    textTransform: 'capitalize',
  },
});
