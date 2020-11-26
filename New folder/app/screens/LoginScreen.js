import { ImageBackground ,StyleSheet, View } from "react-native";
import React ,{useState, useEffect} from "react";
import * as Yup from "yup";
import { ScrollView,Button, Text } from "react-native";
import  AsyncStorage  from '@react-native-community/async-storage';
import AppButton from "../components/AppButton";
import { AppForm, AppFormField,SubmitButton } from "../components/forms";
//import auth from '@react-native-firebase/auth';
//import {firebase} from '@react-native-firebase/auth'
//import firestore from '@react-native-firebase/firestore'
//import * as firebase1 from "firebase";
import firebase from "../config/firebaseConfig";


import { Container, Header, Content, ListItem, CheckBox, Body } from 'native-base';





function LoginScreen(props ) {
  
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [classes,setclasses] = useState()
  const [data,setdata]= useState([])
 
  //  useEffect(async () => {  

  //   //Like this....Keep it simple

  // //  let studentdata = await AsyncStorage.getItem('studentData')
  // //  console.log(studentdata)
  //  },[])

   





  //   await _retrieveData();
  // },[])

  // _storeData = async (key, value) => {
  //   try {
  //     await AsyncStorage.setItem(
  //       '@MySuperStore:key',
  //       'I like to save it.'
  //     );
  //   } catch (error) {
  //     // Error saving data
  //   }
  // };

  // _retrieveData = async (key) => {
  //   try {
  //     const value = await AsyncStorage.getItem('userData');
  //     if (value !== null) {
  //       // We have data!!
  //       console.log(value);
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };

  const handleLogin = () => {
    //  const { email, password } = props;
    console.log('login pressed');
    const flag = props.route.params.flag;
    const navigate = props.navigation.navigate;
    const firestore_ref = firebase.firestore();
    

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (response) => {
        await AsyncStorage.setItem('userData', JSON.stringify(response));
        const doc = await firestore_ref.collection(flag === 0 ? "TeacherUser" : "StudentUser")
          .doc(response.user.uid)
          .get();

          console.log(response.user)

        if (doc.exists) { navigate(flag === 0 ? "teacher" : "student") }
        else { alert(`Not registered as a ${flag === 0 ? "teacher" : "student"}`); }
      })
      .catch((error) => { alert(error) });
  };
  return (
    
    <ImageBackground                                                       
    blurRadius={1}
    style={styles.background}
    
  >
    <ScrollView>
     
        <View style={styles.container}>
        <AppForm
          initialValues={{ email: "",  password: "" ,   classes:""}}
        
        >  
           <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
            onChangeText={(text) => setEmail( text )}
            value={email}
          />
          
         <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
            onChangeText={(text) => setPassword (text)}
            value={password}
          />
        
           <AppFormField
            autoCorrect={false}
            icon="keyboard"
            name="classes"
            placeholder="Class"
            onChangeText={(text) => setclasses(text)}
            value={classes}
            
          />
          <AppButton title="Login"
            onPress={
              handleLogin
            }     
          />
          
         

        </AppForm>
      
        </View>
        <Button style= {styles.btn}
        title="Forget Password"
        onPress={() => props.navigation.navigate('ForgetButtonScreen')}
      />
     
      <View>
          <Text 
            style={styles.loginText}
            onPress={() =>  props.navigation.navigate(props.route.params.flag==0 ? "TeacherReg":"Register")}>
          Don't have account? Click here.
        </Text> 
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
  loginText:{
    
    textAlignVertical: "center",
    textAlign: "center",
    color:'gray'
     
    
  },
  container: {
    marginBottom:30,
    flex:1,
    justifyContent:"flex-end",
  
  },
});

export default LoginScreen;