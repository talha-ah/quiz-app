import React, { useState, useEffect } from "react";
import { Alert, Text, StyleSheet, View, FlatList } from "react-native";
import { Button, Icon } from "native-base";

import firebase from "../../config/firebaseConfig";
import LoadingScreen from "../LoadingScreen";

function QuestionsList(props) {
  const firestore_ref = firebase.firestore().collection("Question");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    setRefreshing(true);
    const questionsArray = [];
    firestore_ref
      .where("quizzes", "array-contains", props.route.params.quizz.key)
      .get()
      .then((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          questionsArray.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setQuestions(questionsArray);
        setLoading(false);
        setRefreshing(false);
      });
  }

  const deleteQuestion = (item) => {
    firestore_ref
      .doc(item.key)
      .update({
        quizzes: firebase.firestore.FieldValue.arrayRemove(
          props.route.params.quizz.key
        ),
      })
      .then((res) => {
        firebase
          .firestore()
          .collection("Quiz")
          .doc(props.route.params.quizz.key)
          .update({
            marks: firebase.firestore.FieldValue.increment(-item.weight),
            questions: firebase.firestore.FieldValue.increment(-1),
          })
          .then((quizDoc) => {
            const newArrya = questions.filter(
              (itmIn) => itmIn.key !== item.key
            );
            setQuestions(newArrya);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const openTwoButtonAlert = (item) => {
    Alert.alert(
      "Delete Question",
      "Are you sure to delete it?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            deleteQuestion(item);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <FlatList
      style={styles.container}
      data={questions}
      refreshing={refreshing}
      onRefresh={getData}
      ListEmptyComponent={
        <View>
          <Text style={styles.text}>No Data!</Text>
        </View>
      }
      renderItem={({ item }) => (
        <View
          key={item.key}
          style={{
            padding: 10,
            width: "100%",
            borderWidth: 1,
            borderRadius: 15,
            marginVertical: 10,
            borderColor: "white",
            backgroundColor: "#465881",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ color: "white" }}>Question: {item.question}</Text>
              <Text style={{ color: "white" }}>
                Type: {item.questionType === 0 ? "Radio" : "MCQ"}
              </Text>
              <Text style={{ color: "white" }}>Options 1: {item.option1}</Text>
              <Text style={{ color: "white" }}>Options 2: {item.option2}</Text>
              {item.questionType === 1 && (
                <Text style={{ color: "white" }}>
                  Options 3: {item.option3}
                </Text>
              )}
              {item.questionType === 1 && (
                <Text style={{ color: "white" }}>
                  Options 4: {item.option4}
                </Text>
              )}
              <Text style={{ color: "white" }}>Answer: {item.answer}</Text>
              <Text style={{ color: "white" }}>Weightage: {item.weight}</Text>
            </View>
            <Button
              danger
              transparent
              style={{ alignSelf: "center" }}
              onPress={() => openTwoButtonAlert(item)}
            >
              <Icon active name="trash" />
            </Button>
          </View>
        </View>
      )}
      ListFooterComponent={() => (
        <>
          <Button
            style={styles.btn}
            onPress={() =>
              props.navigation.navigate("AddQuizzQuestions", {
                quizzId: props.route.params.quizz.key,
              })
            }
          >
            <Text style={styles.text}>Add New Question</Text>
          </Button>
          <Button
            style={styles.btn}
            onPress={() =>
              props.navigation.navigate("QuizCourse", {
                quizz: props.route.params.quizz,
              })
            }
          >
            <Text style={styles.text}>Assign to Course</Text>
          </Button>
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#465881",
  },
  align: {
    color: "red",
  },
  btn: {
    marginTop: 10,
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
export default QuestionsList;
