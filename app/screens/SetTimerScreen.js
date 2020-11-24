import React,{useState} from "react";
import { Button,Text, Alert,TextInput, Image, StyleSheet, View ,ImageBackground} from "react-native";
import Screen from "../components/Screen";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import firebase from "../config/firebaseConfig";

import {Permissions,Notifications} from 'expo'

const SetTimerScreen = props => {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isSTimePickerVisible, setSTimePickerVisibility] = useState(false);
  const [isETimePickerVisible, setETimePickerVisibility] = useState(false);
  
  const [date, setDate] = useState('');
  const [stime, setSTime] = useState('');
  const [etime, setETime] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showSTimePicker = () => {
    setSTimePickerVisibility(true);
  };
  const hideSTimePicker = () => {
    setSTimePickerVisibility(false);
  };
  const showETimePicker = () => {
    setETimePickerVisibility(true);
  };
  const hideETimePicker = () => {
    setETimePickerVisibility(false);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  
  const  setter = () => {

  console.log("set pressed");
 
  if(date === "" ||stime=== ""||  etime=== ""){
    
  //  setShowLoading(true);
    console.log("Enter Valid details");
    Alert.alert('Enter Valid details');

    }
    else{
      const datas=firebase.firestore()
       const batch = datas.batch();
      const arr=[
    {date:date,
    stime:stime,
    etime:etime}];

       arr.forEach( (item)=> {
          const collectionRef =  datas.collection('Timers').doc();
          batch.set(collectionRef, item);
        });
        
      
      const result =  batch.commit();
      
      
      
    // props.navigation.navigate("ClassSelection");
  }
  };
   const handleDConfirm = (date) => {
    setDate(date);
    console.log( "date is ",date);
    hideDatePicker();
    hideETimePicker();
    hideSTimePicker();
  };
  
  const handleETConfirm = (time) => {
   
    setETime(time);
    console.log( "end time is ",time);
    hideDatePicker();
    hideETimePicker();
    hideSTimePicker();
  };
  
  const handleSTConfirm = (time) => {
  
    setSTime(time);
    console.log( "stime is ",time);
    
    hideDatePicker();
    hideETimePicker();
    hideSTimePicker();
    
  };
  // async function registerForPushNotificationsAsync(){
  //   const{status}= await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //   let finalStatus = status;
  //   if(status !=='granted'){
  //     const {status}= await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     finalStatus=status;
  //   }
  //   if(finalStatus = status){
  //     return;
  //   }
  //   let token= await Notifications.getExpoPushTokenAsync();
  //   return fetch(PUSH_ENDPOINT, {
  //     method:'POST',
  //     body:JSON.stringify({
  //     token: {
  //       value: token,
  //     }  
  //     })

  //   });
  // }

  return (
    <Screen style={styles.container}>

    <View>
      <Button title=" Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDConfirm}
        onCancel={hideDatePicker}
      />
     <Button title=" Start Time" onPress={showSTimePicker} />
       <DateTimePickerModal
        isVisible={isSTimePickerVisible}
        mode="time"
        onConfirm={handleSTConfirm}
        onCancel={hideSTimePicker}
      />
      <Button title="End Time" onPress={showETimePicker} />
       <DateTimePickerModal
        isVisible={isETimePickerVisible}
        mode="time"
        onConfirm={handleETConfirm}
        onCancel={hideETimePicker}
      />
      
      <Button title = "Set"  onPress={ setter  }
      ></Button>


      
      </View>
        
   

</Screen>
    

  );
}  

    {/*</Screen>

    return (

      <Screen style={styles.container}>
        

        <Text>Start Time </Text>
         <TextInput style ={styles.text}
        
         placeholder ="Set a Time"
        
         onChangeText={(text) => {
          
         }} > 

           </TextInput>
           <Text>End Time </Text>
         <TextInput style ={styles.text}
        
         placeholder ="Set a Time"
        
         onChangeText={(text) => {
          
         }} > 
         
           </TextInput>*/

    }
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#465881',
  },
  box:{
    width:"100%",
    padding:10
      },
      text:{
        height: 60,
        width :"100%",
      borderWidth: 1,
      borderColor: "black" 
        
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
export default SetTimerScreen;












/*import CountDown from 'react-native-countdown-component';
import * as React from 'react';
import {Text,View,ScrollView,StatusBar,StyleSheet} from "react-native";

const SetTimerScreen = props => {
  return(
<CountDown
        until={60 * 10 + 30}
        size={30}
        onFinish={() => alert('Finished')}
        digitStyle={{backgroundColor: '#FFF'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: 'MM', s: 'SS'}}
      />
  )}
      export default SetTimerScreen;


// //after pressing set timer move to class selection screen
// import React, { useState } from "react";
// import { Button, View } from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
 
// const Example = () => {
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
 
//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };
 
//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };
 
//   const handleConfirm = (date) => {
//     console.warn("A date has been picked: ", date);
//     hideDatePicker();
//   };
 
//   return (
//     <ImageBackground
//       blurRadius={1}
//       style={styles.background}
//       source={require("../assets/backgroundimage.jpg")}
//     >
//     <View>
//       <Button title="Show Date Picker" onPress={showDatePicker} />
//       <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="date"
//         onConfirm={handleConfirm}
//         onCancel={hideDatePicker}
//       />
//     </View>
//     </ImageBackground>
//   );
// };
// const styles = StyleSheet.create({
// background: {
//   flex: 1,
//   justifyContent: "flex-end",
//   alignItems: "center",
// },
// });
// export default Example;
*/