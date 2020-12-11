import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Alert, View } from "react-native";
import firebase from "../../config/firebaseConfig";

import Screen from "../../components/Screen";
import { ListItem, ListItemDeleteAction } from "../../components/lists";

function NotificationScreen(props) {
  const [messages, setMessages] = useState([]);
  const firestore_ref = firebase.firestore().collection("Timers");

  useEffect(() => {
    const msger = [];
    firebase
      .firestore()
      .collection("Timers")
      .get()
      .then((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          console.log(doc.data());
          msger.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        console.log(msger);
        setMessages(msger);
      });
  }, []);

  const deleteNotification = (key) => {
      console.log("Notificationkey_" + key);
      const db = firestore_ref.doc(key);
      db.delete()
        .then((res) => {
          console.log("Item removed from database");
          ///  setMessages('');
        })
        .catch((err) => {
          Alert.alert(err);
        });
    },
    openTwoButtonAlert = (key) => {
      Alert.alert(
        "Delete Notification",
        "Are you sure to delete it?",
        [
          {
            text: "Yes",
            onPress: () => {
              deleteNotification(key);
            },
          },
          {
            text: "No",
            onPress: () => console.log("No item was removed"),
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
    };

  const handleDelete = (msg) => {
    openTwoButtonAlert(msg);
  };

  return (
    <Screen style={styles.background}>
      <View>
        <FlatList
          style={styles.background}
          data={messages}
          renderItem={({ item }) => (
            <ListItem
              style={styles.background}
              title="Notification"
              subTitle={item.msg}
              image={item.image}
              onPress={() => props.navigation.navigate("TakeQuizScreen")}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item.key)} />
              )}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#465881",
    color: "white",
  },
});

export default NotificationScreen;
