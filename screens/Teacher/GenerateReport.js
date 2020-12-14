import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import firebase from "../../config/firebaseConfig";
import LoadingScreen from "../LoadingScreen";
import Item from "../../components/Item";

function ClassList(props) {
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
    const coursesList = [];
    firestore_ref
      .where("teacherId", "==", userOBJ.key)
      .get()
      .then((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          coursesList.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setCourses(coursesList);
        setLoading(false);
        setRefreshing(false);
      });
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
          <Text style={styles.text}>No Data!</Text>
        </View>
      }
      renderItem={({ item }) => (
        <Item
          key={item.key}
          onPress={() =>
            props.navigation.navigate("Report", {
              courseItem: item,
            })
          }
          body={
            <View>
              <Text style={{ color: "white" }}>
                Course Title: {item.courseTitle}
              </Text>
              <Text style={{ color: "white" }}>
                Course Code: {item.courseCode}
              </Text>
              <Text style={{ color: "white" }}>
                Credit Hrs.: {item.creditHours}}
              </Text>
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
    paddingHorizontal: 20,
    backgroundColor: "#465881",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
export default ClassList;
