import React from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const TimeTableQty = (props) => {
    return (
    <TouchableOpacity
      options={{
        headerShown: false,
        }}onPress={()=>{props.onEventCallBack()}}>
       <AntDesign name={props.name} size={props.size} color={props.color} />
    </TouchableOpacity>
    );
  };
  export default TimeTableQty;