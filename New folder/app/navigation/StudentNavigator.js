import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import StudentMain from "../screens/StudentMain";
import TakeQuizScreen from "../screens/TakeQuizScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ViewReportScreen from "../screens/ViewReportScreen"
//import Quiz from "../screens/Quiz";
import StudentReport from "../screens/StudentReport";

const Stack = createStackNavigator();

const StudentNavigator = () => (
  
    <Stack.Navigator>
      <Stack.Screen
        name="StudentPortal"
        component={StudentMain}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="TakeQuizScreen" component={TakeQuizScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="ViewReportScreen" component={ViewReportScreen} />
      <Stack.Screen name="StudentReport" component={StudentReport} />
    </Stack.Navigator>
  
);

export default StudentNavigator;
