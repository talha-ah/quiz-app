import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StudentMain from "../screens/Student/StudentMain";

import Quizzes from "../screens/Student/Quizzes";
import TakeQuiz from "../screens/Student/TakeQuiz";

import StudentReport from "../screens/Student/StudentReport";

const Stack = createStackNavigator();

const StudentNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="StudentPortal" component={StudentMain} />
    <Stack.Screen name="Quizzes" component={Quizzes} />
    <Stack.Screen name="TakeQuiz" component={TakeQuiz} />
    <Stack.Screen name="StudentReport" component={StudentReport} />
  </Stack.Navigator>
);

export default StudentNavigator;
