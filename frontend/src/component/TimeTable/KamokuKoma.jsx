import React from 'react';
import { Platform, Text, View,StyleSheet,useColorScheme, Button, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import {useState,useEffect} from 'react'
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTimeTable } from './TimeTableContext'

const KamokuKoma = (props) => {
  const { weekTimeQty, timesize, setWeekTimeQty,sizechange, setSizechange,padding,show, setShow, season, setSeason, time, setTime, department, setDepartment, data, setData, kamokuInfo, weekTime, setWeekTime, pushedClassFrameDetail, setPushedClassFrameDetail, indata, setIndata, isInfoShow, setIsInfoShow } = useTimeTable();

  const styles = StyleSheet.create({
    body:{
      display: 'flex',
      flexDirection: 'row',
      borderColor:'#888888',
      borderBottomWidth:1,
      height:80,
      alignItems: 'center',
      justifyContent: 'flex-start'
    }
  });

  return(
    <View>
      <TouchableOpacity style={styles.body}
        onPress={() => {
        console.log('TouchableOpacity pressed');
        //console.log(props.kamokudata.className);
        props.eventPush();

        }}>
        <Text style={{
          paddingRight: 30,
          paddingLeft: 5,
          fontSize: 16
        }}>{props.item.kamoku_num+" "}</Text>
        <Text>{props.item.kamoku_day+" "}</Text>
        <Text>{props.item.kamoku_time+" "}</Text>
        <Text>{props.item.kamoku_name}</Text>
      </TouchableOpacity>
    </View>
  );
};
  export default KamokuKoma;

