import React, { useState, useEffect } from "react";
import {
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { Button, Icon } from "native-base";

import firebase from "../../config/firebaseConfig";
import LoadingScreen from "../LoadingScreen";
import AsyncStorage from "@react-native-community/async-storage";

function ClassList(props) {
  const firestore_ref = firebase.firestore().collection("Class");

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setRefreshing(true);
    let userData = await AsyncStorage.getItem("userData");
    let userOBJ = JSON.parse(userData);
    const classesArray = [];
    firestore_ref
      .where("teacherId", "==", userOBJ.key)
      .get()
      .then((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          classesArray.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setClasses(classesArray);
        setLoading(false);
        setRefreshing(false);
      });
  }

  const deleteClasser = (key) => {
    firestore_ref
      .doc(key)
      .delete()
      .then((res) => {
        const newArrya = classes.filter((clasIn) => clasIn.key !== key);
        setClasses(newArrya);
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
    <LoadingScreen />
  ) : (
    <FlatList
      style={styles.container}
      data={classes}
      refreshing={refreshing}
      onRefresh={getData}
      ListEmptyComponent={
        <View>
          <Text style={styles.text}>No Data!</Text>
        </View>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.key}
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
          onPress={() =>
            props.navigation.navigate("ViewClass", {
              classItem: item,
            })
          }
        >
          <Text style={{ color: "white" }}>Batch: {item.batch}</Text>
          <Text style={{ color: "white" }}>Programme: {item.programme}</Text>
          <Text style={{ color: "white" }}>Section: {item.section}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              bottom: 30,
            }}
          >
            <TouchableOpacity
              style={{}}
              onPress={() =>
                props.navigation.navigate("AddClass", { classItem: item })
              }
            >
              <Text style={styles.align}>Update</Text>
            </TouchableOpacity>
            <Button
              danger
              transparent
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
          onPress={() => props.navigation.navigate("AddClass")}
        >
          <Text style={styles.text}>Add New Class</Text>
        </Button>
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
  align: {
    color: "red",
  },
  btn: {
    marginTop: 10,
    backgroundColor: "#fc5c65",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
export default ClassList;
