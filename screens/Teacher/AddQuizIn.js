import React, { useState, useEffect } from "react";
import { Button, Icon } from "native-base";
import { StyleSheet, View, FlatList, Text } from "react-native";

import firebase from "../../config/firebaseConfig";
import Item from "../../components/Item";
import LoadingScreen from "../LoadingScreen";

function InviteScreen(props) {
  const firestore_ref = firebase.firestore().collection("Quiz");

  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getQuizzes();
  }, []);

  function getQuizzes() {
    setRefreshing(true);
    firestore_ref
      .where("course", "!=", props.route.params.addId)
      .get()
      .then((quizzesDoc) => {
        let quizzesArray = [];
        quizzesDoc.forEach((doc) => {
          quizzesArray.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setQuizzes(quizzesArray);
        setRefreshing(false);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function addQuiz(key) {
    setLoading2(true);
    firestore_ref
      .doc(key)
      .update({
        course: props.route.params.addId,
      })
      .then((resData) => {
        props.navigation.navigate("ViewCourse");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return loading ? (
    <LoadingScreen />
  ) : (
    <>
      <FlatList
        style={styles.container}
        data={quizzes}
        refreshing={refreshing}
        onRefresh={getQuizzes}
        renderItem={({ item }) => (
          <Item
            body={
              <View>
                <Text style={{ color: "white" }}>
                  Quiz Title: {item.quizTitle}
                </Text>
                <Text style={{ color: "white" }}>
                  Time Allowed: {item.quizTime}
                </Text>
              </View>
            }
            actions={
              <Button
                rounded
                danger
                onPress={() => addQuiz(item.key)}
                disabled={loading2}
              >
                <Icon name="add" style={{ color: "#fff" }} />
              </Button>
            }
          />
        )}
      />
    </>
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
  btn: {
    backgroundColor: "#fc5c65",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
    marginVertical: 20,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default InviteScreen;
