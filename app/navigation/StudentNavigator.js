import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StudentMain from "../screens/Student/StudentMain";
import TakeQuizScreen from "../screens/Student/TakeQuizScreen";
import NotificationScreen from "../screens/Student/NotificationScreen";
import ViewReportScreen from "../screens/Student/ViewReportScreen";
import StudentReport from "../screens/Student/StudentReport";

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
