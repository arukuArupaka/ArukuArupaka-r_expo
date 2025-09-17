import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const LargeAppListItem = (props) => {
  return (
    <TouchableOpacity
      style={{
        height: 75,
        width: 320,
        borderColor: props.color,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        margin: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
      }}
      onPress={() => {
        props.test.navigation.navigate(props.jumpPage);
      }}
    >
      {props.item
        ? typeof props.item === "function"
          ? props.item()
          : props.item
        : null}
      <Text
        style={{ fontSize: 20, textAlign: "center", flex: 1, marginLeft: 8 }}
        numberOfLines={1}
      >
        {props.appName}
      </Text>
    </TouchableOpacity>
  );
};

export default LargeAppListItem;
