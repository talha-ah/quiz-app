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
import AppButton from "../../../components/AppButton";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../../../components/forms";
import AddCourse from "./AddCourse";
import firebase from "../../../config/firebaseConfig";

// const validationSchema = Yup.object().shape({
//   coursetitle: Yup.string().required().min(1).label("Course Title"),
//   creditHrs: Yup.number().required().min(1).max(10000).label("Credit Hrs"),
//   coursecode: Yup.string().required().label("Course Code"),

// });

function CourseUpdateScreen({ route, navigation }) {
  //const firestore_ref=firebase.firestore().collection('Courses')

  const [coursetitle, SetCoursetitle] = useState("");
  const [creditHrs, SetCreditHrs] = useState("");
  const [coursecode, SetCoursecode] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const { key } = route.params;

  useEffect(() => {
    console.log("key: " + key);

    const UpdateCourse = [];
    firebase
      .firestore()
      .collection("Courses")
      .get()
      .then((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          console.log(doc.data());
          if (doc.id == key)
            UpdateCourse.push({
              ...doc.data(),
              key: doc.id,
            });
        });
        //console.log(UpdateCourse);
        //  console.warn(addCourse);

        setCourses(UpdateCourse);
      });
  }, []);

  const save = (keys) => {
    //try{
    console.log("save pressed");
    if (coursetitle === "" || creditHrs === "" || coursecode === "") {
      //your error
      //  setShowLoading(true);
      // console.log("write details");
      // Alert.alert('write details ');
    } else {
      const datas = firebase.firestore();

      const batch = datas.batch();
      const arr = [
        {
          coursetitle: coursetitle,
          creditHrs: creditHrs,
          coursecode: coursecode,
        },
      ];

      arr.forEach((item) => {
        const collectionRef = datas.collection("Courses").doc(keys);
        batch.update(collectionRef, item);
      });

      const result = batch.commit();
    }
  };

  return (
    <ImageBackground blurRadius={1} style={styles.background}>
      <ScrollView>
        <FlatList
          data={courses}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Form
                initialValues={{
                  coursetitle: "",
                  creditHrs: "",
                  coursecode: "",
                }}
              >
                <FormField
                  maxLength={255}
                  name="coursetitle"
                  placeholder={item.coursetitle}
                  onChangeText={(text) => SetCoursetitle(text)}
                  value={coursetitle}
                />
                <FormField
                  keyboardType="numeric"
                  maxLength={1}
                  name="creditHrs"
                  placeholder={item.creditHrs}
                  onChangeText={(text) => SetCreditHrs(text)}
                  value={creditHrs}
                />

                <FormField
                  maxLength={9}
                  multiline
                  name="coursecode"
                  placeholder={item.coursecode}
                  onChangeText={(text) => SetCoursecode(text)}
                  value={coursecode}
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
export default CourseUpdateScreen;

// ADD Course

//  updater=(key)=>{props.navigation.navigate('CourseUpdateScreen',key);
//   }

// <TouchableOpacity onPress={() => updater(item.key)}>
//         <Text >Course Key: {item.key} </Text>
//         </TouchableOpacity>
