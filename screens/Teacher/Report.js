import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
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
          let item = doc.data();
          let total = 0;
          let obtained = 0;
          let totalQuizzez = 0;
          if (item.results) {
            item.results.map((quizResult) => {
              totalQuizzez++;
              total += quizResult.totalMarks;
              obtained += quizResult.obtainedMarks;
            });
            dataArray.push([item.username, totalQuizzez, obtained, total]);
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
          data={["Student Name", "Quizzes", "Scored", "Total"]}
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
