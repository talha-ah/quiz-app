


import React from "react";
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import ParentNavigator from "./app/navigation/ParentNavigation";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";


export default function App() {
  return(
  <NavigationContainer>
   <ParentNavigator />
   </NavigationContainer>
  )};





// import React ,{useState, useEffect} from "react";
// import { AppLoading } from 'expo';
// import { Container, Text } from 'native-base';
// import * as Font from 'expo-font';
// import { Ionicons } from '@expo/vector-icons';
// import ParentNavigator from "./app/navigation/ParentNavigation";
// import { NavigationContainer } from "@react-navigation/native";
// import * as firebase from "firebase";
// import { createStackNavigator } from "@react-navigation/stack";

// import ForgetButtonScreen from "./app/screens/ForgetButtonScreen";
// import TeacherReg from "./app/screens/TeacherReg";

// import MainScreen from "./app/screens/MainScreen";
// import AddClassScreen from "./app/screens/AddClassScreen";
// import AddCourseScreen from "./app/screens/AddCourseScreen";
// import AssignQuizScreen from "./app/screens/AssignQuizScreen";
// import ViewReportScreen from "./app/screens/ViewReportScreen";
// import InviteScreen from "./app/screens/InviteScreen";
// import TakeQuizWait from "./app/screens/TakeQuizWait";
// import AddQuestionsScreen from "./app/screens/AddQuestionsScreen";
// import QuestionsScreens from "./app/screens/QuestionsScreens";
// import CourseEditScreen from "./app/screens/CourseEditScreen";
// import ViewQuestionsScreen from "./app/screens/ViewQuestionsScreen";
// import SetTimerScreen from "./app/screens/SetTimerScreen";
// import ClassEditScreen from "./app/screens/ClassEditScreen";
// import ClassSelection from "./app/screens/ClassSelection";
// import AddStudentScreen from "./app/screens/AddStudentScreen";
// import LoginScreen from "./app/screens/LoginScreen";
// import WelcomeScreen from "./app/screens/WelcomeScreen";
// import RegisterScreen from "./app/screens/RegisterScreen";
// import CourseUpdateScreen from "./app/screens/CourseUpdateScreen";
// import ClassUpdateScreen from "./app/screens/ClassUpdateScreen";

// import StudentMain from "./app/screens/StudentMain";
// import TakeQuizScreen from "./app/screens/TakeQuizScreen";
// import NotificationScreen from "./app/screens/NotificationScreen";

// import StudentReport from "./app/screens/StudentReport";

// import LoadingScreen from "./app/screens/LoadingScreen";


// export default function App() {
//   const Stack = createStackNavigator();

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   useEffect(async () => {  
//     let user_data = await _retrieveData('userData');
// 	if(user_data != "" && user_data != null)
// 	setIsLoggedIn(true)
// 	else
// 	setIsLoggedIn(false)	

//   },[])
  
//    _retrieveData = async (key) => {
//     try {
//       const value = await AsyncStorage.getItem(key);
//       if (value !== null) {
//         // We have data!!
//         console.log(value);
// 	return value;
//       }else{
// 	return null
// 	}
//     } catch (error) {
//       // Error retrieving data
//     }
//   };


//   return(
//   <NavigationContainer>
//    {/* <ParentNavigator /> */}
//    {!isLoggedIn ? (
//    <Stack.Navigator>
//       <Stack.Screen
//         name="Welcome"
//         component={WelcomeScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen name="Loading" component={LoadingScreen} />
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Register" component={RegisterScreen} />
//       <Stack.Screen name="ForgetButtonScreen" component={ForgetButtonScreen} />
//       <Stack.Screen name="TeacherReg" component={TeacherReg} />
//     </Stack.Navigator>
//    ):(
//     <Stack.Navigator>
//     <Stack.Screen
//       name="Teacher portal"
//       component={MainScreen}
//       options={{ headerShown: true}}
//     />

//     <Stack.Screen name="AddClassScreen" component={AddClassScreen} />
//     <Stack.Screen name="AddCourseScreen" component={AddCourseScreen} />
//     <Stack.Screen name="AssignQuizScreen" component={AssignQuizScreen} />
//     <Stack.Screen name="ViewReportScreen" component={ViewReportScreen} />
//     <Stack.Screen name="InviteScreen" component={InviteScreen} />
//      <Stack.Screen name="MainScreen" component={MainScreen} />
//      <Stack.Screen name="AddQuestionsScreen" component={AddQuestionsScreen} />
//     <Stack.Screen name="QuestionsScreens" component={QuestionsScreens} />

//      <Stack.Screen name="CourseEditScreen" component={CourseEditScreen} />
//     <Stack.Screen name="CourseUpdateScreen" component={CourseUpdateScreen} />
//     <Stack.Screen name="ClassUpdateScreen" component={ClassUpdateScreen} />
//     {/* <Stack.Screen name="QuestionUpdateScreen" component={QuestionUpdateScreen} /> */}
//     <Stack.Screen name="TakeQuizWait" component={TakeQuizWait} />
//     <Stack.Screen name="ViewQuestionsScreen" component={ViewQuestionsScreen} />
//     <Stack.Screen name="SetTimerScreen" component={SetTimerScreen} />
//     <Stack.Screen name="ClassEditScreen" component={ClassEditScreen} />
//     <Stack.Screen name="ClassSelection" component={ClassSelection} />
//     <Stack.Screen name="AddStudentScreen" component={AddStudentScreen} />
//     <Stack.Screen name="Login" component={LoginScreen} />
//     <Stack.Screen name="Register" component={RegisterScreen} />
//      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} 
//      options={{ headerLeft: null}}
     
//     />

// <Stack.Screen
//         name="StudentPortal"
//         component={StudentMain}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen name="TakeQuizScreen" component={TakeQuizScreen} />
//       <Stack.Screen name="NotificationScreen" component={NotificationScreen} />

//       <Stack.Screen name="StudentReport" component={StudentReport} />


//   </Stack.Navigator>
  
  
//    )}
//    </NavigationContainer>
//   )};