import React from 'react';
import {
  View,
  StyleSheet,
  Button,Text
} from 'react-native';
import Screen from "../components/Screen";

const StudentMain = props => {
    
    return (
      <Screen style={styles.container}>
      <View style={styles.screen}>
     
      </View>

      <Text 
            style={styles.loginText}
           onPress={() => props.navigation.navigate('TakeQuizScreen')}
           >
            Take Quiz
        </Text>
        <View style ={styles.container}>
          
          </View>
        <Text 
            style={styles.loginText}
           onPress={() => props.navigation.navigate('NotificationScreen')}
           >
            Notifications
        </Text>
        <View style ={styles.container}>
          
          </View>
        <Text 
            style={styles.loginText}
           onPress={() => props.navigation.navigate('StudentReport')}
           >
            Marksheet
        </Text>
    
      

    </Screen>
  );
}
    
    const styles = StyleSheet.create({
      container: {
        padding: 10,
        backgroundColor: '#465881',
      },
      screen: {
        flex: 1,
        marginBottom: 30,
        marginTop: 150
      },
      loginText:{
    
        textAlignVertical: "center",
        textAlign: "center",
        color:'blue',
        fontSize: 18
         
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
    
    export default StudentMain;