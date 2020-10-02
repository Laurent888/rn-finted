import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import theme from '@theme';
import { ActivityIndicator } from 'react-native-paper';
import { Screens } from '@routeTypes';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '@constants/queries';

import InputField from './common/InputField';
import Button from './common/Button';
import { captureErrors } from 'lib/utils';

const initialValues = {
  username: '',
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  username: Yup.string().min(4, 'Minimum 4 characters').required('This field is required'),
  email: Yup.string().email('Invalid email address').required('This field is required'),
  password: Yup.string().min(4, 'Must be 4 characters or more').required('This field is required'),
});

const Register = () => {
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const n = useNavigation();

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onError(error) {
      setErrorMsg(error.message);
      setTimeout(() => {
        setErrorMsg(null);
      }, 4000);
    },
    onCompleted: async ({ createUser }) => {
      try {
        await AsyncStorage.setItem('TOKEN', createUser);

        n.navigate(Screens.LOGIN);
      } catch (error) {
        captureErrors('Register user', error);
      }
    },
  });

  useEffect(() => {
    n.setOptions({
      title: 'Register',
    });
  }, []);

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: theme.colors.white }}>
      {errorMsg && (
        <View style={s.errorContainer}>
          <Text style={s.errorMsg}>{errorMsg}</Text>
        </View>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await createUser({
            variables: {
              username: values.username,
              email: values.email,
              password: values.password,
            },
          });

          setSubmitting(false);
        }}
      >
        {({ handleChange, handleSubmit, values, handleBlur }) => {
          return (
            <View style={s.form}>
              <InputField
                name="username"
                label="Username"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                containerStyle={s.input}
              />

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
              <Button mode="contained" onPress={handleSubmit} disabled={loading}>
                Register
              </Button>
              {loading && <ActivityIndicator style={{ marginVertical: 10 }} />}
            </View>
          );
        }}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default Register;

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
