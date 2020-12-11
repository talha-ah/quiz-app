import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  FlatList,
  Alert,
  View,
  TextInput,
} from "react-native";
import * as Yup from "yup";
import AppButton from "../../components/AppButton";

import {
  AppForm as Form,
  AppFormField as FormField,
} from "../../components/forms";
import firebase from "../../config/firebaseConfig";

function QuestionUpdateScreen({ route, navigation }) {
  const [QuestionArr, setQuestionArr] = useState([]);
  const [decision, setDecision] = useState(0);
  const [Question, setQuestion] = useState("");
  const [QuestionT, setTQuestion] = useState("");
  const [Option1, setOption1] = useState("");
  const [Option2, setOption2] = useState("");
  const [Option3, setOption3] = useState("");
  const [Option4, setOption4] = useState("");
  const [Answer, setAnswer] = useState("");
  const [tOption1, settOption1] = useState("");
  const [tOption2, settOption2] = useState("");
  const [checkboxState, setCheckboxState] = useState(false);

  const { key } = route.params;

  useEffect(() => {
    console.log("key: " + key);

    const UpdateQuestion = [];
    firebase
      .firestore()
      .collection("QuestionMcqs")
      .get()
      .then((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          console.log(doc.data());
          if (doc.id == key)
            UpdateQuestion.push({
              ...doc.data(),
              key: doc.id,
            });
        });

        setQuestionArr(UpdateQuestion);
      });
  }, []);

  const save = (keys) => {
    console.log("save pressed");

    const datas = firebase.firestore();

    const batch = datas.batch();
    const arr = [
      {
        QuestionType: 0,
        Question: Question,
        Option1: Option1,
        Option2: Option2,
        Option3: Option3,
        Option4: Option4,
        Answer: Answer,
        quizKey: "",
        quizTitle: "",
      },
    ];

    arr.forEach((item) => {
      const collectionRef = datas.collection("QuestionMcqs").doc(keys);
      batch.set(collectionRef, item);
    });
    Alert.alert("successfully updated!!");

    const result = batch.commit();
  };

  return (
    <ImageBackground blurRadius={1} style={styles.background}>
      <ScrollView>
        <FlatList
          data={QuestionArr}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Form
                initialValues={{
                  Question: item.Question,
                  Option1: item.Option1,
                  Option2: item.Option2,
                  Option3: item.Option3,
                  Option4: item.Option4,
                  Answer: item.Answer,
                  quizKey: "",
                  quizTitle: "",
                }}
              >
                {/* <TextInput style ={styles.text}
     value = {Question}
     placeholder ={item.Question}
     multiline={true}
     onChangeText={(text) => {
       setQuestion(text)
     }} > 
       </TextInput>
      */}
                <FormField
                  maxLength={150}
                  name="Question"
                  placeholder={item.Question}
                  onChangeText={(text) => setQuestion(text)}
                  value={Question}
                />
                <View style={styles.container}>
                  <View style={styles.box1}>
                    <TextInput
                      style={styles.text}
                      value={Option1}
                      placeholder={item.Option1}
                      onChangeText={(text) => {
                        setOption1(text);
                      }}
                    ></TextInput>
                  </View>

                  <View style={styles.box2}>
                    <TextInput
                      style={styles.text}
                      value={Option2}
                      placeholder={item.Option2}
                      onChangeText={(text) => {
                        setOption2(text);
                      }}
                    ></TextInput>
                  </View>
                </View>

                <View style={styles.container}>
                  <View style={styles.box3}>
                    <TextInput
                      style={styles.text}
                      value={Option3}
                      placeholder={item.Option3}
                      onChangeText={(text) => {
                        setOption3(text);
                      }}
                    ></TextInput>
                  </View>
                  <View style={styles.box4}>
                    <TextInput
                      style={styles.text}
                      value={Option4}
                      placeholder={item.Option4}
                      onChangeText={(text) => {
                        setOption4(text);
                      }}
                    ></TextInput>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <TextInput
                      style={styles.text}
                      value={Answer}
                      placeholder={item.Answer}
                      multiline={true}
                      onChangeText={(text) => {
                        setAnswer(text);
                      }}
                    ></TextInput>
                  </View>
                </View>

                <AppButton title="Save" onPress={() => save(key)} />
              </Form>
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
export default QuestionUpdateScreen;
