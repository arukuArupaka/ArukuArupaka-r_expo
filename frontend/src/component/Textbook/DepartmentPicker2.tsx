// DepartmentPicker2.tsx

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const DepartmentPicker2 = ({ onSelect }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => onSelect("新品、未使用")}>
        <Text>新品、未使用</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("未使用に近い")}>
        <Text>未使用に近い</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("目立った傷や汚れなし")}>
        <Text>目立った傷や汚れなし</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("やや傷や汚れあり")}>
        <Text>やや傷や汚れあり</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("傷や汚れあり")}>
        <Text>傷や汚れあり</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("全体的に状態が悪い")}>
        <Text>全体的に状態が悪い</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DepartmentPicker2;
