import { useTimeTable } from '../component/TimeTable/TimeTableContext'
import React from 'react';
import { Platform, Text, View,StyleSheet,useColorScheme, Button, ScrollView, Dimensions, RefreshControl} from 'react-native';
import {useState,useEffect} from 'react'
import Koma from '../component/TimeTable/Koma';
import KamokuKoma from '../component/TimeTable/KamokuKoma';

const TimeTableClass = ({ navigation }) => {
    const { weekTimeQty, timesize, setWeekTimeQty,sizechange, setSizechange,padding,show, setShow, season, setSeason, time, setTime, day, setDay, department, setDepartment, data, setData, kamokuInfo, pushedClassFrameDetail,setPushedClassFrameDetail, weekTime,setWeekTime } = useTimeTable();

    const [refreshing, setRefreshing] = React.useState(false);

    const onSubmit=(classDetail)=>{
      setWeekTime((prev)=>{prev[classDetail.day][classDetail.period]=classDetail; return prev});
      console.log('onSubmit///hour:',notificationHour);
      console.log('onSubmit///minute:',notificationMinute);
      
    }

    const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
        setRefreshing(false);
    }, 2000);
    }, []);

  return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
              <View>
              {data.map((item, index) => <KamokuKoma key={index} item={item} event={()=> {navigation.navigate('TimeTableSetting')} }/>)}
              </View>
        </ScrollView>
      );
};
export default TimeTableClass;