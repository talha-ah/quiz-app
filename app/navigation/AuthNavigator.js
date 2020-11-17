import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ForgetButtonScreen from "../screens/ForgetButtonScreen";
import TeacherReg from "../screens/TeacherReg";

import LoadingScreen from "../screens/LoadingScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgetButtonScreen" component={ForgetButtonScreen} />
      <Stack.Screen name="TeacherReg" component={TeacherReg} />
    </Stack.Navigator>

    
 
);

export default AuthNavigator;
