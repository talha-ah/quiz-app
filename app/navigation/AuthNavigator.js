import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";

import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import WelcomeScreen from "../screens/Auth/WelcomeScreen";
import ForgetButtonScreen from "../screens/Auth/ForgetButtonScreen";
import TeacherReg from "../screens/Auth/TeacherReg";
import LoadingScreen from "../screens/LoadingScreen";

const Stack = createStackNavigator();

const AuthNavigator = (props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    let userData = await AsyncStorage.getItem("userData");
    if (userData) {
      userData = JSON.parse(userData);
      props.navigation.navigate(userData.flag === 0 ? "teacher" : "student");
    } else {
      setLoading(false);
    }
  }

  return loading ? (
    <LoadingScreen />
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgetButtonScreen" component={ForgetButtonScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="TeacherReg" component={TeacherReg} />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
