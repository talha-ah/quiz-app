import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

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
    const dataArray = [];
    firestore_ref
      .where("courses", "array-contains", props.route.params.courseItem.key)
      .get()
      .then((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          let student = doc.data();
          if (student.results) {
            student.results.map((quizResult) => {
              if (quizResult.courseId === props.route.params.courseItem.key) {
                dataArray.push([
                  student.username,
                  quizResult.quizTitle,
                  quizResult.totalQuestions,
                  quizResult.obtainedMarks,
                  quizResult.totalMarks,
                ]);
              }
            });
          }
        });
        setData(dataArray);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
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
