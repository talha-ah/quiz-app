import React, {useState} from "react";

import * as Yup from "yup";
import { ImageBackground,Button,ActivityIndicator, Text,StyleSheet, ScrollView, Alert } from "react-native";
import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";

//import * as firebase from "firebase";
//import firestore from 'firebase/firestore';
//import Login from "./LoginScreen";
import firebase from "../config/firebaseConfig";
import AppButton from "../components/AppButton";
import { View } from "native-base";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  cpassword: Yup.string().required().min(4).label("Password"),
  regno: Yup.string().required().min(5).max(20).label("Registeration Number"),
  phonenumber: Yup.string().required().min(11).label("Phone Number"),
  classcode: Yup.string().required().min(2).max(10).label("Class Code"),
});

const RegisterScreen = props =>{ 
  //state = { username: "",email: "", password: "",cpassword: "",regno: "",phno: "",classcode: "", errorMessage: null };
  const firestore_ref=firebase.firestore()
  
  const [username,setUserName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [cpassword,setCPassword]=useState('')
  const [regno,setRegno]=useState('')
  const [phonenumber,setPhoneNumber]=useState('')
  const [classcode,setClasscode]=useState('')
  const [showLoading, setShowLoading] = useState(false);
const  handleSignUp = async() => {
  if(password !== cpassword){
    //your error
    setShowLoading(true);
    console.log("password donot match");
    Alert.alert(' password donot match')


  }
    else{
      setShowLoading(false);

      console.log("success password")
                  
  
  await
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res)=>{
      setShowLoading(false);
      const userdata=firestore_ref.collection('StudentUser').doc(res.user.uid)
      userdata.set({
          username:username,
          email:email,
          password:password,
          cpassword:cpassword,
          regno:regno,
          phonenumber:phonenumber,
          classcode:classcode
            })
      
      .then(() => {
      setShowLoading(false);
      console.log("successfully create user!!")})
  //    .then(() => navigation.navigate('Login')) 
       
    })
    
     .catch((error) => {
      setShowLoading(true);
      alert(error)});

    }
     if(username === "" ||email=== ""||  password=== "" || cpassword=== ""|| regno=== "" || phonenumber=== ""||  classcode=== ""){
      //your error
      setShowLoading(true);
      console.log("write details");
      Alert.alert('write details ');

      }
};
  return (
    <ImageBackground
      blurRadius={1}
      style={styles.background}
     
    >
    <ScrollView>
      <Screen style={styles.container}>
      
        <AppForm
          initialValues={{ username: "", email: "", password: "", cpassword: "",regno: "",phonenumber:"",  classcode: "" }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >

          <AppFormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="UserName"
            onChangeText={(text) => setUserName( text )}
            value={username}
          />
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
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="cpassword"
            placeholder="Confirm Password"
            secureTextEntry
            textContentType="password"
            onChangeText={(text) => setCPassword (text)}
            value={cpassword}
          />
          <AppFormField
            autoCorrect={false}
            icon="keyboard"
            name="registrationnumber"
            placeholder="Registration Number"
            onChangeText={(text) => setRegno(text)}
            value={regno}
          />
          <AppFormField
            autoCorrect={false}
            icon="phone"
            name="PhoneNumber"
            keyboardType="numeric"
            placeholder="Phone Number"
            onChangeText={(text) => setPhoneNumber(text)}
            value={phonenumber}
          />
          <AppFormField
            autoCorrect={false}
            icon="keyboard"
            name="classcode"
            placeholder="Class Code"
            onChangeText={(text) => setClasscode(text)}
            value={classcode}
            
          />
          <AppButton title="Register" 

            onPress= {
            handleSignUp   } 
          />

        
           <View>
           <Text 
            style={styles.loginText}
           onPress={() => navigation.navigate('Login')}
           >
            Already Registered? Click here to login
        </Text>
        </View>
       
        </AppForm>
       
      </Screen>
      {showLoading &&
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            }
    </ScrollView>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"flex-end",
  
  

  },
  loginText:{
    
    textAlignVertical: "center",
    textAlign: "center",
    color:'gray'
     
    
  },
  background: {
    backgroundColor:'#465881',
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
  
});

export default RegisterScreen;