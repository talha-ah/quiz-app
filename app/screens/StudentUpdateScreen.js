import React ,{useState,useEffect} from "react";
import { StyleSheet,ScrollView,ImageBackground,FlatList,Alert,View } from "react-native";
import * as Yup from "yup";
import AppButton from "../components/AppButton";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CourseEditScreen from "./CourseEditScreen";
import firebase from "../config/firebaseConfig";
import StudentMain from "./StudentMain";


// const validationSchema = Yup.object().shape({
//   coursetitle: Yup.string().required().min(1).label("Course Title"),
//   creditHrs: Yup.number().required().min(1).max(10000).label("Credit Hrs"),
//   coursecode: Yup.string().required().label("Course Code"),

// });



function StudentUpdateScreen({ route, navigation }) {
  //const firestore_ref=firebase.firestore().collection('Courses')

  const [StudentName,setStudentName]=useState('')
  const [RegNumber,setRegNumber]=useState('')
  const [Email,setEmail]=useState('')
  const [InviteStudents, setInviteStudents] = useState([])
  const { key } = route.params;

  useEffect(() => {
            console.log("key: "+key);

    const UpdateStudent = [];
    firebase
      .firestore()
      .collection("InviteStudents")
      .get()
      .then((docSnapshot) => {
        
        docSnapshot.forEach((doc) => {
          console.log(doc.data());
          if(doc.id == key)
          UpdateStudent.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        //console.log(UpdateCourse);
      //  console.warn(addCourse);
      
        setInviteStudents(UpdateStudent);
      
      });
      
  }, []);

  


  const  save = (keys) => {
//try{
  console.log("save pressed");
  if(StudentName === "" ||RegNumber=== ""||  Email=== ""){
    //your error
  //  setShowLoading(true);
    // console.log("write details");
    // Alert.alert('write details ');

    }
    else{
      const datas=firebase.firestore()
      
      const batch = datas.batch();
      const arr=[

    {
        StudentName:StudentName,
        RegNumber:RegNumber,
        Email:Email}];

       arr.forEach( (item)=> {
          const collectionRef =  datas.collection('InviteStudents').doc(keys)
          batch.update(collectionRef, item);
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
    <FlatList
     data={InviteStudents}
     renderItem={({ item }) => (
    
        <View style={styles.container}>
      <Form
        initialValues={{
          StudentName:"",
         RegNumber:"",
          Email: "",
          
        }}
       
      >
        <FormField maxLength={255} name="StudentName"
         placeholder={item.StudentName}
         onChangeText={(text) => setStudentName( text )}
         value={StudentName}
         />
        
     
        <FormField
          maxLength={9}
          multiline
          name="RegnNumber"
          placeholder={item.RegNumber}
          onChangeText={(text) => setRegNumber( text )}
          value={RegNumber}
        />
       
     <FormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            name="Email"
            placeholder={item.Email}
            textContentType="emailAddress"
            onChangeText={(text) => setEmail( text )}
            value={Email}
          />

        <AppButton title="Save" 
        
        onPress={ () => save(key)
                        }     
        /> 
        
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
    backgroundColor:'#465881'

  },
  container: {
    flex:1,
    justifyContent:"flex-end",
  
  },
    
});
export default StudentUpdateScreen;

// ADD Course

//  updater=(key)=>{props.navigation.navigate('CourseUpdateScreen',key);
//   }

// <TouchableOpacity onPress={() => updater(item.key)}>
//         <Text >Course Key: {item.key} </Text>
//         </TouchableOpacity>