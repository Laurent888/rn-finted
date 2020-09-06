import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

import theme from '@theme';
import { categories } from '../../constant/categories';

import ButtonWide from '../common/ButtonWide';

interface Props {
  isVisible: boolean;
  cancel: () => void;
  onConfirm: (cateogry) => void;
}

const { width } = Dimensions.get('screen');

const ModalCategory = ({ isVisible, cancel, onConfirm }: Props) => {
  const [step, setStep] = useState(0);
  const [categoryArray, setCategoryArray] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current !== null) {
      scrollRef.current.scrollTo({ x: step * width });
    }

    if (categoryArray.length === 2) {
      onConfirm(categoryArray);
      setCategoryArray([]);
      setTimeout(() => {
        setStep(0);
      }, 200);
    }

    return () => {
      console.log('CLEAN UP');
    };
  }, [scrollRef.current, categoryArray]);

  const nextStep = () => {
    if (step === 0) {
      setStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (step === 0) {
      setCategoryArray([]);
      setStep(0);
      cancel();
    }
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const renderCategories = () =>
    Object.keys(categories).map((c) => (
      <ButtonWide
        key={c}
        label={c}
        onPress={() => {
          setCategoryArray([c]);
          nextStep();
        }}
      />
    ));

  const renderSubCategories = (category: string) => {
    return categories[category].values.map((subCategory) => (
      <ButtonWide
        key={subCategory}
        label={subCategory}
        onPress={() => {
          if (categoryArray.length <= 1) {
            setCategoryArray((p) => [...p, subCategory]);
          }

          nextStep();
        }}
      />
    ));
  };

  return (
    <Modal
      coverScreen
      style={{
        alignSelf: 'center',
        justifyContent: 'flex-start',
        width: theme.dimensions.width,
      }}
      backdropColor="#fff"
      backdropOpacity={1}
      isVisible={isVisible}
      animationIn="slideInRight"
      animationOut="fadeOut"
    >
      <ScrollView horizontal pagingEnabled ref={scrollRef}>
        <View style={{ flex: 1 }}>
          <View style={s.cancel}>
            <TouchableOpacity onPress={() => previousStep()}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
          {renderCategories()}
        </View>
        <View style={{ flex: 1 }}>
          <View style={s.cancel}>
            <TouchableOpacity onPress={() => previousStep()}>
              <Text>Back</Text>
            </TouchableOpacity>
          </View>
          {categoryArray.length > 0 && renderSubCategories(categoryArray[0])}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ModalCategory;

const s = StyleSheet.create({
  cancel: {
    paddingHorizontal: theme.padding.large,
    paddingVertical: theme.padding.medium,
  },
});
