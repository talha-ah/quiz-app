import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";
import AddClassScreen from "../screens/AddClassScreen";
import AddCourseScreen from "../screens/AddCourseScreen";
import AssignQuizScreen from "../screens/AssignQuizScreen";
import ViewReportScreen from "../screens/ViewReportScreen";
import InviteScreen from "../screens/InviteScreen";
import TakeQuizWait from "../screens/TakeQuizWait";
import AddQuestionScreen from "../screens/AddQuestionsScreen";
import QuestionsScreen from "../screens/QuestionsScreens";
import CourseEditScreen from "../screens/CourseEditScreen";
import ViewQuestionsScreen from "../screens/ViewQuestionsScreen";
import SetTimerScreen from "../screens/SetTimerScreen";
import ClassEditScreen from "../screens/ClassEditScreen";
import ClassSelection from "../screens/ClassSelection";
import AddStudentScreen from "../screens/AddStudentScreen";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CourseUpdateScreen from "../screens/CourseUpdateScreen";
import ClassUpdateScreen from "../screens/ClassUpdateScreen";


const Stack = createStackNavigator();

const TeacherNavigator = () => (
  
    <Stack.Navigator>
      <Stack.Screen
        name="Teacher portal"
        component={MainScreen}
        options={{ headerShown: true}}
      />
      <Stack.Screen name="AddClassScreen" component={AddClassScreen} />
      <Stack.Screen name="AddCourseScreen" component={AddCourseScreen} />
      <Stack.Screen name="AssignQuizScreen" component={AssignQuizScreen} />
      <Stack.Screen name="ViewReportScreen" component={ViewReportScreen} />
      <Stack.Screen name="InviteScreen" component={InviteScreen} />
       <Stack.Screen name="MainScreen" component={MainScreen} /> 
      <Stack.Screen name="AddQuestionScreen" component={AddQuestionScreen} />
      <Stack.Screen name="QuestionsScreen" component={QuestionsScreen} />
      <Stack.Screen name="CourseEditScreen" component={CourseEditScreen} />
      <Stack.Screen name="CourseUpdateScreen" component={CourseUpdateScreen} />
      <Stack.Screen name="ClassUpdateScreen" component={ClassUpdateScreen} />
      <Stack.Screen name="TakeQuizWait" component={TakeQuizWait} />
      <Stack.Screen name="ViewQuestionsScreen" component={ViewQuestionsScreen} />
      <Stack.Screen name="SetTimerScreen" component={SetTimerScreen} />
      <Stack.Screen name="ClassEditScreen" component={ClassEditScreen} />
      <Stack.Screen name="ClassSelection" component={ClassSelection} />
      <Stack.Screen name="AddStudentScreen" component={AddStudentScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
       <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} 
       options={{ headerLeft: null}} />
      
      

    </Stack.Navigator>
  
);

export default TeacherNavigator;
      
     


