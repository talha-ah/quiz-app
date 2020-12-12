//import { SearchBar } from 'react-native-elements';
import React from "react";
import { Button, Alert, Image, StyleSheet, View, Text } from "react-native";
import Screen from "../../../components/Screen";
import AppButton from "../../../components/AppButton";

const AddQuestionsScreen = (props) => {
  // state = {
  //   search: '',

  // };

  // updateSearch = (search) => {
  //   this.setState({ search });
  // };

  //const { search } = this.state;
  // const { value } = this.state;

  return (
    <Screen style={styles.container}>
      <View style={styles.screen}></View>

      <AppButton
        title="Add Question"
        onPress={() => props.navigation.navigate("AddQuiz")}
      />

      <View style={styles.container}></View>
      <AppButton
        title="View Question"
        onPress={() => props.navigation.navigate("ViewQuestionsScreen")}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#465881",
  },
  loginText: {
    textAlignVertical: "center",
    textAlign: "center",
    color: "blue",
    fontSize: 18,
  },
  screen: {
    flex: 1,
    marginBottom: 30,
    marginTop: 150,
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
});
export default AddQuestionsScreen;
