import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  Alert,
} from "react-native";
import AppButton from "../../components/AppButton";
import firebase from "../../config/firebaseConfig";

import {
  AppForm as Form,
  AppFormField as FormField,
} from "../../components/forms";

function AddQuiz(props) {
  const firestore_ref = firebase.firestore().collection("Quiz");

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = props.route.params;
    if (params) {
      setTitle(params.quizItem.quizTitle);
      setTime(params.quizItem.quizTime);
    }
  }, []);

  const addQuiz = () => {
    if (title === "" || time === "") {
      Alert.alert("Error", "Enter Valid details");
    } else {
      setLoading(true);
      const params = props.route.params;
      if (params) {
        firestore_ref
          .doc(params.quizItem.key)
          .update({
            quizTitle: title,
            quizTime: time,
          })
          .then((resData) => {
            props.navigation.navigate("Quizzes");
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            alert("There was an error");
          });
      } else {
        firestore_ref
          .add({
            quizTitle: title,
            quizTime: time,
          })
          .then((resData) => {
            props.navigation.navigate("Quizzes");
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
              title: "",
              time: "",
            }}
            onSubmit={(values) => console.log(values)}
          >
            <FormField
              name="quizTitle"
              placeholder="Quiz Title"
              onChangeText={(text) => setTitle(text)}
              value={title}
            />
            <FormField
              name="time"
              keyboardType="numeric"
              placeholder="Quiz Time (in minutes)"
              onChangeText={(text) => setTime(text)}
              value={time}
            />
            <AppButton
              title={loading ? "Loading..." : "Add"}
              onPress={addQuiz}
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
export default AddQuiz;
