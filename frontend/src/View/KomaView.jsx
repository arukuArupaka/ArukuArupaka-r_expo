import React from 'react';
import { Switch, SafeAreaView, Platform, Text, View,StyleSheet,useColorScheme, Button, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import WeekFram from '../component/TimeTable/WeekFrame';
import ClassFrame from '../component/TimeTable/ClassFrame';
import TimeTableInfo from '../component/TimeTable/TimeTableInfo';
import ClassTime from '../component/TimeTable/classTime';
import {useState,useEffect} from 'react'
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimeTableQty from '../component/TimeTable/TimeTableQty';
import { useTimeTable } from '../component/TimeTable/TimeTableContext'
//import { WebView } from 'react-native-webview';

const KomaView = ({ navigation }) => {
    const { weekTimeQty, timesize, setWeekTimeQty,sizechange, setSizechange,padding,show, setShow, season, setSeason, time, setTime, day, setDay, department, setDepartment, dodata, setDodata, pushedClassFrameDetail,setPushedClassFrameDetail, weekTime, setWeekTime, indata, setIndata, period, setPeriod, kamokuItem, setKamokuItem, nodata, setNodata } = useTimeTable();

    const [isShow, setIsShow] = useState(false);

    const timeCalc = (hour, minute, notification) => {
        let notificationHour = hour
        let notificationMinute = minute;
    
        if(minute >= notification){
          notificationHour = hour;
          notificationMinute = minute - notification;
        }else if(minute < notification){
          if(notification <= 60){
            notificationHour = hour - 1;
            notificationMinute = 60 - (notification - minute);
          }else if(minute >= Math.floor(notification%60)){
            notificationHour = hour - Math.floor(notification/60);
            notificationMinute = minute - Math.floor(notification%60);
          }else{
            notificationHour = hour - Math.floor(notification/60) - 1;
            notificationMinute = 60 - Math.abs(minute - Math.floor(notification%60));
          }
        }
            //0時、24時の処理
        if (notificationHour < 0) {
          notificationHour += 24;
        }else if (notificationHour >= 24) {
          notificationHour -= 24;
        }
    
        return [notificationHour,notificationMinute];
      };

      React.useEffect(() => {
        requestPermissionsAsync();
      })
    
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
    
      const scheduleNotificationAsync = async (classDetail, notificationHour, notificationMinute) => {
        try{
          // デバッグ: notificationTime の内容を確認
          console.log('Scheduling notification:', notificationHour);
        
          // 通知をスケジュールする際に数値であることを確認
          if (typeof notificationHour === 'number' && typeof notificationMinute === 'number') {
            const trigger = new Date();
            trigger.setHours(notificationHour);
            trigger.setMinutes(notificationMinute);
            console.log('notificationHour:', notificationHour);
            console.log('notificationMinute:', notificationMinute);
            console.log('classDetail.day:',classDetail.day);
            if (classDetail.day == 5){
              classDetail.day = 0;
            }
    
            await Notifications.scheduleNotificationAsync({
              content: {
                body: classDetail.memo,
                title: classDetail.classRoom + " " + classDetail.className + "       " + notificationHour  + "時" + notificationMinute + "分に通知"
              },
              trigger: {
                weekday: classDetail.day+2,
                hour: notificationHour,
                minute: notificationMinute,
                repeats: true
              }
            });
          }
        } catch (e) {
          console.log(e.message);
        }
      };
    
      const requestPermissionsAsync = async () => {
        const { granted } = await Notifications.getPermissionsAsync();
        if (granted) { return }
      
        await Notifications.requestPermissionsAsync();
      }

    const onSubmit=(classDetail,notificationHour,notificationMinute)=>{
      setWeekTime((prev)=>{prev[classDetail.day][classDetail.period]=classDetail; return prev});
      scheduleNotificationAsync(classDetail,notificationHour,notificationMinute);
      console.log('onSubmit///hour:',notificationHour);
      console.log('onSubmit///minute:',notificationMinute);
    
    };

    const offSubmit=(classDetail)=>{
      setWeekTime((prev)=>{prev[classDetail.day][classDetail.period]=classDetail; return prev});
    };

    const classStartEndTimeUnitList=[
        {
          start:"9:00",
          end:"10:30",
          hour:9,
          minute:0
        },
        {
          start:"10:40",
          end:"12:10",
          hour:10,
          minute:40
        },
        {
          start:"13:00",
          end:"14:30",
          hour:13,
          minute:0
        },
        {
          start:"14:40",
          end:"16:10",
          hour:14,
          minute:40
        },
        {
          start:"16:20",
          end:"17:50",
          hour:16,
          minute:20
        },
        {
          start:"18:00",
          end:"19:30",
          hour:18,
          minute:0
        },
        {
          start:"19:40",
          end:"20:10",
          hour:19,
          minute:40
        },
      ]

    //console.log('授業に関する情報')
    //console.log(typeof weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].num);
    //console.log(typeof weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].className);
    //console.log(typeof weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].unit);
    //console.log(typeof weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].resume);
    //console.log(typeof weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].department);

    const styles = StyleSheet.create({
        body: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        title: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10
        },
        info: {
            backgroundColor: '#ffffff',
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 1
        },
        list: {
            width: '80%',
            borderRadius: 10,
            margin: 20
        },
        notifi: {
          padding: 6,
          paddingHorizontal: 8,
          backgroundColor: '#ffffff',
          borderRadius: 10,
          borderColor: 'black',
          borderWidth: 1,
          top: 6
        }
    });

    return (
        <View style={styles.body}>
            <View style={{zIndex:300,right: 157,top:110,}}>
                {isShow && <TimeTableInfo day={pushedClassFrameDetail.day} period={pushedClassFrameDetail.period} pushFramDetail={weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period]} onEventCallBack={()=>{setIsShow(false);}} onSubmit={onSubmit} offSubmit={offSubmit} timeCalc={timeCalc} classStartEndTimeUnitList={classStartEndTimeUnitList}/>}
            </View>
            <View style={styles.title}>
                <Text style={{fontSize: 20}}>{day + "曜" + " " + time + "限"}</Text>
            </View>
                <View style={styles.info}>
                    <View style={styles.list}>
                        <Text style={{fontSize: 17, padding: 5}}>{"授業名：" + weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].className}</Text>
                        <Text style={{fontSize: 17, padding: 5}}>{"教室名：" + weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].classRoom}</Text>
                        <Text style={{fontSize: 17, padding: 5}}>{"教授：" + weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].teacher}</Text>
                        <Text style={{fontSize: 17, padding: 5}}>{"単位数：" + weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].unit}</Text>
                        <Text style={{fontSize: 17, padding: 5}}>{"授業コード：" + weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].num}</Text>
                        <Text style={{fontSize: 17, padding: 5}}>{"メモ：" + weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].memo}</Text>
                    </View>
                </View>
                <View style={styles.notifi}>
                    <TouchableOpacity onPress={() => {setIsShow(true);console.log(pushedClassFrameDetail);}}><Text>{"設定"}</Text></TouchableOpacity>
                </View>
                <View style={styles.notifi}>
                    <TouchableOpacity onPress={() => {navigation.navigate('WebSite');console.log(pushedClassFrameDetail);}}><Text>{"レジュメのサイトへアクセス"}</Text></TouchableOpacity>
                </View>
                

        </View>
    )
    
};
export default KomaView;