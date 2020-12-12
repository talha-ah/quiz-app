import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "../screens/Teacher/MainScreen";

import Classes from "../screens/Teacher/Classes";
import AddClass from "../screens/Teacher/AddClass";
import ViewClass from "../screens/Teacher/ViewClass";

import Courses from "../screens/Teacher/Courses";
import AddCourse from "../screens/Teacher/AddCourse";
import ViewCourse from "../screens/Teacher/ViewCourse";

import Quizzes from "../screens/Teacher/Quizzes";
import ViewQuiz from "../screens/Teacher/ViewQuiz";
import AddQuiz from "../screens/Teacher/AddQuiz";

import AddQuestion from "../screens/Teacher/AddQuestion";
import Questions from "../screens/Teacher/Questions";

import StudentsList from "../screens/Teacher/StudentsList";

const Stack = createStackNavigator();

const TeacherNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MainSreen"
      component={MainScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen name="Classes" component={Classes} />
    <Stack.Screen name="AddClass" component={AddClass} />
    <Stack.Screen name="ViewClass" component={ViewClass} />

    <Stack.Screen name="Courses" component={Courses} />
    <Stack.Screen name="AddCourse" component={AddCourse} />
    <Stack.Screen name="ViewCourse" component={ViewCourse} />

    <Stack.Screen name="Quizzes" component={Quizzes} />
    <Stack.Screen name="AddQuiz" component={AddQuiz} />
    <Stack.Screen name="ViewQuiz" component={ViewQuiz} />

    <Stack.Screen name="Questions" component={Questions} />
    <Stack.Screen name="AddQuestion" component={AddQuestion} />

    <Stack.Screen name="StudentsList" component={StudentsList} />
  </Stack.Navigator>
);

export default TeacherNavigator;
