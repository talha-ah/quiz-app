import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function LoadingScreen(props) {
  return (
    <View style={[styles.container, props.style]}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={{ color: "#fff" }}>Loading</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#465881",
  },
});
