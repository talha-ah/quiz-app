import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  FlatList,
  View,
  Text,
} from "react-native";

import firebase from "../../config/firebaseConfig";

function ViewFullQuestion({ route, navigation }) {
  const [QuestionArray, setQuestionArray] = useState([]);
  const [decision, setDecision] = useState(0);

  const { key } = route.params;

  useEffect(() => {
    console.log("key: " + key);

    const FullQuestion = [];
    firebase
      .firestore()
      .collection("QuestionMcqs")
      .get()
      .then((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          console.log(doc.data());
          if (doc.id == key)
            FullQuestion.push({
              ...doc.data(),
              key: doc.id,
            });
        });

        setQuestionArray(FullQuestion);
      });
  }, []);

  return (
    <ImageBackground blurRadius={1} style={styles.background}>
      <ScrollView>
        <FlatList
          data={QuestionArray}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <View>
                <Text style={styles.text}>Question: {item.Question}</Text>
              </View>

              <View style={styles.box1}>
                <Text style={styles.text}>Option1: {item.Option1}</Text>
              </View>

              <View style={styles.box2}>
                <Text style={styles.text}>Option2: {item.Option2}</Text>
              </View>

              <View style={styles.box3}>
                <Text style={styles.text}>Option3: {item.Option3}</Text>
              </View>

              <View style={styles.box4}>
                <Text style={styles.text}>Option4: {item.Option4}</Text>
              </View>

              <View style={styles.box1}>
                <Text style={styles.text}>Answer: {item.Answer}</Text>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#465881",
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  box: {
    width: "100%",
    padding: 10,
  },
  radio: {
    alignSelf: "center",
  },
  text: {
    height: 100,
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
  },
  screen: {
    flex: 1,
    marginBottom: 30,
    marginTop: 150,
  },

  btn: {
    marginTop: 20,
    width: "70%",
    padding: "20%",
    alignSelf: "flex-end",
    borderRadius: 10,
  },
  box1: {
    marginTop: 20,
    alignSelf: "flex-start",
    borderRadius: 10,
    width: "40%",
    height: "20%",
  },
  box2: {
    marginTop: -37,
    alignSelf: "flex-end",
    borderRadius: 10,
    width: "40%",
  },
  box3: {
    marginTop: 10,
    alignSelf: "baseline",
    borderRadius: 10,
    width: "40%",
  },
  box4: {
    marginTop: -99,
    alignSelf: "flex-end",
    borderRadius: 10,
    width: "40%",
  },
});
export default ViewFullQuestion;
