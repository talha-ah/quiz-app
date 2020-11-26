import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import AppButton from "../components/AppButton";
import {useState} from "react";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

var radio_props = [{label:'Teacher', value:0}, {label:'Student', value:1}]
state = {
  value:false,
  
};
function WelcomeScreen({ route, navigation }) {

  const [decision, setDecision] = useState(0)
  
  return (
    <ImageBackground
      blurRadius={1}
      style={styles.background}
     
    >
      <View style={styles.logoContainer}>
       
        <Text style={styles.tagline}>DIGITAL QUIZ SYSTEM</Text>
      </View>
      
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
              setDecision(id)
              }}
          />


    
      <View style={styles.buttonsContainer}>
        <AppButton title="Login"
         onPress={() => navigation.navigate("Login", {flag:decision})
          }
        />
        

        {decision==0 ? 
        
        <AppButton title="Register" color="secondary"
          onPress={() => navigation.navigate("TeacherReg")}
        />
      
        :
        
        <AppButton title="Register" color="secondary"
        onPress={() => navigation.navigate("Register")}
      />
      
}
</View>
      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor:'#465881',
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 450,
    height: 400,
  },
  btn: {
    width: "40%",
    marginBottom: 7,
    paddingVertical: 50,
    paddingRight: 20,
    color: "white"
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 40,
    color: "white"
  },
});

export default WelcomeScreen;
