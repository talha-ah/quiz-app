import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import MainScreen from "../screens/Teacher/MainScreen";
// import AddClassScreen from "../screens/Teacher/AddClassScreen";
// import AddCourseScreen from "../screens/Teacher/AddCourseScreen";
// import AssignQuizScreen from "../screens/Teacher/AssignQuizScreen";
// import QuizSelect from "../screens/Teacher/QuizSelect";
// import ViewFullQuestion from "../screens/Teacher/ViewFullQuestion";
// import ViewTFQuestion from "../screens/Teacher/ViewTFQuestion";
// import ClassEditScreen from "../screens/Teacher/ClassEditScreen";
// import CourseEditScreen from "../screens/Teacher/CourseEditScreen";
// import StudentsScreen from "../screens/Teacher/StudentsScreen";
// import QuestionsScreens from "../screens/Teacher/QuestionsScreens";
// import ViewQuestionsScreen from "../screens/Teacher/ViewQuestionsScreen";
// import AddQuestionsScreen from "../screens/Teacher/AddQuestionsScreen";
// import AddStudentScreen from "../screens/Teacher/AddStudentScreen";
// import ClassUpdateScreen from "../screens/Teacher/ClassUpdateScreen";
// import CourseUpdateScreen from "../screens/Teacher/CourseUpdateScreen";
// import TakeQuizWait from "../screens/Teacher/TakeQuizWait";
// import QuestionTUpdate from "../screens/Teacher/QuestionTUpdate";
// import SetTimerScreen from "../screens/Teacher/SetTimerScreen";
// import QuestionUpdateScreen from "../screens/Teacher/QuestionUpdateScreen";
// import StudentUpdateScreen from "../screens/Teacher/StudentUpdateScreen";
// import ViewReportScreen from "../screens/Teacher/ViewReportScreen";

import MainScreen from "../screens/Teacher/MainScreen";
import Classes from "../screens/Teacher/AddClassScreen";
import Courses from "../screens/Teacher/AddCourseScreen";
import Quizzes from "../screens/Teacher/AssignQuizScreen";
import ViewQuiz from "../screens/Teacher/QuizSelect";
import AddClass from "../screens/Teacher/ClassEditScreen";
import AddCourse from "../screens/Teacher/CourseEditScreen";
import AddQuiz from "../screens/Teacher/QuestionsScreens";
import AddQuestion from "../screens/Teacher/ViewFullQuestion";
import StudentsList from "../screens/Teacher/StudentsScreen";
// import AddQuestion2 from "../screens/Teacher/AddQuestion2";

const Stack = createStackNavigator();

const TeacherNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MainSreen"
      component={MainScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen name="AddClassScreen" component={Classes} />
    <Stack.Screen name="AddCourseScreen" component={Courses} />
    <Stack.Screen name="AssignQuizScreen" component={Quizzes} />
    <Stack.Screen name="QuizSelect" component={ViewQuiz} />
    <Stack.Screen name="ClassEditScreen" component={AddClass} />
    <Stack.Screen name="CourseEditScreen" component={AddCourse} />
    <Stack.Screen name="QuestionsScreens" component={AddQuiz} />
    <Stack.Screen name="ViewFullQuestion" component={AddQuestion} />
    <Stack.Screen name="StudentsScreen" component={StudentsList} />

    {/* <Stack.Screen name="ViewTFQuestion" component={ViewTFQuestion} />
    <Stack.Screen
      name="QuestionUpdateScreen"
      component={QuestionUpdateScreen}
    />
    <Stack.Screen name="StudentUpdateScreen" component={StudentUpdateScreen} />
    <Stack.Screen name="ViewReportScreen" component={ViewReportScreen} />
    <Stack.Screen name="AddQuestionsScreen" component={AddQuestionsScreen} />
    <Stack.Screen name="CourseUpdateScreen" component={CourseUpdateScreen} />
    <Stack.Screen name="ClassUpdateScreen" component={ClassUpdateScreen} />
    <Stack.Screen name="QuestionTUpdate" component={QuestionTUpdate} />
    <Stack.Screen name="TakeQuizWait" component={TakeQuizWait} />
    <Stack.Screen name="ViewQuestionsScreen" component={ViewQuestionsScreen} />
    <Stack.Screen name="SetTimerScreen" component={SetTimerScreen} />
    <Stack.Screen name="AddStudentScreen" component={AddStudentScreen} /> */}
  </Stack.Navigator>
);

export default TeacherNavigator;
