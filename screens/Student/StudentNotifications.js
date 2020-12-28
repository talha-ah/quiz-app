import moment from "moment";
import { Button, Icon } from "native-base";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
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

  async function deleteNotification(item) {
    let userData = await AsyncStorage.getItem("userData");
    let userOBJ = JSON.parse(userData);
    let notificationsArray = notifications;
    notificationsArray = notificationsArray.filter((ite) => ite !== item);
    firestore_ref
      .doc(userOBJ.key)
      .update({
        notifications: notificationsArray,
      })
      .then((data) => setNotifications(notificationsArray))
      .catch((err) => console.log(err));
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
                {moment(getTime(item.quizz.quizDate.seconds)).format(
                  "YYYY-MM-DD"
                )}
              </Text>
              <Text style={styles.text}>
                Quiz Time:{" "}
                {moment(getTime(item.quizz.quizDateTime.seconds)).format(
                  "HH:mm"
                )}
              </Text>
            </View>
          }
          actions={
            <Button danger transparent onPress={() => deleteNotification(item)}>
              <Icon active name="trash" />
            </Button>
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
