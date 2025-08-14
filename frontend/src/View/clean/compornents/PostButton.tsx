import React from "react";
import { TouchableOpacity, Text } from "react-native";

export const PostButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: "absolute",
        bottom: 50,
        alignSelf: "center",
        backgroundColor: "#7ACCFF",
        width: "40%",
        height: "8%",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
        投稿する
      </Text>
    </TouchableOpacity>
  );
};
