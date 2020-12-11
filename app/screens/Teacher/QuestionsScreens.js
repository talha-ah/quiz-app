import React from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Button,
  Text,
  TextInput,
  Alert,
} from "react-native";

import RadioForm from "react-native-simple-radio-button";
import Screen from "../../components/Screen";
import { useState } from "react";

import firebase from "../../config/firebaseConfig";
import {
  Container,
  Header,
  Title,
  Content,
  Icon,
  Left,
  Right,
  Body,
  CheckBox,
} from "native-base";
//import {  } from "react-native-gesture-handler";

var radio_props = [
  { label: "MCQS", value: 0 },
  { label: "T/F", value: 1 },
];
var radio_props1 = [
  { label: "True", value1: 0 },
  { label: "False", value1: 1 },
];
state = {
  value: false,
  value1: false,
};

const QuestionsScreen = (props) => {
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
  const [quizTitle, setquizTitle] = useState("");
  const [quizKey, setquizKey] = useState("");
  const [questionArray, setquestionarray] = useState([]);

  const resetForm = () => {
    //ssetDecision(0)
    setQuestion("");
    setTQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    settOption1("");
    settOption2("");
    setAnswer("");
    setCheckboxState(false);
  };

  function _isChecked() {
    if (checkboxState) setCheckboxState(false);
    else setCheckboxState(true);
  }

  const saver = () => {
    if (decision === 0) {
      //mcqs
      if (
        (decision === 0 && Question === "") ||
        Option1 === "" ||
        Option2 === "" ||
        Option3 === "" ||
        Option4 === ""
      ) {
        //  setShowLoading(true);
        console.log("Enter Valid details");
        Alert.alert("Enter Valid details ");
      } else {
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
        // arr=questionArray;
        arr.forEach((q) => {
          const collectionQ = datas.collection("QuestionMcqs").doc();
          batch.set(collectionQ, q);
        });
        const result = batch.commit();
        //props.navigation.navigate("AddQuestionScreen")
      }
      resetForm();
    }
    if (decision === 1) {
      //mcqs
      if (decision === 1 && QuestionT === "") {
        //  setShowLoading(true);
        console.log("Enter Valid details");
        Alert.alert("Enter Valid details");
      } else {
        const datas = firebase.firestore();

        const batch = datas.batch();
        const arr = [
          {
            QuestionType: 1,
            QuestionT: QuestionT,
            Answer: Answer,
            quizKey: "",
            quizTitle: "",
          },
        ];
        // arr=questionArray;
        arr.forEach((q) => {
          const collectionQ = datas.collection("QuestionTF").doc();
          batch.set(collectionQ, q);
        });
        const result = batch.commit();
        //props.navigation.navigate("AddQuestionScreen")
      }
      resetForm();
    }

    console.log("saver pressed");
  };
  return (
    <ScrollView style={{ backgroundColor: "#465881" }}>
      <Screen style={styles.container}>
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

        {decision == 0 ? (
          <View style={{ alignItems: "center" }}>
            <View style={styles.container}></View>
            <Text style={{ color: "white" }}>Question:</Text>

            <TextInput
              style={styles.text}
              value={Question}
              placeholder="Write Question"
              multiline={true}
              onChangeText={(text) => {
                setQuestion(text);
              }}
            ></TextInput>

            <View style={styles.view}>
              <View style={styles.box1}>
                <TextInput
                  style={styles.text1}
                  value={Option1}
                  placeholder="option 1"
                  onChangeText={(text) => {
                    setOption1(text);
                  }}
                ></TextInput>
              </View>

              {/* <View style={styles.box2}> */}
              <TextInput
                style={styles.text1}
                value={Option2}
                placeholder="option 2"
                onChangeText={(text) => {
                  setOption2(text);
                }}
              ></TextInput>
              {/* </View> */}
            </View>

            <View style={styles.view}>
              {/* <View style={styles.box3}> */}
              <TextInput
                style={styles.text1}
                value={Option3}
                placeholder="option 3"
                onChangeText={(text) => {
                  setOption3(text);
                }}
              ></TextInput>
              {/* </View> */}
              {/* <View style={styles.box4}> */}
              <TextInput
                style={styles.text1}
                value={Option4}
                placeholder="option 4"
                onChangeText={(text) => {
                  setOption4(text);
                }}
              ></TextInput>
              {/* </View> */}
            </View>
            {/* <View style={styles.container}> */}
            <TextInput
              style={styles.text1}
              value={Answer}
              placeholder="Correct Answer"
              multiline={true}
              onChangeText={(text) => {
                setAnswer(text);
              }}
            ></TextInput>
            {/* </View> */}
            <View style={styles.container}>
              <Button style={styles.btn} title="Save" onPress={saver} />
            </View>
            <View style={{ top: 1 }}>
              <Button
                style={styles.btn}
                title="Next"
                onPress={() => props.navigation.navigate("QuizSelect")}
              />
            </View>
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <View style={styles.box}>
              <View style={styles.container}></View>
              <Text style={{ color: "white" }}>Question</Text>

              <TextInput
                style={styles.text}
                value={QuestionT}
                placeholder="Write Question"
                multiline={true}
                onChangeText={(text) => {
                  setTQuestion(text);
                }}
              ></TextInput>

              <View style={styles.container}></View>

              <View style={{ alignSelf: "center" }}>
                <RadioForm
                  radio_props={radio_props1}
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

              <View style={styles.container}>
                <View style={styles.container}></View>

                <View style={styles.container}>
                  <Button style={styles.btn} title="Save" onPress={saver} />
                  <View style={{ top: 20 }}>
                    <Button
                      style={styles.btn}
                      title="Next"
                      onPress={() => props.navigation.navigate("QuizSelect")}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </Screen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  view: {
    flex: 1,
    justifyContent: "space-around",
  },
  text: {
    height: 100,
    width: "100%",
    fontSize: 18,
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  text1: {
    height: 100,
    width: "50%",
    fontSize: 18,
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 50,
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
    borderRadius: 10,
    width: "100%",
  },
  box2: {
    marginTop: -37,
    alignSelf: "flex-end",
    borderRadius: 10,
    width: "100%",
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

  backbtn: {
    marginTop: 50,
    width: "70%",
    padding: "20%",
  },
});
export default QuestionsScreen;

/*import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text,Button,TextInput } from "react-native";
import AppButton from "../../components/AppButton";
import RadioForm from 'react-native-simple-radio-button';
import Screen from "../../components/Screen";
import {useState} from "react";



var radio_props = [{label:'MCQS', value:0}, {label:'T/F', value:1}]

state = {
    value:false
  };
function QuestionsScreen({ route, navigation }) {
    
    // var decision=0

    const [decision, setDecision] = useState(0)
    const [Question ,setQuestion]= useState('')
    const [questionArray ,setquestionarray]= useState([])
    return (
      <Screen style={styles.container}>
        <View style={styles.screen}>
       
    
    
         
    
        </View>
        <View style={styles.btn}>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            formHorizontal={true}
            labelHorizontal={true}
            buttonSize={20}
            buttonOuterSize={30}
            buttonColor={'tomato'}
            selectedButtonColor={'tomato'}
            labelStyle={{ left: -5 }}
  
            onPress={(id) => {
              console.log(id)
              setDecision(id)
              }}
          />
        </View>
       
        
        {decision==0 ? <View>
            <Text >
              Question
            </Text>
           <TextInput style ={styles.text}
           value = {Question}
           placeholder ="Write Question"
           multiline={true}
           onChangeText={(text) => {
             setQuestion(text)
           }} > 
             </TextInput>
             <View style ={styles.options}>
             <View style ={styles.option}></View>
             <View style ={styles.option2}></View>
             

             </View>
            

            </View>
            
            :
            <View>
    
           <Text>Hello</Text>
            </View>
            
            
          }

        <View>
        < Button style={styles.btn}
        title="Next"   onPress={() => {
          console.log("Next Pressed")
          //save your data
          var fullquestionObject = {question:Question, option1:yeygeyr}
          questionArray.push(fullquestionObject)
          //save array async storage.
          setQuestion('')
        }
          
        }/></View>
         <View>
        < Button style={styles.btn}
        title="Save"/>
        </View>
          </Screen>
        
    
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: '#c0c0c0',
    },
    options:{
height: '40%',
width:'100%',
backgroundColor:'blue',
marginTop: 20
    },
    option:{
      height: '50%',
      width:'100%',
      backgroundColor:'red'
    },
    option2:{
      height: '50%',
      width:'100%',
      backgroundColor:'yellow'
    },
    text:{
      height: 90,
      width :"100%",
    borderWidth: 1,
    borderColor: "red" 
      
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
      marginBottom: 20,
    },
    btn: {
      marginTop: 20,
      width: '70%',
      padding: "20%",
      alignSelf: "auto",
      borderRadius: 10
  
    },
  });
  
  export default QuestionsScreen;
  */
