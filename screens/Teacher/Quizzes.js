import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button, Icon } from "native-base";
import moment from "moment";

import firebase from "../../config/firebaseConfig";
import LoadingScreen from "../LoadingScreen";

function Quizzes(props) {
  const firestore_ref = firebase.firestore().collection("Quiz");

  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    setRefreshing(true);
    const quizzesList = [];
    firestore_ref
      .get()
      .then((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          quizzesList.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setQuizzes(quizzesList);
        setRefreshing(false);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function deleteQuiz(key) {
    firestore_ref
      .doc(key)
      .delete()
      .then((res) => {
        setQuizzes(quizzes.filter((quiz) => quiz.key !== key));
      })
      .catch((err) => {
        alert(err);
      });
  }
  function openTwoButtonAlert(key) {
    Alert.alert(
      "Delete Quiz",
      "Are you sure to delete it?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            deleteQuiz(key);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  }

  function getTime(seconds) {
    var curdate = new Date(null);
    curdate.setTime(seconds * 1000);
    return curdate.toLocaleString();
  }

  return loading ? (
    <LoadingScreen />
  ) : (
    <FlatList
      style={styles.container}
      data={quizzes}
      refreshing={refreshing}
      onRefresh={getData}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            height: 90,
            padding: 10,
            width: "100%",
            borderWidth: 1,
            borderRadius: 15,
            marginVertical: 10,
            borderColor: "white",
            backgroundColor: "#465881",
          }}
          onPress={() =>
            props.navigation.navigate("Questions", { quizzId: item.key })
          }
        >
          <Text style={{ color: "white" }}>Quiz Title: {item.quizTitle}</Text>
          <Text style={{ color: "white" }}>Time Allowed: {item.quizTime}</Text>
          <Text style={{ color: "white" }}>
            Quiz Date:{" "}
            {moment(getTime(item.quizDate.seconds)).format("YYYY-MM-DD")}
          </Text>
          <Text style={{ color: "white" }}>
            Quiz Time:{" "}
            {moment(getTime(item.quizDateTime.seconds)).format("HH:mm")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              bottom: 30,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("AddQuiz", { quizItem: item })
              }
            >
              <Text style={styles.align}>Update</Text>
            </TouchableOpacity>
            <Button
              danger
              transparent
              style={{}}
              onPress={() => openTwoButtonAlert(item.key)}
            >
              <Icon active name="trash" />
            </Button>
          </View>
        </TouchableOpacity>
      )}
      ListFooterComponent={() => (
        <Button
          style={styles.btn}
          onPress={() => {
            props.navigation.navigate("AddQuiz");
          }}
        >
          <Text style={styles.text}>Add Quiz</Text>
        </Button>
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
  align: {
    color: "red",
  },
  row: {
    height: 20,
  },
  text: {
    textAlign: "center",
  },
  btn: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
    marginTop: 10,
    backgroundColor: "#fc5c65",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
export default Quizzes;
