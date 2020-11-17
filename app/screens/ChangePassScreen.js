/*import React from "react";

import * as Yup from "yup";
import { Image, StyleSheet} from "react-native";
import Screen from "../components/Screen";
import {
  AppForm ,
  AppFormField ,
  SubmitButton,
} from "../components/forms";
import { ScrollView } from "react-native-gesture-handler";
const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
    code: Yup.string().required().min(4).label("Code")
  });
  function ChangePassScreen(props) {
    return (
     <ScrollView>
       <ImageBackground
      blurRadius={1}
      style={styles.background}
      source={require("../assets/backgroundimage.jpg")}
    >
      <Screen style={styles.container}>
         <Image style={styles.logo} source={require("../assets/q.png")} />
         <AppForm
        initialValues={{name:"", email: "", password: "",code: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
       
        <AppFormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="UserName"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name=" password"
          placeholder=" Password"
          secureTextEntry
          textContentType="password"
        />
         <AppFormField
          autoCorrect={false}
          icon="keyboard"
          name="code"
          placeholder="Code"
        />
        
        
          
        <SubmitButton title="Submit" />
      </AppForm>
    </Screen>
    </ImageBackground></ScrollView>
    
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container: {
    padding: 10,
    backgroundColor: '#9a9a9a',
    
  },
  logo: {
    width: 450,
    height: 400,
   
    alignSelf: "center",
    
   
  }
  
});

export default ChangePassScreen;
*/