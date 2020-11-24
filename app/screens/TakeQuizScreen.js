import CountDown from 'react-native-countdown-component';

import {Text,View,ScrollView,StyleSheet,Button, Alert,FlatList,TouchableOpacity} from "react-native";
import Screen from "../components/Screen";
import RadioForm from 'react-native-simple-radio-button';

import React ,{useState,useEffect}from "react";



import firebase from "../config/firebaseConfig";
const TakeQuizScreen = props => {
  var radio_props = [{label:'Operating System', value:0}, {label:'Organizing System', value:1}]

   const [question, setQuestion] = useState([])
   useEffect(() => {
  
     const Viewer = [];
     firebase
       .firestore()
       .collection('QuizNo')
      //  .collection('Question').doc('QuestionTF').collection('tf')
      // 
      .get()
       .then((docSnapshot) => {
         
         docSnapshot.forEach((doc) => {
           console.log(doc.data());
           //if(doc.quizclass == "bcs")
           Viewer.push({
             ...doc.data(),
             key: doc.id,
           });
         });
         console.log(Viewer);
         setQuestion(Viewer);
       
       });
      }, []);
  
  
  return (
    <FlatList
    data={question}
    renderItem={({ item }) => (
      <View style={{backgroundColor:'#465881',height: 70, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity>
      <Text>Question: {item.Question} </Text>

      </TouchableOpacity>
      {/* <Text>Option 1: {item.Option1} </Text>
      <Text>Option 2: {item.Option2} </Text>
      <Text>Option 3: {item.Option3} </Text>
      <Text>Option 4: {item.Option4} </Text> */}

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
             decision=id
            }}
        />  



    </View>
  
  )}

/>
  
      

      // <CountDown
      //   until={60 * 10 + 30}
      //   size={30}
      //   onFinish={() => alert('Finished')}
      //   digitStyle={{backgroundColor: '#FFF'}}
      //   digitTxtStyle={{color: '#1CC625'}}
      //   timeToShow={['M', 'S']}
      //   timeLabels={{m: 'MM', s: 'SS'}}
      // />
     
      
    // </Screen>
    

    
  );
}

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
  marginTop: 0,
  width: '70%',
  padding: "15%",
  alignSelf: "flex-start",
  borderRadius: 10

},
backbtn: {
  marginTop: 50,
  width: '70%',
  padding: "20%",


}
});
export default TakeQuizScreen;

    // <Screen style={styles.container}>
     
    //   <View >
  
    //   <Text> Question:What is full form of OS ? </Text>
    //   <View style={styles.btn}>
         
    //   <RadioForm
    //       radio_props={radio_props}
    //       initial={0}
    //       formHorizontal={true}
    //       labelHorizontal={true}
    //       buttonSize={20}
    //       buttonOuterSize={30}
    //       buttonColor={'tomato'}
    //       selectedButtonColor={'tomato'}
    //       labelStyle={{ left: -5 }}

    //       onPress={(id) => {
    //         console.log(id)
    //          decision=id
    //         }}
    //     />
        
    //   </View>
    //  </View>
     
