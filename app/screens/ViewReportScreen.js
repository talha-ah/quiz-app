import React, { Component } from "react";
import { SearchBar } from "react-native-elements";
import { StyleSheet, View, Image } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col
} from "react-native-table-component";
import Screen from "../components/Screen";
import Header from "../components/Header";

export default class ExampleTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["RegID", "Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4"],

      tableData: [
        ["Sp17-Bcs-001", "10", "5", "7", "9"],
        ["Sp17-Bcs-007", "10", "5", "7", "9"],
        ["Sp17-Bcs-098", "10", "5", "7", "9"],
        ["Sp17-Bcs-123", "10", "5", "7", "9"]
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
              textStyle={{ textAlign: "center", fontWeight: "bold" }}
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
    padding: 5,
    backgroundColor: "#465881"
  },
  head: {
    height: 30,
    backgroundColor: "#f1f8ff"
  },
  wrapper: {
    flexDirection: "row"
  },
  title: {
    flex: 1,
    backgroundColor: "#f6f8fa"
  },
  row: {
    height: 28
  },
  text: {
    color: "white",
    textAlign: "center"
  },
  screen: {
    flex: 1,
    marginBottom: 30,
    marginTop: 10
  },
  logo: {
    width: 450,
    height: 250,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20
  }
});
