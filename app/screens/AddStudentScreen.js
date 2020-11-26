import React,{useState} from "react";
import { StyleSheet,ScrollView,Alert,ImageBackground,View } from "react-native";
import * as Yup from "yup";
import AppButton from "../components/AppButton";
import firebase from "../config/firebaseConfig";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  StudentName: Yup.string().required().min(1).label("Student Name"),
  RegNumber: Yup.number().required().min(1).max(10000).label("Registration Number"),
  Email: Yup.string().required().label(" Email"),

});



function AddStudentScreen() {
  const [StudentName, setStudentName] = useState('');

  const [RegNumber, setRegNumber] = useState('');

  const [Email, setEmail] = useState('');
  const setStForAsync=async(stData)=>
  {
    AsyncStorage.setItem('studentData',JSON.stringify(stData));
  }

  const  addInvitingStudent = async() => {
    
      console.log("add pressed");
      if(StudentName === "" ||Email=== ""||  RegNumber=== ""){
        
        console.log("write details");
        Alert.alert('write details ');
    
        }
        else{
          console.log("adding....");
  const datas=  firebase.firestore()
  
  const batch = datas.batch();
  const array=[{
   StudentName: StudentName,
   RegNumber:RegNumber,
   Email: Email,
  }
];

   array.forEach( (item)=> {
      const collectionRef =  datas.collection('InviteStudents').doc();
      batch.set(collectionRef, item);
      setStForAsync(item)
    });
    Alert.alert('Student data are inserted ');

  const result =  batch.commit();
        }}

  return (
    <ImageBackground
    blurRadius={1}
    style={styles.background}
   
  >
    <ScrollView>
     
        <View style={styles.container}>
      <Form
        initialValues={{
          StudentName: "",
          RegNumber:"",
          Email: "",
          
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <FormField maxLength={255} name="StudentName" placeholder="Student Name" 
         onChangeText={(text) => setStudentName( text )}
         value={StudentName}
        />
        <FormField
          
          maxLength={50}
          name="RegNumber"
          placeholder="Registration Number"
          onChangeText={(text) => setRegNumber( text )}
          value={RegNumber}
        />
     
        <FormField
         keyboardType="email-address"
         textContentType="emailAddress"
          name="Email"
          placeholder="Email"
          onChangeText={(text) => setEmail( text )}
          value={Email}
        />
        
        <AppButton title="Add " 
        
        
        onPress={
            addInvitingStudent
                          } /> 
        
      </Form>
      </View>
      </ScrollView>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor:'#465881'

  },
  container: {
    flex:1,
    justifyContent:"flex-end",
  
  },
    
});
export default AddStudentScreen;


// import React, { useState,useEffect,Component } from 'react';
// import { StyleSheet,ScrollView,ImageBackground,View } from "react-native";
// import * as Yup from "yup";
// import firebase from "../config/firebaseConfig";
// import {
//   AppForm as Form,
//   AppFormField as FormField,
//   AppFormPicker as Picker,
//   SubmitButton,
// } from "../components/forms";


// const validationSchema = Yup.object().shape({
//   StudentName: Yup.string().required().min(1).label("Student Name"),
//   RegNumber: Yup.string().required().min(1).max(10000).label("Registration Number"),
//   Email: Yup.string().required().label(" Email"),

// });



// function AddStudentScreen() {
//   const firestore_ref=firebase.firestore().collection('InviteStudents')
//     const [Email, setEmail] = useState('');

//     const [RegNumber, setRegNumber] = useState('');

//     const [StudentName, setStudentName] = useState('');
   
   

   
//     const  addStudent = () => {
//         //try{
//           console.log("add pressed");
//           if( Email=== "" ||RegNumber=== ""|| StudentName === ""){
         
//             console.log("write details");
//             Alert.alert('write details ');
        
//             }
//             else{
              
//                         const datas=firebase.firestore()
      
                  
//                  const batch = datas.batch();
//                   const array=[{
//                     Email: Email,
//                     RegNumber:RegNumber,
//                     StudentName:  StudentName ,
//                   }
//                 ];

//                 array.forEach( (item)=> {
//                     const collectionRef =  datas.collection('InviteStudents').doc();
//                     batch.set(collectionRef, item);
//                   });
                
//                 const result =   batch.commit();
      

                      
                    
//           }

//         }
       
//   return (
//     <ImageBackground
//     blurRadius={1}
//     style={styles.background}
   
//   >
//     <ScrollView>
     
//         <View style={styles.container}>
//       <Form
//         initialValues={{
//          Email: "",
//           RegNumber:"",
//           StudentName: "",
          
//         }}
//         onSubmit={(values) => console.log(values)}
//         validationSchema={validationSchema}
//       >
//          <FormField
//          keyboardType="email-address"
//          textContentType="emailAddress"
//           name="Email"
//           placeholder="Email"
//           onChangeText={(text) => setEmail( text )}
//           value={Email} />

//           <FormField
//           maxLength={50}
//           name="RegNumber"
//           placeholder="Student Id"
//           onChangeText={(text) => setRegNumber( text )}
//           value={RegNumber} />
        
     
//         <FormField
//           maxLength={50}
//           name="StudentName"
//           placeholder="Student Name"
//           onChangeText={(text) => setStudentName( text )}
//           value={StudentName} />
          
//         <SubmitButton title="Add" 
//         onPress={
//             addStudent
//                           } /> 
//       </Form>
//       </View>
//       </ScrollView>
//       </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     alignItems: "stretch",
//     backgroundColor:'#465881'

//   },
//   container: {
//     flex:1,
//     justifyContent:"flex-end",
  
//   },
    
// });
// export default AddStudentScreen;
