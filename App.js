import React from "react";
import ParentNavigator from "./app/navigation/ParentNavigation";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <ParentNavigator />
    </NavigationContainer>
  );
}
