import React from 'react';
import { Platform, Text, View,StyleSheet,useColorScheme, Button, ScrollView, Dimensions} from 'react-native';
import {useState,useEffect} from 'react'
import * as Notifications from 'expo-notifications';



const Koma = (props) => {

  const [notficationdata,setNotfcationdata]=useState({id:'読み込み中',body:'読み込み中'})

  return (
    <View
      style={{
        height:80,
        flexDirection:'row',
        alignItems: 'center',
        borderColor:'#888888',
        borderBottomWidth:1,
      }}>
      
      <TouchableOpacity onPress={()=>{Notifications.cancelScheduledNotificationAsync(props.data.id);}}>
        <Text style={{ flex:1,justifyContent: 'space-between',}}>{props.kamoku.kamoku_name + "  " + props.kamoku.kamoku_class}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Koma;