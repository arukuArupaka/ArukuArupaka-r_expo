import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const PostButton = ({ onPress, enabled }) => {
  return (
    <TouchableOpacity
      onPress={enabled ? onPress : undefined}
      disabled={!enabled}
      style={{
        position: "absolute",
        bottom: 50,
        alignSelf: "center",
        width: "40%",
        height: "8%",
        borderRadius: 10,
      }}
    >
      <LinearGradient
        colors={enabled ? ["#C4E8FF", "#45B8FF"] : ["#E0E0E0", "#838383"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          flex: 1,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 20,
            marginRight: 10,
          }}
        >
          投稿する
        </Text>
        <FontAwesome name="map-marker" size={40} color="#fff" />
      </LinearGradient>
    </TouchableOpacity>
  );
};
