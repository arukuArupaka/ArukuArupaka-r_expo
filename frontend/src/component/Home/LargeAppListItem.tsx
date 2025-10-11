import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const LargeAppListItem = (props) => {
  const hasSubText = !!props.subText;
  return (
    <TouchableOpacity
      style={{
        height: hasSubText ? 75 : 75,
        width: 320,
        borderColor: props.color,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "column",
        alignItems: "stretch",
        margin: 3,
        display: "flex",
        position: "relative",
      }}
      onPress={() => {
        props.test.navigation.navigate(props.jumpPage);
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 8,
          right: 8,
          // 全体は常に中央寄せ
          justifyContent: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {props.item() ? props.item() : ""}
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              flex: 1,
              // subText があるときだけ appName を上に少し移動
              transform: hasSubText ? [{ translateY: -3 }] : undefined,
            }}
          >
            {props.appName}
          </Text>
        </View>
      </View>
      {hasSubText ? (
        <Text
          style={{
            position: "absolute",
            bottom: 3,
            left: 8,
            right: 8,
            fontSize: 13,
            color: "#333",
            textAlign: "center",
          }}
          numberOfLines={2}
        >
          {props.subText}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default LargeAppListItem;
