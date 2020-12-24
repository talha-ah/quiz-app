import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";

import firebase from "../../config/firebaseConfig";
import LoadingScreen from "../LoadingScreen";
import Item from "../../components/Item";

function getTime(seconds) {
  var curdate = new Date(null);
  curdate.setTime(seconds * 1000);
  return curdate.toLocaleString();
}

function Notifications(props) {
  const firestore_ref = firebase.firestore().collection("StudentUser");

  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  async function getData() {
    setRefreshing(true);
    let userData = await AsyncStorage.getItem("userData");
    let userOBJ = JSON.parse(userData);

    const userDoc = await firestore_ref.doc(userOBJ.key).get();
    setNotifications(userDoc.data().notifications);
    setLoading(false);
    setRefreshing(false);
  }

  return loading ? (
    <LoadingScreen />
  ) : (
    <FlatList
      style={styles.container}
      data={notifications}
      refreshing={refreshing}
      onRefresh={getData}
      ListEmptyComponent={
        <View>
          <Text style={styles.text}>No notifications!</Text>
        </View>
      }
      keyExtractor={(item) => item.date.seconds + item.date.nanoseconds}
      renderItem={({ item }) => (
        <Item
          body={
            <View>
              <Text style={styles.text}>
                Quiz Title: {item.quizz.quizTitle}
              </Text>
              <Text style={styles.text}>
                Quiz Date:{" "}
                {moment(getTime(item.date.seconds)).format("YYYY-MM-DD")}
              </Text>
              <Text style={styles.text}>Status: seen</Text>
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
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fc5c65",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
});

export default Notifications;
