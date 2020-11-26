import React, { Component } from "react";
import { SearchBar } from "react-native-elements";
import { StyleSheet, View, ImageBackground, Image } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col
} from "react-native-table-component";
import Screen from "../components/Screen";

export default class ExampleTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Title", "Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4"],
      tableTitle: ["Course 1", "Course 2", "Course 3", "Course 4"],
      tableData: [
        ["IMT", "10", "5", "7", "9"],
        ["IMT", "10", "5", "7", "9"],
        ["IMT", "10", "5", "7", "9"],
        ["IMT", "10", "5", "7", "9"]
      ]
    };
  }
  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    const state = this.state;
    return (
      <Screen style={styles.container}>
        <View style={styles.screen}></View>

        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#c8e1ff" }}>
            <Row
              data={state.tableHead}
              style={styles.head}
              textStyle={styles.text1}
            />
            <Rows data={state.tableData} textStyle={styles.text} />
          </Table>
        </View>
      </Screen>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#465881"
  },

  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6, color: "white" },
  text1: { margin: 6, fontWeight: "bold" }
});
