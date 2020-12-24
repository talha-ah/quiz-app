import React, { useState, useEffect, useRef } from "react";
import Constants from "expo-constants";
import { createStackNavigator } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-community/async-storage";

import StudentMain from "../screens/Student/StudentMain";

import Quizzes from "../screens/Student/Quizzes";
import TakeQuiz from "../screens/Student/TakeQuiz";
import StudentNotifications from "../screens/Student/StudentNotifications";
import firebase from "../config/firebaseConfig";

import StudentReport from "../screens/Student/StudentReport";

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Quiz Added!",
      body: "A new quiz is added.",
      data: { data: "goes here" },
    },
    trigger: null,
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const StudentNavigator = () => {
  const firestore_ref = firebase.firestore().collection("StudentUser");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {}
    );
    // await schedulePushNotification(data);
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  useEffect(() => {
    let unsubscribe;
    async function cl() {
      let userData = await AsyncStorage.getItem("userData");
      let userOBJ = JSON.parse(userData);
      // this.fireStore.collection('users').doc(`${uid}/notifications`)
      // .valueChanges()
      // .subscribe(data => console.log(data))

      unsubscribe = firestore_ref.doc(userOBJ.key).onSnapshot(function (doc) {
        console.log(userOBJ.email, "Notifications: ", doc.data().notifications);
        schedulePushNotification();
      });
    }
    cl();

    return () => unsubscribe && unsubscribe();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="StudentPortal" component={StudentMain} />
      <Stack.Screen name="Quizzes" component={Quizzes} />
      <Stack.Screen name="TakeQuiz" component={TakeQuiz} />
      <Stack.Screen name="StudentReport" component={StudentReport} />
      <Stack.Screen
        name="StudentNotifications"
        component={StudentNotifications}
      />
    </Stack.Navigator>
  );
};

export default StudentNavigator;
