import React ,{useState,useEffect}from "react";
import { Text,Alert, StyleSheet, View ,FlatList,TouchableOpacity} from "react-native";

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
import firebase from "../config/firebaseConfig";
import RadioForm from "react-native-simple-radio-button";
import AppButton from "../components/AppButton";

const ViewQuestionScreen = props => {
 
   const [question, setQuestion] = useState([])
   const [questionT, setQuestionT] = useState([])
   const [decision, setDecision] = useState(0);
   var radio_props = [
    { label: "MCQS", value: 0 },
    { label: "T/F", value: 1 }
  ];
   
   const firestore_ref = firebase.firestore().collection("QuestionMcqs");

   useEffect(() => {
  
     const Viewer = [];
     firebase
       .firestore()
       .collection('QuestionMcqs')
       .get()
       .then((docSnapshot) => {
         
         docSnapshot.forEach((doc) => {
           console.log(doc.data());
           Viewer.push({
             ...doc.data(),
             key: doc.id,
           });
         });
         console.log(Viewer);
         setQuestion(Viewer);
       
       });
      }, []);
      useEffect(() => {
  
        const ViewerTF = [];
        firebase
          .firestore()
          .collection('QuestionTF')
          .get()
          .then((docSnapshot) => {
            
            docSnapshot.forEach((doc) => {
              console.log(doc.data());
              ViewerTF.push({
                ...doc.data(),
                key: doc.id,
              });
            });
            console.log(ViewerTF);
            setQuestionT(ViewerTF);
          
          });
         }, []);
         

    
      const deleteQuestioner = (key) => {
        console.log("questionkey_" + key);
        const db = firestore_ref.doc(key);
        db.delete()
          .then((res) => {
            console.log("Item removed from database");
          })
          .catch((err) => {
            Alert.alert(err);
          });
      },
      openTwoButtonAlert = (key) => {
        Alert.alert(
          "Delete Question",
          "Are you sure to delete it?",
          [
            {
              text: "Yes",
              onPress: () => {
                deleteQuestioner(key);
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
      const updater = (key) => {
        props.navigation.navigate("QuestionUpdateScreen", { key: key });
      };
      const updaterT = (key) => {
        props.navigation.navigate("QuestionTUpdate", { key: key });
      };
    
 
 

     return (
      <Container style={styles.container}>
      <Content style={styles.container}>
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
         {decision == 0 ? 
    <FlatList
    data={question}
    renderItem={({ item }) => (
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
       
        <Text style={{ color: "white" }}>
                Question: {item.Question
                }
              </Text>
              
       
       
        <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  bottom: 30
                }}
              >
       <TouchableOpacity onPress={() => updater(item.key)}>
                  <Text style={styles.align}>Update </Text>
                </TouchableOpacity> 

                <TouchableOpacity onPress={() => openTwoButtonAlert(item.key)}>
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
    
    
    )}
    
         
  />
  
  :
  <FlatList
  data={questionT}
  renderItem={({ item }) => (
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
     
      <Text style={{ color: "white" }}>
              Question: {item.QuestionT
              }
            </Text>
     
     
      <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                bottom: 30
              }}
            >
     <TouchableOpacity onPress={() => updaterT(item.key)}>
                <Text style={styles.align}>Update </Text>
              </TouchableOpacity> 

              <TouchableOpacity onPress={() => openTwoButtonAlert(item.key)}>
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
  
  
  )}
       
/>
}
<View>
  
<AppButton title="Next"
            onPress={()=>
              props.navigation.navigate("SetTimerScreen")
            }     
          /> 
                </View>

     

  </Content>
    </Container>
     )}
  

 

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#465881',
  },
  text:{
fontSize:18
  },
  btn: {
    marginTop: 20,
    width: "70%",
    padding: "20%",
    alignSelf: "flex-end",
    borderRadius: 10
  },
  screen: {
    flex: 1,
    marginBottom: 30,
    marginTop: 150
  },
  logo: {
    width: 450,
    height: 250,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  align: {
    // alignSelf: "flex-end",
    // marginBottom: -9
    color: "red"
  },
  btn: {
    marginTop: 20,
    width: '70%',
    padding: "20%",
    alignSelf: "flex-end",
    borderRadius: 10

  },
  backbtn: {
    marginTop: 50,
    width: '70%',
    padding: "20%",


  }
});
export default ViewQuestionScreen