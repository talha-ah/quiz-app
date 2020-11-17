import React from "react";
import Screen from "../components/Screen";
import {
    View,
    Text,
    ScrollView,
    
  } from 'react-native';
  const AssignFeedBackScreen= props => {
    return (

      <ScrollView>
          <ImageBackground
      blurRadius={1}
      style={styles.background}
     
    >
          <Screen>
              <View>
                  <Text> Selected class has been assigned the quiz questions</Text>
              </View>
              
          </Screen>
          </ImageBackground>
      </ScrollView>
       );
    };
    const styles = StyleSheet.create({
      background: {
        backgroundColor:'#465881',
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "stretch",
    
    
      }
    });
    export default AssignFeedBackScreen;