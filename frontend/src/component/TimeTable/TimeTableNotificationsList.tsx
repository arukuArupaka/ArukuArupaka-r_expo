import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tailwind from 'tailwind-rn';
import * as Notifications from 'expo-notifications';
import { useState,useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';


const TimeTableNotificationsList = (props) => {
  const [notficationdata,setNotfcationdata]=useState({id:'読み込み中',body:'読み込み中'})
  //console.log(notficationdata)
  //console.log(props.data)
  
  props.data!=notficationdata?setNotfcationdata(props.data):null

  return (
    <View
      style={{
        height:80,
        flexDirection:'row',
        alignItems: 'center',
        borderColor:'#888888',
        borderBottomWidth:1,
      }}>
      <Text style={{ flex:1,justifyContent: 'space-between',}}>{"  "+props.data.title}</Text>
      <TouchableOpacity onPress={()=>{Notifications.cancelScheduledNotificationAsync(props.data.id);}}>
        <AntDesign name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};
export default TimeTableNotificationsList;