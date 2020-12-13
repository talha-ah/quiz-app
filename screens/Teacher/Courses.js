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

import firebase from "../../config/firebaseConfig";
import LoadingScreen from "../LoadingScreen";

function Courses(props) {
  const firestore_ref = firebase.firestore().collection("Course");

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    setRefreshing(true);
    const coursesList = [];
    firestore_ref
      .get()
      .then((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          coursesList.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setCourses(coursesList);
        setRefreshing(false);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function deleteCourser(key) {
    firestore_ref
      .doc(key)
      .delete()
      .then((res) => {
        setCourses(courses.filter((course) => course.key !== key));
      })
      .catch((err) => {
        alert(err);
      });
  }
  function openTwoButtonAlert(key) {
    Alert.alert(
      "Delete Course",
      "Are you sure to delete it?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            deleteCourser(key);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  }

  return loading ? (
    <LoadingScreen />
  ) : (
    <FlatList
      style={styles.container}
      data={courses}
      refreshing={refreshing}
      onRefresh={getData}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.key}
          onPress={() =>
            props.navigation.navigate("ViewCourse", { courseItem: item })
          }
          style={{
            backgroundColor: "#465881",
            height: 90,
            width: "100%",
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 15,
            padding: 10,
            marginVertical: 10,
          }}
        >
          <Text style={{ color: "white" }}>
            Course Title: {item.courseTitle}
          </Text>
          <Text style={{ color: "white" }}>Course Code: {item.courseCode}</Text>
          <Text style={{ color: "white" }}>
            Credit Hrs.: {item.creditHours}
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
                props.navigation.navigate("AddCourse", { courseItem: item })
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
            props.navigation.navigate("AddCourse");
          }}
        >
          <Text style={styles.text}>Add Course</Text>
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
  wrapper: {
    flexDirection: "row",
  },
  title: {
    flex: 1,
    backgroundColor: "#f6f8fa",
  },
  row: {
    height: 20,
  },
  text: {
    textAlign: "center",
  },
  screen: {
    flex: 1,
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

  screen: {
    flex: 1,

    marginTop: -150,
  },
});
export default Courses;
