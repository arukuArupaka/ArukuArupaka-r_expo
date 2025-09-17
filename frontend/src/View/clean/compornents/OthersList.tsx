import React from "react";
import { View, Text } from "react-native";

export function OthersList({ others }) {
  return (
    <View style={{ gap: 8 }}>
      {others.map((u, idx) => (
        <View
          key={u.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
            borderRadius: 10,
            backgroundColor: "#F9F9F9",
          }}
        >
          <Text
            style={{
              width: 28,
              textAlign: "center",
              fontFamily: "ZenMaruGothicBold",
              color: "#4C4C4C",
            }}
          >
            {idx + 4}
          </Text>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: "#EEE",
              marginRight: 10,
            }}
          />
          <Text style={{ flex: 1, fontSize: 16, color: "#4C4C4C" }}>
            {u.nickname}
          </Text>
          <Text style={{ fontFamily: "ZenMaruGothicBold", color: "#FF7A7A" }}>
            {u.points} 投稿
          </Text>
        </View>
      ))}
    </View>
  );
}
