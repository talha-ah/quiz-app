//import { SearchBar } from 'react-native-elements';
import React from "react";
import { Button, Alert, Image, StyleSheet, View,Text } from "react-native";
import Screen from "../components/Screen";
import Header from "../components/Header"
import AppButton from "../components/AppButton";

const AssignQuizScreen = props => {
  // state = {
  //   search: '',
    
  // };

  // updateSearch = (search) => {
  //   this.setState({ search });
  // };

 
    //const { search } = this.state;
   // const { value } = this.state;

    return (

      <Screen style={styles.container}>
        <View style={styles.screen}>
       
        </View>
       
       



        <Text 
            style={styles.loginText}
           onPress={() => props.navigation.navigate("AddQuestionScreen")}
           >
            Quiz 1
        </Text>
        <View style ={styles.container}>
          
          </View>
        <Text 
            style={styles.loginText}
           onPress={() => props.navigation.navigate("AddQuestionScreen")}
           >
            Quiz 2
        </Text>
        <View style ={styles.container}>
          
          </View>
        <Text 
            style={styles.loginText}
           onPress={() => props.navigation.navigate("AddQuestionScreen")}
           >
            Quiz 3
        </Text>
        <View style ={styles.container}>
          
          </View>
        <Text 
            style={styles.loginText}
           onPress={() => props.navigation.navigate("AddQuestionScreen")}
           >
            Quiz 4
        </Text>
       
        

      </Screen>
    );
  }

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#465881',
  },
  loginText:{
    
    textAlignVertical: "center",
    textAlign: "center",
    color:'blue',
    fontSize: 18
     
  },
  screen: {
    flex: 1,
    marginBottom: 30,
    marginTop: 150
  },
  logo: {
    width: 450,
    height: 250,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    width: '70%',
    padding: "20%",
    alignSelf: "flex-end",
    borderRadius: 10

  },
  backbtn: {
    marginTop: 50,
    width: '70%',
    padding: "20%",


  }
});
export default AssignQuizScreen;
