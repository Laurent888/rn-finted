import React, { useState } from "react";
import { TextInput, View, Text, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import { styles as s } from "./styles";
import Button from "../../components/common/Button";
import ButtonWide from "../../components/common/ButtonWide";
import ModalPrice from "./ModalPrice";
import ModalCategory from "./ModalCategory";

const Sell = () => {
  const [modalPriceOpen, setModalPriceOpen] = useState(false);
  const [modalCateOpen, setModalCateOpen] = useState(false);

  const initialValues = {
    title: "",
    description: "",
    price: null,
    category: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(3, "Minimum 6 characters"),
    description: Yup.string().min(8, "Minimun 8 characters"),
    price: Yup.number().required(),
    category: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleBlur, handleChange, handleSubmit, values, setFieldValue }) => {
        return (
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <View style={s.container}>
              <View style={s.inputContainer}>
                <Text style={s.label}>Title</Text>
                <TextInput
                  name="title"
                  label="Title"
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                  style={s.inputText}
                />
              </View>

              <View style={s.inputContainer}>
                <Text style={s.label}>Description</Text>
                <TextInput
                  name="description"
                  label="Description"
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                  multiline
                  style={[s.inputText, s.multiline]}
                />
              </View>
            </View>

            <View style={s.container}>
              <ButtonWide
                label="Category"
                onPress={() => setModalCateOpen(true)}
              />
              <ButtonWide label="Brand" onPress={() => console.log("")} />
              <ButtonWide label="Condition" onPress={() => console.log("")} />
            </View>

            <View style={s.container}>
              <ButtonWide
                label="Price"
                desc={values.price ? `${values.price} €` : ""}
                onPress={() => setModalPriceOpen(true)}
              />
            </View>

            <View style={{ alignItems: "center" }}>
              <Button mode="contained" onPress={handleSubmit}>
                Create Listing
              </Button>
            </View>

            {/* MODALS  */}

            <ModalPrice
              s={s}
              values={values}
              onPress={(price: string) => {
                setFieldValue("price", price);
                setModalPriceOpen(false);
              }}
              isVisible={modalPriceOpen}
            />

            <ModalCategory
              isVisible={modalCateOpen}
              cancel={() => setModalCateOpen(false)}
            />
          </ScrollView>
        );
      }}
    </Formik>
  );
};

export default Sell;
