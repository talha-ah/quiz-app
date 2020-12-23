import React, { useState, useEffect } from "react";
import RadioForm from "react-native-simple-radio-button";
import { StyleSheet, Text, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import CountDown from "react-native-countdown-component";
import { CommonActions } from "@react-navigation/native";
import { Button } from "native-base";
import moment from "moment";

import firebase from "../../config/firebaseConfig";
import LoadingScreen from "../LoadingScreen";
import Item from "../../components/Item";

function getTime(seconds) {
  var curdate = new Date(null);
  curdate.setTime(seconds * 1000);
  return curdate.toLocaleString();
}

const timeLeft = (minutesInt, timeInt) => {
  const minutes =
    Number(minutesInt) -
    Number(
      moment
        .utc(moment(new Date()).diff(moment(new Date(getTime(timeInt)))))
        .format("mm")
    );
  return minutes;
};

function TakeQuiz(props) {
  const firestore_ref = firebase.firestore();

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(new Map());
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    getData();

    let minutes = timeLeft(
      props.route.params.quizItem.quizTime,
      props.route.params.quizItem.quizDateTime.seconds
    );
    const timer = setTimeout(() => {
      alert("Times Up");
      onSubmit();
    }, Number(Math.abs(minutes)) * 60000);
    return () => clearTimeout(timer);
  }, []);

  function getData() {
    const questionsList = [];
    firestore_ref
      .collection("Question")
      .where("quizzId", "==", props.route.params.quizItem.key)
      .get()
      .then((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          setAnswers(answers.set(doc.id, 1));
          questionsList.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setQuestions(questionsList);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }

  async function onSubmit() {
    let userData = await AsyncStorage.getItem("userData");
    let userOBJ = JSON.parse(userData);

    let obtained = 0;
    let total = questions.length;
    questions.map((question) => {
      if (Number(answers.get(question.key)) + 1 === Number(question.answer))
        obtained++;
    });
    setLoading2(true);
    firestore_ref
      .collection("StudentUser")
      .doc(userOBJ.key)
      .update({
        results: firebase.firestore.FieldValue.arrayUnion({
          quizzId: props.route.params.quizItem.key,
          obtained: obtained,
          total: total,
        }),
      })
      .then((docUpdate) => {
        alert("Quiz submitted succesfully!");
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "StudentPortal" }],
          })
        );
      })
      .catch((err) => {
        alert(err);
      });
  }

  return loading ? (
    <LoadingScreen />
  ) : (
    <FlatList
      style={styles.container}
      data={questions}
      ListEmptyComponent={
        <View>
          <Text style={styles.text}>No Data!</Text>
        </View>
      }
      stickyHeaderIndices={[0]}
      ListHeaderComponent={() => (
        <CountDown
          until={
            timeLeft(
              props.route.params.quizItem.quizTime,
              props.route.params.quizItem.quizDateTime.seconds
            ) * 60
          }
          onFinish={() => {
            alert("Times Up");
            onSubmit();
          }}
          size={20}
          digitStyle={{ backgroundColor: "#FFF" }}
          digitTxtStyle={{ color: "red" }}
          timeToShow={["M", "S"]}
          timeLabels={{ m: "MM", s: "SS" }}
          timeLabelStyle={{ color: "#fff", fontWeight: "bold" }}
          separatorStyle={{ color: "#fff" }}
          showSeparator
          style={{ marginTop: 10 }}
        />
      )}
      renderItem={({ item }) => (
        <Item
          body={
            <View>
              <Text style={styles.questionText}>Question: {item.question}</Text>
              <RadioForm
                radio_props={
                  item.questionType === 0
                    ? [
                        { label: item.option1, value: 0 },
                        { label: item.option2, value: 1 },
                      ]
                    : [
                        { label: item.option1, value: 0 },
                        { label: item.option2, value: 1 },
                        { label: item.option3, value: 2 },
                        { label: item.option4, value: 3 },
                      ]
                }
                initial={0}
                formHorizontal={false}
                labelHorizontal={true}
                buttonSize={20}
                buttonOuterSize={30}
                buttonColor={"tomato"}
                selectedButtonColor={"pink"}
                labelStyle={{ left: -5, color: "#fff" }}
                onPress={(id) => {
                  const newInstant = answers;
                  newInstant.set(item.key, id);
                  setAnswers(newInstant);
                }}
              />
            </View>
          }
        />
      )}
      ListFooterComponent={() => (
        <Button style={styles.btn} onPress={onSubmit} disabled={loading2}>
          <Text style={styles.text}>{loading2 ? "Submitting" : "Submit"}</Text>
        </Button>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    backgroundColor: "#465881",
  },
  text: {
    color: "#fff",
  },
  questionText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  answerText: {
    color: "#fff",
  },
  btn: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
    marginTop: 10,
    backgroundColor: "#fc5c65",
    marginBottom: 10,
  },
});
export default TakeQuiz;
