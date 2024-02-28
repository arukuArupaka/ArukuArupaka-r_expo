import { useTimeTable } from '../component/TimeTable/TimeTableContext'
import React from 'react';
import { TextInput, Platform, Text, View,StyleSheet,useColorScheme, Button, ScrollView, Dimensions, RefreshControl, TouchableOpacity} from 'react-native';
import {useState,useEffect} from 'react'
import Koma from '../component/TimeTable/Koma';
import KamokuKoma from '../component/TimeTable/KamokuKoma';
import TimeTableInfo from '../component/TimeTable/TimeTableInfo';
import * as Notifications from 'expo-notifications';

const TimeTableClass = ({ navigation }) => {
    const { searchword, setSearchword, weekTimeQty, timesize, setWeekTimeQty,sizechange, setSizechange,padding,show, setShow, season, setSeason, time, setTime, day, setDay, department, setDepartment, data, setData, kamokuInfo, pushedClassFrameDetail,setPushedClassFrameDetail, weekTime,setWeekTime,indata, setIndata, kamokuItem, setKamokuItem, nodata, setNodata, isInfoShow, setIsInfoShow, kamokuShow, setKamokuShow, count, setCount, deletekoma, setDeletekoma } = useTimeTable();
    //const [isInfoShow, setIsInfoShow] = useState(false);
    /*useEffect(() => {
      const kamokudata = weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period];
      setKamokuItem({
        day: pushedClassFrameDetail.day,
        period: pushedClassFrameDetail.period,
        classRoom: kamokudata.classRoom,
        className: kamokudata.className,
        memo: kamokudata.memo,
        notification: kamokudata.notification,
      });  
    }, []); */

    useEffect(() => {
      if (weekTime && pushedClassFrameDetail && pushedClassFrameDetail.day !== undefined && pushedClassFrameDetail.period !== undefined) {
        const kamokudata = weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period];
        if (kamokudata) { // kamokudata が存在することをさらにチェック
          setKamokuItem({
            day: pushedClassFrameDetail.day,
            period: pushedClassFrameDetail.period,
            classRoom: kamokudata.classRoom,
            className: kamokudata.className,
            memo: kamokudata.memo,
            notification: kamokudata.notification,
          });
        }
      }else{
        console.log('存在しません');
      }
    }, []); // 依存配列に weekTime と pushedClassFrameDetail を追加
    
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
  
      return {notificationHour,notificationMinute};
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
    scheduleNotificationAsync(classDetail,notificationHour,notificationMinute);
    console.log('onSubmit///hour:',notificationHour);
    console.log('onSubmit///minute:',notificationMinute);
  
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

    /*useEffect(() => {
      console.log('保存されました');
      if(pushedClassFrameDetail.day){
        console.log('存在します');
      }else{
        console.log('存在しません');
      }
    },[pushedClassFrameDetail]); */


    /*useEffect(() => {
      const onSubmit = async (pushedClassFrameDetail, classDetail) => {
        setWeekTime((prev) => {
          // 範囲チェックを追加
          if (typeof pushedClassFrameDetail !=='undefined') {
            prev[pushedClassFrameDetail.day][pushedClassFrameDetail.period] = classDetail;
            console.log('onSubmitでobject');
          } else {
            console.log(typeof pushedClassFrameDetail);
            console.log('onSubmitでundifined');
            // 範囲外のアクセスが試みられた場合のエラーログまたは処理
            //console.error('Invalid day or period');
          }
          return [...prev];
        });
      };
      onSubmit(pushedClassFrameDetail, kamokuItem);
    }, [indata]); */


    useEffect(() => {
      console.log('weekTimeは');
      console.log(typeof weekTime);
    },[]);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
        setRefreshing(false);
    }, 2000);
    }, []);

    const styles = StyleSheet.create({
      koma:{
        zIndex: 1
      },
      margin:{
        height: 500,
      },
      handle:{
        paddingTop: 30,
        paddingBottom: 20,
        alignItems: 'center',
        borderColor:'#888888',
        borderBottomWidth:1, 
      },
      input:{
        width: 240,
        borderWidth: 1,
        backgroundColor: "#D9D9D9",
        fontSize:14,
        height:24,
        marginTop:0,
        marginBottom:0,
        padding:0,
        paddingLeft:9,
        alignItems: 'center',
        borderRadius: 15
      },
      inputview:{
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 8,
      },
    });

    useEffect(() => {
      setSearchword('');
    },[]);

  return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={{ zIndex:900,left: 40,top:0,}}>
                  {isInfoShow && <TimeTableInfo day={pushedClassFrameDetail.day} period={pushedClassFrameDetail.period} pushFramDetail={weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period]} onEventCallBack={()=>{setIsInfoShow(false); console.log(count);}} onSubmit={onSubmit} timeCalc={timeCalc} classStartEndTimeUnitList={classStartEndTimeUnitList}/>}
                </View>
                <View style={styles.inputview}>
                  <Text style={{paddingRight: 8, borderWidth: 1,paddingTop: 2, paddingLeft: 9, borderRadius: 12}}>{'検索'}</Text>
                  <View style={{paddingLeft: 2, borderRadius: 15}}>
                    <TextInput style={styles.input} onChangeText={(text) =>{setSearchword(text);}}>
                      <Text>{searchword}</Text>
                    </TextInput>
                  </View>
                </View>
              <View>
                <TouchableOpacity style={styles.handle} onPress={() => {setIsInfoShow(true);setKamokuShow(true);}}>
                  <Text>手入力で追加</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.koma}>
                {data.length > 0 ? data.map((item, index) => <KamokuKoma key={index} item={item} eventPush={()=> { 
                  if(item.kamoku_unit==1){
                    kocolor = "deeppink";
                  }else if(item.kamoku_unit==2){
                    kocolor = "deepskyblue";
                  }else if(item.kamoku_unit==3){
                    kocolor = "yellow";
                  }else{
                    kocolor = "#888888";
                  }
              console.log(`count数は${count}です`); console.log('indataが変更されました');  console.log('indataをtrueに変更'); setKamokuItem({...kamokuItem, className: `${item.kamoku_name}`, classRoom: `${item.kamoku_class}`, department: `${item.kamoku_department}`, unit: `${item.kamoku_unit}`, num: `${item.kamoku_num}`, resume: `${item.kamoku_resume}`, teacher: `${item.kamoku_teacher}`, color: kocolor});setIndata(true); setKamokuShow(true); console.log('kamokuShowは'); console.log(kamokuShow);}}/>) : (<Text>{'学部、セメスターを選択していないか、このコマに授業が存在していません'}</Text>)}
              </View>
              { data.length > 4 ? (<View></View>) : (<View style={styles.margin}></View>)}
              { count > 4 ? (<View></View>) : (<View style={styles.margin}></View>)}
        </ScrollView>
      );
      /*setKamokuItem({...kamokuItem, className: `${item.kamoku_name}`, classRoom: `${item.kamoku_class}`});*/
};
export default TimeTableClass;