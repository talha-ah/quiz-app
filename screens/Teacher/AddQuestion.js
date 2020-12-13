import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import AppButton from "../../components/AppButton";

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
  const [answer, setAnswer] = useState("1");
  const [loading, setLoading] = useState(false);

  const addQuestion = () => {
    if (
      question === "" ||
      answer === "" ||
      option1 === "" ||
      option2 === "" ||
      (questionType === "mcq" && (option3 === "" || option4 === ""))
    ) {
      alert("Fields are required!");
    } else {
      setLoading(true);
      const quizzId = props.route.params.quizzId;
      firestore_ref
        .add({
          quizzId,
          question,
          questionType,
          option1,
          option2,
          option3,
          option4,
          answer,
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
              placeholder="Option 1"
              onChangeText={(text) => setOption1(text)}
              value={option1}
            />
            <FormField
              name="option2"
              placeholder="Option 2"
              onChangeText={(text) => setOption2(text)}
              value={option2}
            />
            {questionType === 1 && (
              <FormField
                name="option3"
                placeholder="Option 3"
                onChangeText={(text) => setOption3(text)}
                value={option3}
              />
            )}
            {questionType === 1 && (
              <FormField
                name="option4"
                placeholder="Option 4"
                onChangeText={(text) => setOption4(text)}
                value={option4}
              />
            )}
            <FormField
              name="answer"
              maxLength={1}
              placeholder="Answer Number"
              keyboardType="decimal-pad"
              onChangeText={(text) => setAnswer(text)}
              value={answer}
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
    padding: 10,
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
