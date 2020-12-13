import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Screen from "../../components/Screen";
import Button from "../../components/AppButton";

const StudentMain = (props) => {
  useEffect(async () => {
    let className = "bcs";

    console.log("Student Class: " + className);
  }, []);

  return (
    <Screen style={styles.container}>
      <View style={styles.screen}></View>
      <Button
        title="Take Quiz"
        onPress={() => props.navigation.navigate("TakeQuizScreen")}
      />
      <View style={styles.container}></View>
      <Button
        title="Notification"
        onPress={() => props.navigation.navigate("NotificationScreen")}
      />

      <View style={styles.container}></View>
      <Button
        title="Marksheet"
        onPress={() => props.navigation.navigate("StudentReport")}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#465881",
  },
  screen: {
    flex: 1,
    marginBottom: 30,
    marginTop: 150,
  },
  loginText: {
    textAlignVertical: "center",
    textAlign: "center",
    color: "blue",
    fontSize: 18,
  },
  logo: {
    width: 450,
    height: 250,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    width: "70%",
    padding: "20%",
    alignSelf: "flex-end",
    borderRadius: 10,
  },
  backbtn: {
    marginTop: 50,
    width: "70%",
    padding: "20%",
  },
});

export default StudentMain;
