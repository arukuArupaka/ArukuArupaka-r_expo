import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const KitchenCarListItem = (props) => {
  console.log(props.kitchenCarObject.fields.position.mapValue.fields.latitude.stringValue);
  return (
    <View
      style={{
        height: 80,
        flexDirection: "row",
      }}
    >
      <View>
        <Text style={{ fontSize: 18 }}>
          {props.kitchenCarObject.fields.storeName.stringValue}
        </Text>
        <Text>
          {props.kitchenCarObject.fields.startTime.stringValue +
            "~" +
            props.kitchenCarObject.fields.endTime.stringValue}
        </Text>
        <Text>{props.kitchenCarObject.fields.herf.stringValue}</Text>
      </View>
      <View
        style={{
          position: "absolute",
          right: 4,
          paddingTop: 25,
          height: "100%",
        }}
      >
        <Text style={{ color: "gray" }}>ここをタップして移動</Text>
      </View>
    </View>
  );
};

export default KitchenCarListItem;
