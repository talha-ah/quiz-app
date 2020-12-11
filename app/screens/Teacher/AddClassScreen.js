import React, { useState, useEffect } from "react";
import {
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import { AppLoading } from "expo";
import { Container, Content, Button, Icon } from "native-base";

import firebase from "../../config/firebaseConfig";

function AddClassScreen(props) {
  const firestore_ref = firebase.firestore().collection("Class");

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  function getData() {
    setRefreshing(true);
    const classesArray = [];
    firestore_ref
      .orderBy("batchs", "desc")
      .get()
      .then((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          classesArray.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setClasses(classesArray);
        setLoading(false);
        setRefreshing(false);
        console.log(classesArray);
      });
  }

  const updater = (key) => {
    props.navigation.navigate("ClassUpdateScreen", { key: key });
  };

  const openTwoButtonAlert = (key) => {
    Alert.alert(
      "Delete Class",
      "Are you sure to delete it?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            deleteClasser(key);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };
  const deleteClasser = (key) => {
    firestore_ref
      .doc(key)
      .delete()
      .then((res) => {
        const newArrya = classes.filter((clasIn) => clasIn.key !== key);
        setClasses(newArrya);
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };

  return (
    <ScrollView>
      <Container style={styles.container}>
        {loading ? (
          <AppLoading />
        ) : (
          <Content>
            <FlatList
              data={classes}
              refreshing={refreshing}
              onRefresh={getData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.key}
                  style={{
                    backgroundColor: "#465881",
                    height: 90,
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "white",
                    borderRadius: 15,
                    padding: 10,
                    marginVertical: 10,
                  }}
                  onPress={() =>
                    props.navigation.navigate("StudentsScreen", {
                      classId: item.key,
                    })
                  }
                >
                  <Text style={{ color: "white" }}>Batch: {item.batchs}</Text>
                  <Text style={{ color: "white" }}>
                    Programme: {item.programme}
                  </Text>
                  <Text style={{ color: "white" }}>
                    Section: {item.section}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      bottom: 30,
                    }}
                  >
                    <TouchableOpacity
                      style={{}}
                      onPress={() => updater(item.key)}
                    >
                      <Text style={styles.align}>Update</Text>
                    </TouchableOpacity>
                    <Button
                      danger
                      transparent
                      onPress={() => openTwoButtonAlert(item.key)}
                    >
                      <Icon active name="trash" />
                    </Button>
                  </View>
                </TouchableOpacity>
              )}
            />
            <Button
              style={styles.btn}
              onPress={() => props.navigation.navigate("ClassEditScreen")}
            >
              <Text style={styles.text}>Add New Class</Text>
            </Button>
          </Content>
        )}
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#465881",
  },
  align: {
    color: "red",
  },
  btn: {
    backgroundColor: "#fc5c65",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
export default AddClassScreen;
