import React from "react";
import { View, StyleSheet } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import { Container } from "native-base";
import AppButton from "../../components/AppButton";

const MainScreen = (props) => {
  return (
    <Container style={styles.container}>
      <View style={styles.container}>
        <AppButton
          title="Classes"
          onPress={() => props.navigation.navigate("AddClassScreen")}
        />
        <AppButton
          title="Courses"
          onPress={() => props.navigation.navigate("AddCourseScreen")}
        />
        <AppButton
          title="Quizzes"
          onPress={() => props.navigation.navigate("AddQuestionsScreen")}
        />
        <AppButton
          title="Reports"
          onPress={() => props.navigation.navigate("ViewReportScreen")}
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
    backgroundColor: "#465881",
  },
});
export default MainScreen;
