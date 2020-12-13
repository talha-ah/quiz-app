import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StudentMain from "../screens/Student/StudentMain";

import Quizzes from "../screens/Student/Quizzes";
import TakeQuiz from "../screens/Student/TakeQuiz";

import NotificationScreen from "../screens/Student/NotificationScreen";
import StudentReport from "../screens/Student/StudentReport";

const Stack = createStackNavigator();

const StudentNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="StudentPortal"
      component={StudentMain}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Quizzes" component={Quizzes} />
    <Stack.Screen name="TakeQuiz" component={TakeQuiz} />
    <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    <Stack.Screen name="StudentReport" component={StudentReport} />
  </Stack.Navigator>
);

export default StudentNavigator;
