import React, { useState, useEffect } from "react";
import { Button, Icon } from "native-base";
import { StyleSheet, View, FlatList, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import firebase from "../../config/firebaseConfig";
import Item from "../../components/Item";
import LoadingScreen from "../LoadingScreen";

function InviteScreen(props) {
  const firestore_ref = firebase.firestore();

  const [quizz, setQuizz] = useState("");
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [courses, setCourses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getCourses();
  }, []);

  async function getCourses() {
    setRefreshing(true);
    let userData = await AsyncStorage.getItem("userData");
    let userOBJ = JSON.parse(userData);

    firestore_ref
      .collection("Course")
      .where("teacherId", "==", userOBJ.key)
      .get()
      .then((coursesDoc) => {
        let coursesArray = [];
        coursesDoc.forEach((doc) => {
          coursesArray.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        firestore_ref
          .collection("Quiz")
          .doc(props.route.params.quizz.key)
          .get()
          .then((resData) => {
            setQuizz(resData.data());
            setCourses(coursesArray);
            setRefreshing(false);
            setLoading(false);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function addToCourse(courseId) {
    setLoading2(true);
    firestore_ref
      .collection("Quiz")
      .doc(props.route.params.quizz.key)
      .update({
        course: courseId,
      })
      .then((resData) => {
        firestore_ref
          .collection("StudentUser")
          .where("courses", "array-contains", courseId)
          .get()
          .then(async (docSnapshot) => {
            if (docSnapshot.size > 0) {
              docSnapshot.forEach(async (userItem, index) => {
                await firestore_ref
                  .collection("StudentUser")
                  .doc(userItem.id)
                  .update({
                    notifications: firebase.firestore.FieldValue.arrayUnion({
                      quizz: props.route.params.quizz,
                      date: new Date(),
                      status: "pending",
                    }),
                  });
              });
              props.navigation.goBack();
            } else {
              props.navigation.goBack();
            }
          })
          .catch((err) => {
            setLoading2(false);
            console.log(err);
            alert(err.message);
          });
      });
  }

  return loading ? (
    <LoadingScreen />
  ) : (
    <>
      <FlatList
        style={styles.container}
        data={courses}
        refreshing={refreshing}
        onRefresh={getCourses}
        ListEmptyComponent={
          <View>
            <Text style={styles.text}>No Data!</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Item
            disabled
            body={
              <View>
                <Text style={{ color: "white" }}>
                  Course Title: {item.courseTitle}
                </Text>
                <Text style={{ color: "white" }}>
                  Course Code: {item.courseCode}
                </Text>
                <Text style={{ color: "white" }}>
                  Credit Hrs.: {item.creditHours}
                </Text>
              </View>
            }
            actions={
              <Button
                rounded
                danger
                onPress={() => addToCourse(item.key)}
                disabled={loading2 || item.key === quizz.course}
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
