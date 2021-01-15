import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

import firebase from "../../config/firebaseConfig";
import LoadingScreen from "../LoadingScreen";

export default function Result(props) {
  const firestore_ref = firebase.firestore();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const dataArray = [];
    firestore_ref
      .collection("Quiz")
      .where("course", "==", props.route.params.courseItem.key)
      .get()
      .then((quizSnapshots) => {
        const quizzes = [];
        quizSnapshots.forEach(async (doc) => {
          let quizz = doc.data();
          quizz.id = doc.id;
          quizzes.push(quizz);
        });
        firestore_ref
          .collection("StudentUser")
          .where("courses", "array-contains", props.route.params.courseItem.key)
          .get()
          .then((studentsSnapshot) => {
            const students = [];
            studentsSnapshot.forEach(async (doc) => {
              let student = doc.data();
              student.id = doc.id;
              students.push(student);
            });
            quizzes.forEach((quizzItem) => {
              students.forEach((studentItem) => {
                const resultIndex = studentItem.results.findIndex(
                  (result) => result.quizzId === quizzItem.id
                );
                if (resultIndex === -1) {
                  dataArray.push([
                    studentItem.username,
                    quizzItem.quizTitle,
                    quizzItem.questions,
                    "null",
                    quizzItem.marks,
                  ]);
                } else {
                  dataArray.push([
                    studentItem.username,
                    quizzItem.quizTitle,
                    quizzItem.questions,
                    studentItem.results[resultIndex].obtainedMarks,
                    quizzItem.marks,
                  ]);
                }
              });
            });
            setData(dataArray);
            setLoading(false);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return loading ? (
    <LoadingScreen />
  ) : (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1, borderColor: "#c8e1ff" }}>
        <Row
          style={styles.head}
          data={["Student Name", "Quizz", "Questions", "Scored", "Total"]}
          textStyle={{ textAlign: "center", fontWeight: "bold", fontSize: 10 }}
        />
        <Rows data={data} textStyle={styles.text} />
      </Table>
      {data.length === 0 && (
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 20 }}>
          No Data
        </Text>
      )}
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
