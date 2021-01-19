import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import AppButton from "../../components/AppButton";
import AsyncStorage from "@react-native-community/async-storage";

import firebase from "../../config/firebaseConfig";

import {
  AppForm as Form,
  AppFormField as FormField,
} from "../../components/forms";

const questionTypes = [
  { label: "True/False", value: 0 },
  { label: "MCQ Type", value: 1 },
];

function AddQuestion(props) {
  const firestore_ref = firebase.firestore().collection("Question");

  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState(0);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerWeight, setAnswerWeight] = useState("");
  const [loading, setLoading] = useState(false);

  const addQuestion = async () => {
    let userData = await AsyncStorage.getItem("userData");
    let userOBJ = JSON.parse(userData);
    if (
      question === "" ||
      answer === "" ||
      option1 === "" ||
      option2 === "" ||
      answerWeight === "" ||
      (questionType === "mcq" && (option3 === "" || option4 === "")) ||
      (questionType === "mcq" ? Number(answer) > 4 : Number(answer) > 2) ||
      Number(answer) === 0
    ) {
      alert("Fields are invalid!");
    } else {
      setLoading(true);
      firestore_ref
        .add({
          quizzes: [],
          question,
          questionType,
          option1,
          option2,
          option3,
          option4,
          answer,
          weight: Math.floor(answerWeight),
          teacherId: userOBJ.key,
        })
        .then((resData) => {
          props.navigation.goBack();
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  return (
    <View style={styles.background}>
      <ScrollView>
        <View style={styles.container}>
          <Form
            initialValues={{
              question: "",
              questionType: "radio",
              option1: "",
              option2: "",
              option3: "",
              option4: "",
              answer: "",
            }}
            onSubmit={(values) => console.log(values)}
          >
            <FormField
              name="question"
              placeholder="Question"
              onChangeText={(text) => setQuestion(text)}
              value={question}
            />
            <View style={styles.row}>
              <Text style={styles.text}>Question Type</Text>
              <RadioForm
                radio_props={questionTypes}
                initial={0}
                formHorizontal={true}
                labelHorizontal={true}
                buttonSize={20}
                buttonOuterSize={30}
                buttonColor={"tomato"}
                selectedButtonColor={"tomato"}
                labelStyle={{ left: -5 }}
                onPress={(id) => {
                  setQuestionType(id);
                }}
              />
            </View>
            <FormField
              name="option1"
              value={option1}
              placeholder="Option 1"
              onChangeText={(text) => setOption1(text)}
            />
            <FormField
              name="option2"
              value={option2}
              placeholder="Option 2"
              onChangeText={(text) => setOption2(text)}
            />
            {questionType === 1 && (
              <FormField
                name="option3"
                value={option3}
                placeholder="Option 3"
                onChangeText={(text) => setOption3(text)}
              />
            )}
            {questionType === 1 && (
              <FormField
                name="option4"
                value={option4}
                placeholder="Option 4"
                onChangeText={(text) => setOption4(text)}
              />
            )}
            <FormField
              name="answerWeight"
              value={answerWeight}
              placeholder="Weightage"
              keyboardType="decimal-pad"
              onChangeText={(text) => setAnswerWeight(text)}
            />
            <FormField
              name="answer"
              maxLength={1}
              value={answer}
              keyboardType="decimal-pad"
              placeholder="Answer Number"
              onChangeText={(text) => setAnswer(text)}
              onEndEditing={() => {
                if (Number(answer) <= 0 || Number(answer) > 4) {
                  setAnswer("1");
                }
              }}
            />
            <AppButton
              title={loading ? "Loading..." : "Add"}
              onPress={addQuestion}
              disabled={loading}
            />
          </Form>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#465881",
  },
  row: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 14,
  },
});
export default AddQuestion;
