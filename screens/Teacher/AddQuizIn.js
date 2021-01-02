import React, { useState, useEffect } from "react";
import { Button, Icon } from "native-base";
import { StyleSheet, View, FlatList, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

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

  async function getQuizzes() {
    setRefreshing(true);
    let userData = await AsyncStorage.getItem("userData");
    let userOBJ = JSON.parse(userData);

    firestore_ref
      .where("teacherId", "==", userOBJ.key)
      .get()
      .then((quizzesDoc) => {
        let quizzesArray = [];
        quizzesDoc.forEach((doc) => {
          let docData = doc.data();
          if (docData.course !== props.route.params.addId) {
            quizzesArray.push({
              ...doc.data(),
              key: doc.id,
            });
          }
        });
        setQuizzes(quizzesArray);
        setRefreshing(false);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function addQuiz(item) {
    setLoading2(true);
    firestore_ref
      .doc(item.key)
      .update({
        course: props.route.params.addId,
      })
      .then((resData) => {
        firebase
          .firestore()
          .collection("StudentUser")
          .where("courses", "array-contains", props.route.params.addId)
          .get()
          .then(async (docSnapshot) => {
            if (docSnapshot.size > 0) {
              docSnapshot.forEach(async (userItem) => {
                await firebase
                  .firestore()
                  .collection("StudentUser")
                  .doc(userItem.id)
                  .update({
                    notifications: firebase.firestore.FieldValue.arrayUnion({
                      message: "You have an upcoming quiz",
                      quizz: item,
                      date: new Date(),
                      status: "pending",
                    }),
                  });
              });
              props.navigation.goBack();
            } else {
              props.navigation.goBack();
            }
          });
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
        ListEmptyComponent={
          <View>
            <Text style={styles.text}>No Data!</Text>
          </View>
        }
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
                onPress={() => addQuiz(item)}
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
    paddingHorizontal: 20,
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
