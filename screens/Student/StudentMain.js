import React from "react";
import { View, StyleSheet } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import { Container } from "native-base";
import AppButton from "../../components/AppButton";

const StudentMain = (props) => {
  return (
    <Container style={styles.container}>
      <View style={styles.container}>
        <AppButton
          title="Take Quiz"
          onPress={() => props.navigation.navigate("Quizzes")}
        />
        <AppButton
          title="Notifications"
          onPress={() => props.navigation.navigate("NotificationScreen")}
        />
        <AppButton
          title="Marksheet"
          onPress={() => props.navigation.navigate("StudentReport")}
        />
        <AppButton
          title="Logout"
          onPress={async () => {
            await AsyncStorage.removeItem("userData");
            props.navigation.navigate("welcomeNav");
          }}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#465881",
  },
});

export default StudentMain;
