import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, FlatList, View } from "react-native";
import AppButton from "../../components/AppButton";
import { Container, Content } from "native-base";
import {
  AppForm as Form,
  AppFormField as FormField,
} from "../../components/forms";
import firebase from "../../config/firebaseConfig";
import RadioForm from "react-native-simple-radio-button";
var radio_props = [
  { label: "True", value: 0 },
  { label: "False", value: 1 },
];
function QuestionTUpdate({ route, navigation }) {
  const [QuestionArr, setQuestionArr] = useState([]);
  const [decision, setDecision] = useState(0);
  const [Question, setQuestion] = useState("");
  const [QuestionT, setQuestionT] = useState("");
  const [Answer, setAnswer] = useState("");
  const [checkboxState, setCheckboxState] = useState(false);

  const { key } = route.params;

  useEffect(() => {
    console.log("key: " + key);

    const UpdateQuestionT = [];
    firebase
      .firestore()
      .collection("QuestionTF")
      .get()
      .then((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          console.log(doc.data());
          if (doc.id == key)
            UpdateQuestionT.push({
              ...doc.data(),
              key: doc.id,
            });
        });

        setQuestionArr(UpdateQuestionT);
      });
  }, []);

  const save = (keys) => {
    console.log("save pressed");

    const datas = firebase.firestore();

    const batch = datas.batch();
    const arr = [
      {
        QuestionType: 0,
        QuestionT: QuestionT,

        Answer: Answer,
        quizKey: "",
        quizTitle: "",
      },
    ];

    arr.forEach((item) => {
      const collectionRef = datas.collection("QuestionTF").doc(keys);
      batch.set(collectionRef, item);
    });

    const result = batch.commit();
  };

  return (
    <ScrollView>
      <Container style={styles.container}>
        <Content style={styles.container}>
          <FlatList
            data={QuestionArr}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <Form
                  initialValues={{
                    QuestionT: item.QuestionT,

                    Answer: item.Answer,
                    quizKey: "",
                    quizTitle: "",
                  }}
                >
                  <FormField
                    maxLength={150}
                    name="QuestionT"
                    placeholder={item.QuestionT}
                    onChangeText={(text) => setQuestionT(text)}
                    value={QuestionT}
                  />
                  <View style={styles.container}></View>

                  <View style={styles.container}>
                    <View style={styles.container}>
                      <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        formHorizontal={true}
                        labelHorizontal={true}
                        buttonSize={20}
                        buttonOuterSize={30}
                        buttonColor={"tomato"}
                        selectedButtonColor={"tomato"}
                        labelStyle={{ left: -5 }}
                        onPress={(id) => {
                          console.log(id);
                          setDecision(id);
                        }}
                      />
                    </View>
                  </View>

                  <AppButton title="Save" onPress={() => save(key)} />
                </Form>
              </View>
            )}
          />
        </Content>
      </Container>
    </ScrollView>
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
    padding: 10,
    backgroundColor: "#465881",
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
export default QuestionTUpdate;
