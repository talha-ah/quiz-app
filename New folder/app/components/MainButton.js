import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../config/colors';

const MainButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
      
      flexDirection:'column',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
   // marginHorizontal:10,
    marginVertical:10,
  //  transform:[ {translateY: -50}],
    height:60,
    width:250,
    borderColor:'#4b0082',
    borderWidth:5
    
    
  },
  buttonText: {
    color: 'white',
  
    fontSize: 24,
    textAlign:'center',
    alignContent:'center'

    //marginVertical:10

  }
});

export default MainButton;
