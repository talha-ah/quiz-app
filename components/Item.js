import React from "react";
import { TouchableOpacity, View } from "react-native";

function ClassList(props) {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        width: "100%",
        borderWidth: 1,
        borderRadius: 15,
        marginVertical: 10,
        borderColor: "white",
        backgroundColor: "#465881",
      }}
      onPress={props.onPress}
      disabled={!props.onPress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {props.body}
        {props.actions}
      </View>
    </TouchableOpacity>
  );
}

export default ClassList;
