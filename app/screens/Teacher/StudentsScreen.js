import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import { Button, Icon } from "native-base";

import firebase from "../../config/firebaseConfig";

function InviteScreen(props) {
  const firestore_ref = firebase.firestore().collection("InviteStudents");

  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const addStudent = [];
    firestore_ref
      .doc(props.route.params.classId)
      .get()
      .then((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          addStudent.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setStudent(addStudent);
        setLoading(false);
      });
  }, []);
  const updater = (key) => {
    props.navigation.navigate("StudentUpdateScreen", { key: key });
  };
  const deleteClasser = (key) => {
    firestore_ref
      .doc(key)
      .delete()
      .then((res) => {
        setStudent(student.filter((stu) => stu.key !== key));
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };
  const openTwoButtonAlert = (key) => {
    Alert.alert(
      "Delete Class",
      "Are you sure to delete it?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            deleteClasser(key);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return loading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      style={styles.container}
      data={student}
      renderItem={({ item }) => (
        <View
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
            Student Name: {item.StudentName}{" "}
          </Text>
          <Text style={{ color: "white" }}>
            Registration Number: {item.RegNumber}{" "}
          </Text>
          <Text style={{ color: "white" }}>Email: {item.Email} </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              bottom: 30,
            }}
          >
            <TouchableOpacity onPress={() => updater(item.key)}>
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
        </View>
      )}
      ListFooterComponent={() => (
        <Button style={styles.btn}>
          <Text
            style={styles.text}
            onPress={() => props.navigation.navigate("AddStudentScreen")}
          >
            Add Students
          </Text>
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
