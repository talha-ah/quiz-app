import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import AsyncStorage from "@react-native-community/async-storage";

import firebase from "../../config/firebaseConfig";
import LoadingScreen from "../LoadingScreen";

export default function Result(props) {
  const firestore_ref = firebase.firestore().collection("StudentUser");

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let userData = await AsyncStorage.getItem("userData");
    let userOBJ = JSON.parse(userData);

    const userDoc = await firestore_ref.doc(userOBJ.key).get();
    const dataArray = [];
    userDoc
      .data()
      .results.map((item) =>
        dataArray.push([item.quizzId, item.obtained, item.total])
      );
    setUser(userDoc);
    setData(dataArray);
    setLoading(false);
  }

  return loading ? (
    <LoadingScreen />
  ) : (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1, borderColor: "#c8e1ff" }}>
        <Row
          data={["Quiz ID", "Obtained Marks", "Total Marks"]}
          style={styles.head}
          textStyle={{ textAlign: "center", fontWeight: "bold" }}
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