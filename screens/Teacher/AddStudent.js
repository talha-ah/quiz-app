import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { Button, Icon } from "native-base";

import firebase from "../../config/firebaseConfig";
import Item from "../../components/Item";
import LoadingScreen from "../LoadingScreen";

function InviteScreen(props) {
  const firestore_ref = firebase.firestore().collection("StudentUser");

  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [students, setStudents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getStudents();
  }, []);

  function getStudents() {
    setRefreshing(true);
    let toCheck = props.route.params.isCourse ? "courses" : "classes";
    firestore_ref
      .get()
      .then((studentsDoc) => {
        let studentsArray = [];
        studentsDoc.forEach((doc) => {
          const toMap =
            toCheck === "courses" ? doc.data().courses : doc.data().classes;
          if (toMap) {
            if (!toMap.some((item) => item === props.route.params.addId)) {
              studentsArray.push({
                ...doc.data(),
                key: doc.id,
              });
            }
          } else {
            studentsArray.push({
              ...doc.data(),
              key: doc.id,
            });
          }
        });
        setStudents(studentsArray);
        setRefreshing(false);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function addStudent(key) {
    let toCheck = props.route.params.isCourse ? "courses" : "classes";
    setLoading2(true);
    firestore_ref
      .doc(key)
      .update({
        [toCheck]: firebase.firestore.FieldValue.arrayUnion(
          props.route.params.addId
        ),
      })
      .then((studentsDoc) => {
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
        data={students}
        refreshing={refreshing}
        onRefresh={getStudents}
        renderItem={({ item }) => (
          <Item
            body={
              <View>
                <Text style={{ color: "white" }}>
                  Student Name: {item.username}
                </Text>
                <Text style={{ color: "white" }}>
                  Registration Number: {item.regno}
                </Text>
                <Text style={{ color: "white" }}>Email: {item.email}</Text>
              </View>
            }
            actions={
              <Button
                rounded
                danger
                onPress={() => addStudent(item.key)}
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
