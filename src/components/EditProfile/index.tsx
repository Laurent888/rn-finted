import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Dimensions, TextInput } from 'react-native';
import { Formik } from 'formik';
import { Calendar } from 'react-native-calendars';
import * as Yup from 'yup';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { Avatar, Menu, Button } from 'react-native-paper';

import s from './styles';
import Box from '@components/common/Box';
import InputField from '@components/common/InputField';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonWide from '@components/common/ButtonWide';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const WIDTH = Dimensions.get('screen').width;

const initialValues = {
  username: '',
  gender: '',
  birthday: '',
  aboutme: '',
};

const validationSchema = Yup.object({
  username: Yup.string().required(),
  gender: Yup.string(),
  birthday: Yup.string(),
  aboutme: Yup.string(),
});

const GenderOptions = [
  {
    name: 'Woman',
  },
  {
    name: 'Man',
  },
  {
    name: 'Other',
  },
];

interface MenuStateProps {
  isVisible: boolean;
  options: any[];
}

interface MenuModalProps {
  isVisible: boolean;
  onDismiss: () => void;
  options: { name: string };
  onSelect: (name: string) => void;
}

interface CheckmarkProps {
  onPress: () => void;
}

interface CalendarModalProps {
  isVisible: boolean;
  onClose: (date: string) => void;
}

const ValidationCheckmark = ({ onPress }: CheckmarkProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="check" size={22} style={{ paddingHorizontal: 15 }} />
    </TouchableOpacity>
  );
};

const MenuModal = React.memo(({ isVisible, onDismiss, options, onSelect }: MenuModalProps) => {
  return (
    <Menu visible={isVisible} onDismiss={onDismiss} anchor={{ x: WIDTH / 1.5, y: 280 }}>
      {options.map((option: { name: string }) => (
        <Menu.Item
          key={option.name}
          title={option.name}
          onPress={() => {
            onSelect(option.name);
            onDismiss();
          }}
        />
      ))}
    </Menu>
  );
});

const CalendarModal = React.memo(({ isVisible, onClose }: CalendarModalProps) => {
  const [year, setYear] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);

  const handleClose = () => {
    if (day && month && year) {
      onClose(`${day}-${month}-${year}`);
    } else {
      onClose('');
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={() => onClose('')}>
      <View
        style={{
          paddingVertical: 15,
          paddingHorizontal: 15,
          backgroundColor: '#4cb6de',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TextInput
          value={day || ''}
          placeholder="DD"
          onChangeText={(t) => setDay(t)}
          keyboardType="number-pad"
          style={[s.birthdayFont, { width: 80 }]}
          placeholderTextColor="#fff"
          maxLength={2}
        />
        <Text style={s.birthdayFont}>-</Text>
        <TextInput
          value={month || ''}
          placeholder="MM"
          onChangeText={(t) => setMonth(t)}
          keyboardType="number-pad"
          style={[s.birthdayFont, { width: 80 }]}
          placeholderTextColor="#fff"
          maxLength={2}
        />
        <Text style={s.birthdayFont}>-</Text>
        <TextInput
          value={year || ''}
          placeholder="YYYY"
          onChangeText={(t) => setYear(t)}
          keyboardType="number-pad"
          style={[s.birthdayFont, { width: 80 }]}
          placeholderTextColor="#fff"
          maxLength={4}
        />
      </View>
      <View>
        <Button mode="contained" color="#fff" onPress={handleClose}>
          Validate
        </Button>
      </View>
    </Modal>
  );
});

const EditProfile = () => {
  const navigation = useNavigation<NavigationProp<any, any>>();

  const [isVisibleMenu, setIsVisibleMenu] = useState<MenuStateProps>({
    isVisible: false,
    options: [],
  });
  const [calendarVisible, setCalendarVisible] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log(values);
        actions.setSubmitting(false);
      }}
    >
      {({ values, handleSubmit, handleChange, setFieldValue }) => {
        navigation.setOptions({
          headerRight: () => <ValidationCheckmark onPress={handleSubmit} />,
        });

        console.log(isVisibleMenu);

        return (
          <>
            <ScrollView>
              <Box flexDirection="row" px={[15, 15]} py={[20, 20]} style={s.container} stretch>
                <Box mx={[0, 10]}>
                  <Avatar.Image
                    size={60}
                    source={{
                      uri: 'https://wwwwwfse.cdn.triggerfish.cloud/uploads/2018/12/panda_medium_ww191377-768x514.jpg',
                    }}
                  />
                </Box>
                <Text style={s.textSize}>Change Photo</Text>
              </Box>

              <Box px={[15, 15]} py={[17, 17]} style={s.container} stretch>
                <Text style={s.textSize}>Change email address</Text>
              </Box>

              <Box px={[15, 15]} py={[30, 10]} style={s.container} stretch>
                <InputField
                  style={s.inputContent}
                  containerStyle={s.input}
                  value={values.username}
                  name="username"
                  label="Username"
                  onChangeText={handleChange('username')}
                />

                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => {
                    setIsVisibleMenu({ isVisible: true, options: GenderOptions });
                  }}
                >
                  <Text style={[s.input, s.textSize, s.fakeInputContainer]}>{values.gender || 'Gender'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => {
                    setCalendarVisible(true);
                  }}
                >
                  <Text style={[s.input, s.textSize, s.fakeInputContainer]}>{values.birthday || 'Birthday'}</Text>
                </TouchableOpacity>

                <InputField
                  style={s.inputContent}
                  containerStyle={s.input}
                  value={values.aboutme}
                  name="aboutme"
                  label="About me"
                  multiline
                  onChangeText={handleChange('aboutme')}
                />
              </Box>

              <Box>
                <ButtonWide label="My Location" />
                <Box
                  px={[15, 15]}
                  py={[15, 15]}
                  style={s.container}
                  stretch
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Text style={s.textSize}>Show city in profile</Text>
                  <Text>Choose</Text>
                </Box>
              </Box>

              <Box style={s.container}>
                <ButtonWide label="Change password" onPress={() => console.log('Change password')} />
              </Box>

              <Box style={s.container}>
                <ButtonWide label="Delete account" onPress={() => console.log('Delete account')} />
              </Box>

              <MenuModal
                isVisible={isVisibleMenu.isVisible}
                options={isVisibleMenu.options}
                onDismiss={() => setIsVisibleMenu({ isVisible: false, options: [] })}
                onSelect={(name: string) => setFieldValue('gender', name)}
              />

              <CalendarModal
                isVisible={calendarVisible}
                onClose={(date: string) => {
                  console.log('Date :', date);
                  setCalendarVisible(false);

                  if (date !== '') {
                    setFieldValue('birthday', date);
                  }
                }}
              />
            </ScrollView>
          </>
        );
      }}
    </Formik>
  );
};

export default EditProfile;
