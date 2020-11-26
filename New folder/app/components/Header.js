import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../config/colors';
//import { Left } from 'native-base';

const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 30,

  },
  headerTitle: {
    color: 'white',
    fontSize: 17
  }
});

export default Header;
