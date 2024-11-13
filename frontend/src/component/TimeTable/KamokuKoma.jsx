import React from 'react';
import { Platform, Text, View,StyleSheet,useColorScheme, Button, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import {useState,useEffect} from 'react'
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTimeTable } from './TimeTableContext'

const KamokuKoma = (props) => {
  const { searchword, setSearchword, weekTimeQty, timesize, setWeekTimeQty,sizechange, setSizechange,padding,show, setShow, season, setSeason, time, setTime, department, setDepartment, data, setData, kamokuInfo, weekTime, setWeekTime, pushedClassFrameDetail, setPushedClassFrameDetail, indata, setIndata, isInfoShow, setIsInfoShow, count, setCount } = useTimeTable();
console.log(props.index)
  const styles = StyleSheet.create({
    body:{
      display: 'flex',
      flexDirection: 'row',
      borderColor:'#888888',
      borderBottomWidth:1,
      height:80,
      alignItems: 'center',
      justifyContent: 'flex-start',
      
    }
  });

  let index = props.item.kamoku_name.indexOf(searchword);

  return(
    <View style={{
      backgroundColor:props.index%2==0?'#fff':'#f0f8ff',
    }}>
      {index !== -1 &&
        
        <TouchableOpacity style={styles.body}
          onPress={() => {
          console.log('TouchableOpacity pressed');
          //console.log(props.kamokudata.className);
          props.eventPush();

          }}>
          <Text style={{
            marginRight:30,
            marginLeft:30,
            paddingRight: 3,
            paddingLeft: 3,
            fontSize: 16,
            borderRadius: '5',
            borderColor:'#c0c0c0',
            borderWidth:1,
            overflow:"hidden",
            backgroundColor:'#e6e6fa',
    
          }}>{props.item.kamoku_num+" "}</Text>
          <Text>{props.item.kamoku_day+" "}</Text>
          <Text>{props.item.kamoku_time+" "}</Text>
          <Text>{props.item.kamoku_name}</Text>
        </TouchableOpacity>
      }
    </View>
  );
};
  export default KamokuKoma;

