import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, SectionList, Alert } from "react-native";

import LoadingScreen from "../LoadingScreen";
import firebase from "../../config/firebaseConfig";
import { Button, Icon } from "native-base";
import Item from "../../components/Item";

const ViewClass = (props) => {
  const firestore_ref = firebase.firestore();

  const [loading, setLoading] = useState(true);
  const [classItem, setClassItem] = useState("");
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setClassItem(props.route.params.classItem);
    getData();
  }, []);

  function getData() {
    setRefreshing(true);
    firestore_ref
      .collection("StudentUser")
      .where("classes", "array-contains", classItem.key)
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
          .collection("Course")
          .where("class", "==", classItem.key)
          .get()
          .then((coursesDoc) => {
            let coursesArray = [];
            coursesDoc.forEach((doc) => {
              coursesArray.push({
                ...doc.data(),
                key: doc.id,
              });
            });
            setCourses(coursesArray);
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
  function openTwoButtonAlert1(key) {
    Alert.alert(
      "Remove Course",
      "Are you sure to remove it?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            removeCourse(key);
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
        classes: firebase.firestore.FieldValue.arrayRemove(classItem.key),
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
  const removeCourse = (key) => {
    firestore_ref
      .collection("Course")
      .doc(key)
      .update({
        class: null,
      })
      .then((res) => {
        const coursesArray = courses.filter(
          (courseITem) => courseITem.key !== key
        );
        setCourses(coursesArray);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <SectionList
      refreshing={refreshing}
      onRefresh={getData}
      style={styles.container}
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
                  <Text style={styles.text}>Phone: {item.phonenumber}</Text>
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
          title: "Courses",
          data: courses,
          renderItem: ({ item, index, section: { title, data } }) => (
            <Item
              body={
                <View>
                  <Text style={styles.text}>
                    Course Title: {item.courseTitle}
                  </Text>
                  <Text style={styles.text}>
                    Course Code: {item.courseCode}
                  </Text>
                  <Text style={styles.text}>
                    Credit Hrs.: {item.creditHours}
                  </Text>
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
      keyExtractor={(item, index) => item.key + index}
      ListHeaderComponent={() => (
        <Item
          body={
            <View>
              <Text style={styles.text}>Batch: {classItem.batch}</Text>
              <Text style={styles.text}>Programme: {classItem.programme}</Text>
              <Text style={styles.text}>Section: {classItem.section}</Text>
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
                addId: classItem.key,
                isCourse: false,
              });
            }}
          >
            <Text style={styles.text}>Add Student</Text>
          </Button>
          <Button
            style={styles.btn}
            onPress={() => {
              props.navigation.navigate("AddCourseIn", {
                addId: classItem.key,
              });
            }}
          >
            <Text style={styles.text}>Add Course</Text>
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
export default ViewClass;
