import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";
import { Button } from "native-base";

import firebase from "../../config/firebaseConfig";
import LoadingScreen from "../LoadingScreen";
import Item from "../../components/Item";

function getTime(seconds) {
  var curdate = new Date(null);
  curdate.setTime(seconds * 1000);
  return curdate.toLocaleString();
}

function checkQuiz(quiz) {
  if (
    moment(new Date(getTime(quiz.quizDate.seconds))).isSame(
      moment(new Date()),
      "day"
    )
  ) {
    if (
      moment(new Date(getTime(quiz.quizDateTime.seconds))).isSame(
        moment(new Date()),
        "hour"
      )
    ) {
      if (
        Number(
          moment
            .utc(
              moment(new Date()).diff(
                moment(new Date(getTime(quiz.quizDateTime.seconds)))
              )
            )
            .format("mm")
        ) < Number(quiz.quizTime)
      ) {
        return true;
      }
    }
  }
  return false;
}

function Quizzes(props) {
  const firestore_ref = firebase.firestore().collection("Quiz");

  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  async function getData() {
    setRefreshing(true);
    let userData = await AsyncStorage.getItem("userData");
    let userOBJ = JSON.parse(userData);

    const quizzesList = [];
    await Promise.all(
      userOBJ.courses.map(async (courseId) => {
        const quizDoc = await firestore_ref
          .where("course", "==", courseId)
          .get();
        quizDoc.forEach((doc) => {
          quizzesList.push({
            ...doc.data(),
            key: doc.id,
          });
        });
      })
    );
    setQuizzes(quizzesList);
    setLoading(false);
    setRefreshing(false);
  }

  return loading ? (
    <LoadingScreen />
  ) : (
    <FlatList
      style={styles.container}
      data={quizzes}
      refreshing={refreshing}
      onRefresh={getData}
      ListEmptyComponent={
        <View>
          <Text style={styles.text}>
            No quiz uploaded yet! Come back some other time!
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <Item
          body={
            <View>
              <Text style={styles.text}>Quiz Title: {item.quizTitle}</Text>
              <Text style={styles.text}>Time Allowed: {item.quizTime}</Text>
              <Text style={styles.text}>
                Quiz Date:{" "}
                {moment(getTime(item.quizDate.seconds)).format("YYYY-MM-DD")}
              </Text>
              <Text style={styles.text}>
                Quiz Time:{" "}
                {moment(getTime(item.quizDateTime.seconds)).format("HH:mm")}
              </Text>
            </View>
          }
          actions={
            checkQuiz(item) && (
              <View>
                <Button
                  style={styles.btn}
                  onPress={() =>
                    props.navigation.navigate("TakeQuiz", {
                      quizItem: item,
                    })
                  }
                >
                  <Text style={styles.text}>Take</Text>
                </Button>
              </View>
            )
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#465881",
  },
  text: {
    color: "#fff",
  },
  btn: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fc5c65",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
});
export default Quizzes;
