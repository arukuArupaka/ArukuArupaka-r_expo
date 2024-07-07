import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const NewAppList = (props) => {
    return (
      <TouchableOpacity
        style={{
          height: 75,
          width: 160,
          borderColor: props.color,
          borderWidth: 2,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          margin: 8,
          padding: 8,
          display: "flex",
        }}
        onPress={() => {
          props.test.navigation.navigate(props.jumpPage);
        }}
      >
       
       {props.item()?props.item():""}
        <Text style={{ fontSize: 20, textAlign: "center", flex: 1 }}>
          {props.appName}
        </Text>
      </TouchableOpacity>
    );
  };

export default NewAppList