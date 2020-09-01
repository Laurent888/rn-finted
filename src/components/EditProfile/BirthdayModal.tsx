import React, { useRef, useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-paper';

import s from './styles';

interface BirthdayModalProps {
  isVisible: boolean;
  onClose: (date: string) => void;
}

const BirthdayModal = React.memo(({ isVisible, onClose }: BirthdayModalProps) => {
  const monthRef = useRef(null);
  const yearRef = useRef(null);

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

  const changeFocus = (text: string, nextFocusRef) => {
    if (text.length === 2) {
      nextFocusRef.current.focus();
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
          onChangeText={(t) => {
            setDay(t);
            changeFocus(t, monthRef);
          }}
          keyboardType="number-pad"
          style={[s.birthdayFont, { width: 80 }]}
          placeholderTextColor="#fff"
          maxLength={2}
        />
        <Text style={s.birthdayFont}>-</Text>
        <TextInput
          value={month || ''}
          placeholder="MM"
          onChangeText={(t) => {
            setMonth(t);
            changeFocus(t, yearRef);
          }}
          keyboardType="number-pad"
          style={[s.birthdayFont, { width: 80 }]}
          placeholderTextColor="#fff"
          maxLength={2}
          ref={monthRef}
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
          ref={yearRef}
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

export default BirthdayModal;
