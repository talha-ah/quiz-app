import React from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { Container } from "native-base";
import AppButton from "../../components/AppButton";

const MainScreen = (props) => {
  return (
    <View style={styles.container}>
      <AppButton
        title="Classes"
        onPress={() => props.navigation.navigate("Classes")}
      />
      <AppButton
        title="Courses"
        onPress={() => props.navigation.navigate("Courses")}
      />
      <AppButton
        title="Quizzes"
        onPress={() => props.navigation.navigate("Quizzes")}
      />
      <AppButton
        title="Reports"
        onPress={() => props.navigation.navigate("GenerateReport")}
      />
      <AppButton
        title="Logout"
        onPress={async () => {
          await AsyncStorage.removeItem("userData");
          props.navigation.navigate("welcomeNav");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#465881",
  },
});
export default MainScreen;
