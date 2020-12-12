import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import LoadingScreen from "../LoadingScreen";
import firebase from "../../config/firebaseConfig";
import AppButton from "../../components/AppButton";

const MainScreen = (props) => {
  const firestore_ref = firebase.firestore().collection("Class");
  const [loading, setLoading] = useState(true);
  const [classItem, setClassItem] = useState("");

  useEffect(() => {
    getClass();
  }, []);

  async function getClass() {
    try {
      firestore_ref
        .doc(props.route.params.classId)
        .get()
        .then((docSnapshot) => {
          console.log(docSnapshot);
          setClassItem(docSnapshot);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  return loading ? (
    <LoadingScreen />
  ) : (
    <View style={styles.container}>
      <AppButton
        title="Courses"
        onPress={() => props.navigation.navigate("Courses")}
      />
      <AppButton
        title="Students"
        onPress={() => props.navigation.navigate("StudentsList")}
      />
      <AppButton
        title="Quizzes"
        onPress={() => props.navigation.navigate("Quizzes")}
      />
      <AppButton
        title="Reports"
        // onPress={() => props.navigation.navigate("Reports")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#465881",
  },
});
export default MainScreen;
