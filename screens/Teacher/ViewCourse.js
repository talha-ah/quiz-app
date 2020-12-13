import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, SectionList, Alert } from "react-native";

import LoadingScreen from "../LoadingScreen";
import firebase from "../../config/firebaseConfig";
import { Button, Icon } from "native-base";
import Item from "../../components/Item";

const ViewCourse = (props) => {
  const firestore_ref = firebase.firestore();

  const [loading, setLoading] = useState(true);
  const [courseItem, setCourseItem] = useState("");
  const [students, setStudents] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setCourseItem(props.route.params.courseItem);
    getStudents();
  }, []);

  function getStudents() {
    setRefreshing(true);
    firestore_ref
      .collection("StudentUser")
      .where("courses", "array-contains", props.route.params.courseItem.key)
      .get()
      .then((students) => {
        let studentsArray = [];
        students.forEach((doc) => {
          studentsArray.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setStudents(studentsArray);
        firestore_ref
          .collection("Quiz")
          .where("course", "==", courseItem.key)
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
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  function openTwoButtonAlert(key) {
    Alert.alert(
      "Remove Student",
      "Are you sure to remove it?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            removeStudent(key);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  }
  const removeStudent = (key) => {
    firestore_ref
      .collection("StudentUser")
      .doc(key)
      .update({
        courses: firebase.firestore.FieldValue.arrayRemove(courseItem.key),
      })
      .then((res) => {
        const studentsArray = students.filter(
          (studentiem) => studentiem.key !== key
        );
        setStudents(studentsArray);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  function openTwoButtonAlert1(key) {
    Alert.alert(
      "Remove Quiz",
      "Are you sure to remove it?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            removeQuiz(key);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  }
  const removeQuiz = (key) => {
    firestore_ref
      .collection("Quiz")
      .doc(key)
      .update({
        course: "",
      })
      .then((res) => {
        const quizzesArray = quizzes.filter((quizItem) => quizItem.key !== key);
        setQuizzes(quizzesArray);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <SectionList
      style={styles.container}
      data={students}
      refreshing={refreshing}
      onRefresh={getStudents}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={{ fontWeight: "bold", color: "#fff" }}>{title}</Text>
      )}
      sections={[
        {
          title: "Students",
          data: students,
          renderItem: ({ item, index, section: { title, data } }) => (
            <Item
              body={
                <View>
                  <Text style={styles.text}>Name: {item.username}</Text>
                  <Text style={styles.text}>Email: {item.email}</Text>
                  <Text style={styles.text}>
                    Registration No.: {item.regno}
                  </Text>
                  <Text style={styles.text}>Phone: {item.phone}</Text>
                </View>
              }
              actions={
                <Button
                  danger
                  transparent
                  onPress={() => openTwoButtonAlert(item.key)}
                >
                  <Icon active name="trash" />
                </Button>
              }
            />
          ),
        },
        {
          title: "Quizzes",
          data: quizzes,
          renderItem: ({ item, index, section: { title, data } }) => (
            <Item
              body={
                <View>
                  <Text style={styles.text}>Quiz Title: {item.quizTitle}</Text>
                  <Text style={styles.text}>Time Allowed: {item.quizTime}</Text>
                </View>
              }
              actions={
                <Button
                  danger
                  transparent
                  onPress={() => openTwoButtonAlert1(item.key)}
                >
                  <Icon active name="trash" />
                </Button>
              }
            />
          ),
        },
      ]}
      renderItem={({ item }) => (
        <Item
          body={
            <View>
              <Text style={styles.text}>Name: {item.username}</Text>
              <Text style={styles.text}>Email: {item.email}</Text>
              <Text style={styles.text}>Registration No.: {item.regno}</Text>
              <Text style={styles.text}>Phone: {item.phone}</Text>
            </View>
          }
          actions={
            <Button
              danger
              transparent
              onPress={() => openTwoButtonAlert(item.key)}
            >
              <Icon active name="trash" />
            </Button>
          }
        />
      )}
      keyExtractor={(item, index) => item.key + index}
      ListHeaderComponent={() => (
        <Item
          body={
            <View>
              <Text style={styles.text}>
                Course Code: {courseItem.courseCode}
              </Text>
              <Text style={styles.text}>
                Course Title: {courseItem.courseTitle}
              </Text>
              <Text style={styles.text}>
                Credit Hours: {courseItem.creditHours}
              </Text>
            </View>
          }
        />
      )}
      ListFooterComponent={() => (
        <View>
          <Button
            style={styles.btn}
            onPress={() => {
              props.navigation.navigate("AddStudent", {
                addId: courseItem.key,
                isCourse: true,
              });
            }}
          >
            <Text style={styles.text}>Add Student</Text>
          </Button>
          <Button
            style={styles.btn}
            onPress={() => {
              props.navigation.navigate("AddQuizIn", {
                addId: courseItem.key,
              });
            }}
          >
            <Text style={styles.text}>Add Quiz</Text>
          </Button>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#465881",
  },
  btn: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
    marginTop: 10,
    backgroundColor: "#fc5c65",
    overflow: "hidden",
  },
  text: {
    color: "#fff",
  },
});
export default ViewCourse;
