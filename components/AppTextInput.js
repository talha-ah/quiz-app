import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

function AppTextInput({ icon, rightIcon, rightOnPress, ...otherProps }) {
  return (
    <View style={styles.container}>
      {icon && (
        <View style={styles.icon}>
          <MaterialCommunityIcons
            size={20}
            name={icon}
            color={defaultStyles.colors.medium}
          />
        </View>
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, styles.input]}
        {...otherProps}
      />
      {rightIcon && (
        <TouchableOpacity
          style={styles.icon}
          onPress={rightOnPress}
          activeOpacity={8}
        >
          <MaterialCommunityIcons
            size={20}
            name={rightIcon}
            style={styles.icon}
            color={defaultStyles.colors.medium}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    width: 30,
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
});

export default AppTextInput;
