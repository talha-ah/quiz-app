import React, { useState, useEffect } from "react";
import {
  Alert,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  FlatList,
  ScrollView
} from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import firebase from "../config/firebaseConfig";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body
} from "native-base";
import { Table } from "react-native-table-component";

function AddClassScreen(props) {
  const firestore_ref = firebase.firestore().collection("Class");

  const [classed, setClassed] = useState([]);

  useEffect(() => {
    const addClasser = [];
    firebase
      .firestore()
      .collection("Class")
      .orderBy("batchs", "desc")
      .get()
      .then((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          console.log(doc.data());
          addClasser.push({
            ...doc.data(),
            key: doc.id
          });
        });
        console.log(addClasser);
        setClassed(addClasser);
        //console.log(addClasser);
      });
  }, []);

  const updater = (key) => {
    props.navigation.navigate("ClassUpdateScreen", { key: key });
  };

  const deleteClasser = (key) => {
      console.log("classkey_" + key);
      const db = firestore_ref.doc(key);
      db.delete()
        .then((res) => {
          console.log("Item removed from database");
          Alert.alert('Item removed from database ');

        })
        .catch((err) => {
          Alert.alert(err);
        });
    },
    openTwoButtonAlert = (key) => {
      Alert.alert(
        "Delete Class",
        "Are you sure to delete it?",
        [
          {
            text: "Yes",
            onPress: () => {
              deleteClasser(key);
            }
          },
          {
            text: "No",
            onPress: () => console.log("No item was removed"),
            style: "cancel"
          }
        ],
        {
          cancelable: true
        }
      );
    };

  return (
    <ScrollView>
      <Container style={styles.container}>
        <Content style={styles.container}>
          <FlatList
            data={classed}
            renderItem={({ item }) => (
              <ScrollView>
                <View
                  style={{
                    backgroundColor: "#465881",
                    height: 90,
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "white",
                    borderRadius: 15,
                    padding: 10,
                    marginVertical: 10
                  }}
                >
                  {/* <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}> */}

                  <TouchableOpacity>
                    <Text
                      style={{ color: "white" }}
                      onPress={() => props.navigation.navigate("StudentsScreen")}
                    >
                      Batch: {item.batchs}{" "}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Text
                      style={{ color: "white" }}
                      onPress={() => props.navigation.navigate("StudentsScreen")}
                    >
                      Programme: {item.programme}{" "}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Text
                      style={{ color: "white" }}
                      onPress={() => props.navigation.navigate("StudentsScreen")}
                    >
                      Section: {item.section}{" "}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      bottom: 30
                    }}
                  >
                    <TouchableOpacity
                      style={{}}
                      onPress={() => updater(item.key)}
                    >
                      <Text style={styles.align}>Update </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => openTwoButtonAlert(item.key)}
                    >
                      <Button
                        danger
                        transparent
                        style={{}}
                        onPress={() => openTwoButtonAlert(item.key)}
                      >
                        <Icon active name="trash" />
                      </Button>
                    </TouchableOpacity>
                  </View>
                
                </View>
              </ScrollView>
            )}
          />

          <Button style={styles.btn}>
            <Text
              style={styles.text}
              onPress={() => props.navigation.navigate("ClassEditScreen")}
            >
              Add Class
            </Text>
          </Button>
        </Content>
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#465881",
    padding: 10
  },
  align: {
    // alignSelf: "flex-end",
    // marginBottom: -9
    color: "red"
  },
  screen: {
    flex: 1,
    marginBottom: 30,
    marginTop: 150
  },
  loginText: {
    textAlignVertical: "center",
    textAlign: "center",
    color: "blue",
    fontSize: 18
  },

  btn: {
    backgroundColor: "#fc5c65",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
    marginVertical: 50
  },
  text: {
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold"
  }
});
export default AddClassScreen;
