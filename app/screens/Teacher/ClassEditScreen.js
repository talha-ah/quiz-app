import React, { useState } from "react";
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
  batch: Yup.string().required().min(4).label("Batch"),
  programme: Yup.string().required().min(1).max(6).label("Programme"),
  section: Yup.string().required().min(1).max(2).label("Section"),
});

function ClassEditScreen(props) {
  const firestore_ref = firebase.firestore().collection("Class");

  const [batchs, setBatchs] = useState("");
  const [programme, setProgramme] = useState("");
  const [section, setSection] = useState("");
  const [loading, setLoading] = useState(false);

  const addClass = async () => {
    try {
      if (batchs === "" || programme === "" || section === "") {
        Alert.alert("Error", "Enter Valid details");
      } else {
        setLoading(true);
        const classDoc = firestore_ref.add({
          batchs: batchs,
          programme: programme,
          section: section,
        });
        console.log("asdf", classDoc);
        props.navigation.navigate("AddClassScreen");
      }
    } catch (err) {
      console.log(err);
      Alert.alert(err.message);
    }
  };

  return (
    <ImageBackground blurRadius={1} style={styles.background}>
      <ScrollView>
        <View style={styles.container}>
          <Form
            initialValues={{
              batchs: "",
              programme: "",
              section: "",
            }}
            onSubmit={(values) => console.log(values)}
            // validationSchema={validationSchema}
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
            <AppButton title="Add " onPress={addClass} disabled={loading} />
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
export default ClassEditScreen;
