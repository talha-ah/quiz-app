import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, ImageBackground, View } from "react-native";
import * as Yup from "yup";
import AppButton from "../../components/AppButton";

import {
  AppForm as Form,
  AppFormField as FormField,
} from "../../components/forms";
import firebase from "../../config/firebaseConfig";

const validationSchema = Yup.object().shape({
  coursetitle: Yup.string().required().min(1).label("Course Title"),
  creditHrs: Yup.number().required().min(1).max(10000).label("Credit Hrs"),
  coursecode: Yup.string().required().label("Course Code"),
});

function AddCourse(props) {
  const firestore_ref = firebase.firestore().collection("Course");

  const [coursetitle, SetCoursetitle] = useState("");
  const [creditHrs, SetCreditHrs] = useState("");
  const [coursecode, SetCoursecode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = props.route.params;
    if (params) {
      SetCoursetitle(params.courseItem.courseTitle);
      SetCreditHrs(params.courseItem.creditHours);
      SetCoursecode(params.courseItem.courseCode);
    }
  }, []);

  const addCourse = () => {
    if (coursetitle === "" || creditHrs === "" || coursecode === "") {
      alert("Enter Valid details");
    } else {
      setLoading(true);
      const params = props.route.params;
      if (params) {
        firestore_ref
          .doc(params.courseItem.key)
          .update({
            courseTitle: coursetitle,
            creditHours: creditHrs,
            courseCode: coursecode,
          })
          .then((resData) => {
            props.navigation.navigate("Courses");
          })
          .catch((err) => {
            setLoading(false);
            alert("There was an error");
          });
      } else {
        firestore_ref
          .add({
            courseTitle: coursetitle,
            creditHours: creditHrs,
            courseCode: coursecode,
            class: null,
          })
          .then((resData) => {
            props.navigation.navigate("Courses");
          })
          .catch((err) => {
            setLoading(false);
            alert("There was an error");
          });
      }
    }
  };

  return (
    <ImageBackground blurRadius={1} style={styles.background}>
      <ScrollView>
        <View style={styles.container}>
          <Form
            initialValues={{
              coursetitle: "",
              creditHrs: "",
              coursecode: "",
            }}
            onSubmit={(values) => console.log(values)}
            // validationSchema={validationSchema}
          >
            <FormField
              maxLength={255}
              name="coursetitle"
              placeholder="Course Title"
              onChangeText={(text) => SetCoursetitle(text)}
              value={coursetitle}
            />
            <FormField
              keyboardType="numeric"
              maxLength={1}
              name="creditHrs"
              placeholder="Credit Hrs"
              onChangeText={(text) => SetCreditHrs(text)}
              value={creditHrs}
            />
            <FormField
              maxLength={9}
              multiline
              name="coursecode"
              placeholder="Course Code"
              onChangeText={(text) => SetCoursecode(text)}
              value={coursecode}
            />
            <AppButton
              onPress={addCourse}
              title={loading ? "Loading..." : "Add"}
              disabled={loading}
            />
          </Form>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 10,
    backgroundColor: "#465881",
  },
});
export default AddCourse;
