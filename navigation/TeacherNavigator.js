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
import AddQuiz from "../screens/Teacher/AddQuiz";
import Questions from "../screens/Teacher/Questions";
import AddQuestion from "../screens/Teacher/AddQuestion";

import AddStudent from "../screens/Teacher/AddStudent";
import AddCourseIn from "../screens/Teacher/AddCourseIn";
import AddQuizIn from "../screens/Teacher/AddQuizIn";

import GenerateReport from "../screens/Teacher/GenerateReport";
import Report from "../screens/Teacher/Report";

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

    <Stack.Screen name="Questions" component={Questions} />
    <Stack.Screen name="AddQuestion" component={AddQuestion} />

    <Stack.Screen name="AddStudent" component={AddStudent} />
    <Stack.Screen name="AddCourseIn" component={AddCourseIn} />
    <Stack.Screen name="AddQuizIn" component={AddQuizIn} />

    <Stack.Screen name="GenerateReport" component={GenerateReport} />
    <Stack.Screen name="Report" component={Report} />
  </Stack.Navigator>
);

export default TeacherNavigator;
