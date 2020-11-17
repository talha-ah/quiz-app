

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



