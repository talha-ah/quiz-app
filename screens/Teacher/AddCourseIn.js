import React, { useState, useEffect } from "react";
import { Button, Icon } from "native-base";
import { StyleSheet, View, FlatList, Text } from "react-native";

import firebase from "../../config/firebaseConfig";
import Item from "../../components/Item";
import LoadingScreen from "../LoadingScreen";

function InviteScreen(props) {
  const firestore_ref = firebase.firestore().collection("Course");

  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [courses, setCourses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getCourses();
  }, []);

  function getCourses() {
    setRefreshing(true);
    firestore_ref
      .where("class", "!=", props.route.params.addId)
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
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function addClass(key) {
    setLoading2(true);
    firestore_ref
      .doc(key)
      .update({
        class: props.route.params.addId,
      })
      .then((resData) => {
        props.navigation.goBack();
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
        data={courses}
        refreshing={refreshing}
        onRefresh={getCourses}
        renderItem={({ item }) => (
          <Item
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
                onPress={() => addClass(item.key)}
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
