import AsyncStorage from "@react-native-community/async-storage";
import React ,{useState} from "react";
import { StyleSheet,ScrollView,ImageBackground,Alert,View } from "react-native";
import * as Yup from "yup";
import AppButton from "../components/AppButton";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import firebase from "../config/firebaseConfig";


const validationSchema = Yup.object().shape({
  coursetitle: Yup.string().required().min(1).label("Course Title"),
  creditHrs: Yup.number().required().min(1).max(10000).label("Credit Hrs"),
  coursecode: Yup.string().required().label("Course Code"),

});



function CourseEditScreen() {
  //const firestore_ref=firebase.firestore().collection('Courses')

  const [coursetitle,SetCoursetitle]=useState('')
  const [creditHrs,SetCreditHrs]=useState('')
  const [coursecode,SetCoursecode]=useState('')
  const [showLoading, setShowLoading] = useState(false);

  const  addCourse = () => {
   
//try{
  console.log("add pressed");
  if(coursetitle === "" ||creditHrs=== ""||  coursecode=== ""){
    //your error
  //  setShowLoading(true);
    console.log('Enter Valid details');
    Alert.alert('Enter Valid details');

    }
    else{
      const datas=firebase.firestore()
      
      const batch = datas.batch();
      const arr=[

    {
      coursetitle:coursetitle,
      creditHrs:creditHrs,
      coursecode:coursecode}];

       arr.forEach( (item)=> {
          const collectionRef =  datas.collection('Courses').doc();
          batch.set(collectionRef, item);
         
        });
      
      const result =  batch.commit();
      
    

  }

  };
  

  return (
    <ImageBackground
    blurRadius={1}
    style={styles.background}
    
  >
    <ScrollView>
     
        <View style={styles.container}>
      <Form
        initialValues={{
          coursetitle: "",
          creditHrs: "",
          coursecode: "",
          
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <FormField maxLength={255} name="coursetitle"
         placeholder="Course Title"
         onChangeText={(text) => SetCoursetitle( text )}
         value={coursetitle}
         />
        <FormField
          keyboardType="numeric"
          maxLength={1}
          name="creditHrs"
          placeholder="Credit Hrs"
          onChangeText={(text) => SetCreditHrs( text )}
          value={creditHrs}
        />
     
        <FormField
          maxLength={9}
          multiline
          name="coursecode"
          placeholder="Course Code"
          onChangeText={(text) => SetCoursecode( text )}
          value={coursecode}
        />
        <AppButton title="Add " 
        
        onPress={
          addCourse
                        }     
        /> 
        
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
export default CourseEditScreen;
