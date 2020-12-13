import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";



function ForgetButton({ title, onPress, color = '#fc5c65' }) {
  return (
   <TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
   </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
 
  text: {
    color: '#fff',
    justifyContent:'center',
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ForgetButton;
