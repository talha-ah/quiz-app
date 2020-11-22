import React ,{useState,useEffect}from "react";
import { Button,Text, Alert, StyleSheet, View ,FlatList} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import firebase from "../config/firebaseConfig";

const ViewQuestionScreen = props => {
 
   const [question, setQuestion] = useState([])

   
  

   useEffect(() => {
  
     const Viewer = [];
     firebase
       .firestore()
       .collection('Question').doc('QuestionMCQS').collection('Mcqs')
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
    
  const deleteQuestioner=(key)=> {
    console.log('quesionkey_'+key)
    const db = firebase
    .firestore()
    .collection('Question').doc('QuestionMCQS').collection('Mcqs').doc(key)
      db.delete().then((res) => {
          console.log('Item removed from database')
               }).catch((err)=>{Alert.alert(err)})
               
  },

  openTwoButtonAlert=(key)=>{  
    Alert.alert(
      'Delete Question',
      'Are you sure to delete it?',
      [
        {text: 'Yes', onPress: () => {deleteQuestioner(key)}},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }
  const updater=(key)=>{props.navigation.navigate('ClassUpdateScreen',{key:key});
  }

 
 

     return (
    <FlatList
    data={question}
    renderItem={({ item }) => (
      <View style={{backgroundColor:'#465881',height: 70, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity>
        <Text>Question: {item.Question} </Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={() => updater(item.key)}>
          <Text >Update </Text>
          </TouchableOpacity>

         <TouchableOpacity onPress={() => openTwoButtonAlert(item.key)}>
         <Text >Delete </Text>

        </TouchableOpacity>


      </View>
    
    )}

  />
     )}
  

 

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#465881',
  },
  text:{
fontSize:18
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
export default ViewQuestionScreen;




