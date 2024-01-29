import React from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const TimeTableQty = (props) => {
    return (
    <TouchableOpacity
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="plus" size={24} color="black" />)
        }}
          style={{
              // width:'20%',
              textAlign:'center', 
              backgroundColor:'#888888',
              lineHeight:35,
              marginTop:1,
              flex:1,
              borderRadius: 100,
              borderColor: 'black',
                }}onPress={()=>{props.onEventCallBack()}}>
        <Text style={{
          fontSize: 24,
        }}
        >{props.qty}</Text>
    </TouchableOpacity>
    );
  };
  export default TimeTableQty;