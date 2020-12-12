import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  Alert,
} from "react-native";
import * as Yup from "yup";
import AppButton from "../../components/AppButton";
import firebase from "../../config/firebaseConfig";

import {
  AppForm as Form,
  AppFormField as FormField,
} from "../../components/forms";

const validationSchema = Yup.object().shape({
  batch: Yup.string().required().min(4).label("batch"),
  programme: Yup.string().required().min(1).max(6).label("programme"),
  section: Yup.string().required().min(1).max(2).label("section"),
});

function AddClass(props) {
  const firestore_ref = firebase.firestore().collection("Class");

  const [batch, setBatch] = useState("");
  const [programme, setProgramme] = useState("");
  const [section, setSection] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = props.route.params;
    if (params) {
      setBatch(params.classItem.batch);
      setProgramme(params.classItem.programme);
      setSection(params.classItem.section);
    }
  }, []);

  const addClass = () => {
    if (batch === "" || programme === "" || section === "") {
      Alert.alert("Error", "Enter Valid details");
    } else {
      setLoading(true);
      const params = props.route.params;
      if (params) {
        firestore_ref
          .doc(params.classItem.key)
          .update({
            batch: batch,
            programme: programme,
            section: section,
          })
          .then((resData) => {
            props.navigation.navigate("Classes");
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            alert("There was an error");
          });
      } else {
        firestore_ref
          .add({
            batch: batch,
            programme: programme,
            section: section,
          })
          .then((resData) => {
            props.navigation.navigate("Classes");
          })
          .catch((err) => {
            console.log(err);
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
              batch: "",
              programme: "",
              section: "",
            }}
            onSubmit={(values) => console.log(values)}
            // validationSchema={validationSchema}
          >
            <FormField
              name="batch"
              placeholder="Batch"
              onChangeText={(text) => setBatch(text)}
              value={batch}
            />
            <FormField
              name="programme"
              placeholder="Programme"
              onChangeText={(text) => setProgramme(text)}
              value={programme}
            />
            <FormField
              maxLength={2}
              name="section"
              placeholder="Section"
              onChangeText={(text) => setSection(text)}
              value={section}
            />
            <AppButton
              title={loading ? "Loading..." : "Add"}
              onPress={addClass}
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
export default AddClass;
