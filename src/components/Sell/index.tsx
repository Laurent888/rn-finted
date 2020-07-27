import React, { useState } from "react";
import { TextInput, View, Text, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import { useMutation, useQuery } from "@apollo/client";
import { CREATE_LISTING, GET_ME, GET_CURRENT_USER } from "@constants/queries";

import { styles as s } from "./styles";
import Button from "../../components/common/Button";
import ButtonWide from "../../components/common/ButtonWide";
import ModalPrice from "./ModalPrice";
import ModalCategory from "./ModalCategory";
import AddImageModal from "./AddImageModal";
import AddImagePreview from "../../components/common/AddImagePreview";
import ImagesPreviewSection from "./ImagesPreviewSection";

const maxImage = 3;

const Sell = () => {
  const [modalPriceOpen, setModalPriceOpen] = useState(false);
  const [modalCateOpen, setModalCateOpen] = useState(false);
  const [modalImage, setModalImage] = useState(false);
  const [images, setImages] = useState<string[]>(["1", "2"]);

  const [createListing, { loading }] = useMutation(CREATE_LISTING, {
    onCompleted: (resCompleted) => {
      console.log(resCompleted);
    },
  });
  const { data } = useQuery(GET_CURRENT_USER);

  const initialValues = {
    title: "",
    description: "",
    price: "",
    images: [],
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(3, "Minimum 6 characters"),
    description: Yup.string().min(8, "Minimun 8 characters"),
    price: Yup.number().moreThan(1, "Must be superior thant 1 euro").required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const userId = data.getCurrentUser.id;

        if (!userId) {
          setSubmitting(false);
          return;
        }

        await createListing({
          variables: {
            newListing: {
              title: values.title,
              description: values.description,
              price: parseInt(values.price) as number,
              owner: userId,
            },
          },
        });
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ handleBlur, handleChange, handleSubmit, values, setFieldValue }) => {
        const addImage = (imgUrl: string) => {
          console.log(imgUrl);
          if (images.length <= 2 && imgUrl.trim() !== "") {
            setImages((s) => [...s, imgUrl]);
          }

          setModalImage(false);
        };

        return (
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <AddImageModal isVisible={modalImage} onPress={addImage} />

            <View style={s.container}>
              <View style={s.inputContainer}>
                <Text style={s.label}>Images</Text>
                <ImagesPreviewSection
                  maxImages={maxImage}
                  images={images}
                  onPress={() => setModalImage(true)}
                />
                <Button onPress={() => setImages([])}>Delete</Button>
              </View>
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
