// DepartmentPicker.tsx

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const DepartmentPicker = ({ onSelect }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => onSelect("学部A")}>
        <Text>学部A</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("学部B")}>
        <Text>学部B</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("学部C")}>
        <Text>学部C</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DepartmentPicker;
