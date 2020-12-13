import React from "react";
import ParentNavigator from "./navigation/ParentNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Setting a timer"]);

export default function App() {
  return (
    <NavigationContainer>
      <ParentNavigator />
    </NavigationContainer>
  );
}
