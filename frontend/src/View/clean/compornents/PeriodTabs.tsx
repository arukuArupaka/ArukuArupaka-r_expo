import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export function PeriodTabs({ period, onChange }) {
  const tabs = [
    { key: "week", label: "週間" },
    { key: "month", label: "月間" },
    { key: "all", label: "累計" },
  ];
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
        marginBottom: 8,
      }}
    >
      {tabs.map((p) => (
        <TouchableOpacity
          key={p.key}
          onPress={() => onChange(p.key)}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 14,
            borderRadius: 16,
            backgroundColor: period === p.key ? "#88ffae" : "#EFEFEF",
          }}
        >
          <Text
            style={{
              color: period === p.key ? "#fff" : "#4C4C4C",
              fontFamily: "ZenMaruGothicBold",
            }}
          >
            {p.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
