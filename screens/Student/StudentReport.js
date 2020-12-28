import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import AsyncStorage from "@react-native-community/async-storage";

import firebase from "../../config/firebaseConfig";
import LoadingScreen from "../LoadingScreen";

export default function Result(props) {
  const firestore_ref = firebase.firestore().collection("StudentUser");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let userOBJ = JSON.parse(userData);

      const userDoc = await firestore_ref.doc(userOBJ.key).get();
      const dataArray = [];
      await Promise.all(
        userDoc.data().results.map(async (item) => {
          const quiz = await firebase
            .firestore()
            .collection("Quiz")
            .doc(item.quizzId)
            .get();
          const quizDoc = await quiz.data();
          quizDoc &&
            dataArray.push([
              quizDoc.quizTitle,
              item.totalQuestions,
              item.totalMarks,
              item.obtainedMarks,
            ]);
        })
      );
      setData(dataArray);
      setLoading(false);
    } catch (err) {
      alert(err.message);
    }
  }

  return loading ? (
    <LoadingScreen />
  ) : (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1, borderColor: "#c8e1ff" }}>
        <Row
          data={["Quiz ID", "Questions", "Total", "Obtained"]}
          style={styles.head}
          textStyle={{ textAlign: "center", fontWeight: "bold", fontSize: 10 }}
        />
        <Rows data={data} textStyle={styles.text} />
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#465881",
  },
  head: {
    height: 30,
    backgroundColor: "#f1f8ff",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
