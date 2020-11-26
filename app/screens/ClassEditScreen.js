import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  Alert
} from "react-native";
import * as Yup from "yup";
import AppButton from "../components/AppButton";
import firebase from "../config/firebaseConfig";
import AddClassScreen from "./AddClassScreen";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton
} from "../components/forms";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  batch: Yup.string().required().min(4).label("Batch"),
  programme: Yup.string().required().min(1).max(6).label("Programme"),
  section: Yup.string().required().min(1).max(2).label("Section")
});

function ClassEditScreen(props) {
  // const firestore_ref=firebase.firestore()
  const firestore_ref = firebase.firestore().collection("Class");
  const [batchs, setBatchs] = useState("");

  const [programme, setProgramme] = useState("");

  const [section, setSection] = useState("");

  const addClass = () => {
    // const setClassAsync=async(cLData)=>
    // {
    //   AsyncStorage.setItem('class',JSON.stringify(cLData));
    // }

    console.log("add pressed");
    if (batchs === "" || programme === "" || section === "") {
      console.log("Enter Valid details");
      Alert.alert("Enter Valid details");
    } else {
      const datas = firebase.firestore();

      const batch = datas.batch();
      const array = [
        {
          batchs: batchs,
          programme: programme,
          section: section
        }
      ];

      array.forEach((item) => {
        const collectionRef = datas.collection("Class").doc();
        batch.set(collectionRef, item);
        // setClassAsync(item)
      });

      const result = batch.commit();
    }
    props.navigation.navigate("MainScreen");
  };

  return (
    <ImageBackground blurRadius={1} style={styles.background}>
      <ScrollView>
        <View style={styles.container}>
          <Form
            initialValues={{
              batchs: "",
              programme: "",
              section: ""
            }}
            onSubmit={(values) => console.log(values)}
            validationSchema={validationSchema}
          >
            <FormField
              maxLength={5}
              name="Batch"
              placeholder="Batch"
              onChangeText={(text) => setBatchs(text)}
              value={batchs}
            />

            <FormField
              maxLength={10}
              name="programme"
              placeholder="programme"
              onChangeText={(text) => setProgramme(text)}
              value={programme}
            />

            <FormField
              maxLength={2}
              name="Section"
              placeholder="Section"
              onChangeText={(text) => setSection(text)}
              value={section}
            />
            <AppButton title="Add " onPress={addClass} />
          </Form>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#465881",
    padding: 10
  },
  container: {
    flex: 1,
    justifyContent: "flex-end"
  }
});
export default ClassEditScreen;
