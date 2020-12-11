import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  FlatList,
  Alert,
  View,
} from "react-native";

import * as Yup from "yup";
import AppButton from "../../components/AppButton";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../../components/forms";

import firebase from "../../config/firebaseConfig";

// const validationSchema = Yup.object().shape({
//   coursetitle: Yup.string().required().min(1).label("Course Title"),
//   creditHrs: Yup.number().required().min(1).max(10000).label("Credit Hrs"),
//   coursecode: Yup.string().required().label("Course Code"),

// });

function ClassUpdateScreen({ route, navigation }) {
  //const firestore_ref=firebase.firestore().collection('Courses')

  const [batchs, setBatchs] = useState("");

  const [programme, setProgramme] = useState("");

  const [section, setSection] = useState("");
  const [classes, setClasses] = useState([]);
  const { key } = route.params;

  useEffect(() => {
    console.log("key: " + key);

    const UpdateClass = [];
    firebase
      .firestore()
      .collection("Class")
      .get()
      .then((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          console.log(doc.data());
          if (doc.id == key)
            UpdateClass.push({
              ...doc.data(),
              key: doc.id,
            });
        });
        //console.log(UpdateCourse);
        //  console.warn(addCourse);

        setClasses(UpdateClass);
      });
  }, []);

  const save = (keys, props) => {
    //try{
    console.log("save pressed");

    const datas = firebase.firestore();

    const batch = datas.batch();
    const array = [
      {
        batchs: batchs,
        programme: programme,
        section: section,
      },
    ];

    array.forEach((item) => {
      const collectionRef = datas.collection("Class").doc(keys);
      batch.set(collectionRef, item);
    });
    Alert.alert("Class has been updated ");

    const result = batch.commit();

    // }
  };

  return (
    <ImageBackground blurRadius={1} style={styles.background}>
      <ScrollView>
        <FlatList
          data={classes}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Form
                initialValues={{
                  batchs: "",
                  programme: "",
                  section: "",
                }}
              >
                <FormField
                  maxLength={5}
                  name="Batch"
                  placeholder={item.batchs}
                  onChangeText={(text) => setBatchs(text)}
                  value={batchs}
                />

                <FormField
                  maxLength={10}
                  name="programme"
                  placeholder={item.programme}
                  onChangeText={(text) => setProgramme(text)}
                  value={programme}
                />

                <FormField
                  maxLength={2}
                  name="Section"
                  placeholder={item.section}
                  onChangeText={(text) => setSection(text)}
                  value={section}
                />

                <AppButton title="Save" onPress={() => save(key)} />
              </Form>
            </View>
          )}
        />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#465881",
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
export default ClassUpdateScreen;
