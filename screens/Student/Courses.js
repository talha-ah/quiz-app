import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Button } from "native-base";

import firebase from "../../config/firebaseConfig";
import LoadingScreen from "../LoadingScreen";
import Item from "../../components/Item";

function Courses(props) {
  const firestore_ref = firebase.firestore().collection("Course");

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setRefreshing(true);
    let userData = await AsyncStorage.getItem("userData");
    let userOBJ = JSON.parse(userData);

    const courseList = [];
    await Promise.all(
      userOBJ.courses.map(async (courseId) => {
        const courseDoc = await firestore_ref.doc(courseId).get();
        courseList.push({
          ...courseDoc.data(),
          key: courseDoc.id,
        });
      })
    );
    setCourses(courseList);
    setLoading(false);
    setRefreshing(false);
  }

  return loading ? (
    <LoadingScreen />
  ) : (
    <FlatList
      style={styles.container}
      data={courses}
      refreshing={refreshing}
      onRefresh={getData}
      ListEmptyComponent={
        <View>
          <Text style={styles.text}>No date!</Text>
        </View>
      }
      renderItem={({ item }) => (
        <Item
          body={
            <View style={{ width: "42%" }}>
              <Text style={styles.text}>Course Title: {item.courseTitle}</Text>
              <Text style={styles.text}>Course Code: {item.courseCode}</Text>
              <Text style={styles.text}>Credit Hours: {item.creditHours}</Text>
            </View>
          }
          actions={
            <View>
              <Button
                style={[styles.btn]}
                onPress={() =>
                  props.navigation.navigate("StudentReport", {
                    courseItem: item,
                  })
                }
              >
                <Text style={styles.text}>Generate</Text>
              </Button>
            </View>
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
    padding: 10,
    width: "90%",
    marginTop: 10,
    marginLeft: 14,
    marginBottom: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fc5c65",
  },
});
export default Courses;
