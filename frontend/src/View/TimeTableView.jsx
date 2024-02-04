import React from 'react';
import { Platform, Text, View,StyleSheet,useColorScheme, Button, ScrollView, Dimensions} from 'react-native';
import WeekFram from '../component/TimeTable/WeekFrame';
import ClassFrame from '../component/TimeTable/ClassFrame';
import TimeTableInfo from '../component/TimeTable/TimeTableInfo';
import ClassTime from '../component/TimeTable/classTime';
import {useState,useEffect} from 'react'
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimeTableQty from '../component/TimeTable/TimeTableQty';
import { useTimeTable } from '../component/TimeTable/TimeTableContext'


const TimrTableView = () => {
  const { weekTimeQty, timesize, setWeekTimeQty,sizechange, setSizechange,padding } = useTimeTable();

  const window = Dimensions.get('window');

  //プッシュ通知系
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

  //通知時間計算
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

  const notificationTime = [
    [{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''}],
    [{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''}],
    [{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''}],
    [{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''}],
    [{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''},{notihour:'',notiminute:''}]
  ]

  //時間割系
  const [isShow,setIsShow]=useState(false)
  const weekTimeSaveData=[
    [{day:0,period:0,className:"",classRoom:"",memo:"",notification:""},{day:0,period:1,className:"",classRoom:"",memo:"",notification:""},{day:0,period:2,className:"",classRoom:"",memo:"",notification:""},{day:0,period:3,className:"",classRoom:"",memo:"",notification:""},{day:0,period:4,className:"",classRoom:"",memo:"",notification:""},{day:0,period:5,className:"",classRoom:"",memo:"",notification:""},{day:0,period:6,className:"",classRoom:"",memo:"",notification:""}],
    [{day:1,period:0,className:"",classRoom:"",memo:"",notification:""},{day:1,period:1,className:"",classRoom:"",memo:"",notification:""},{day:1,period:2,className:"",classRoom:"",memo:"",notification:""},{day:1,period:3,className:"",classRoom:"",memo:"",notification:""},{day:1,period:4,className:"",classRoom:"",memo:"",notification:""},{day:1,period:5,className:"",classRoom:"",memo:"",notification:""},{day:1,period:6,className:"",classRoom:"",memo:"",notification:""}],
    [{day:2,period:0,className:"",classRoom:"",memo:"",notification:""},{day:2,period:1,className:"",classRoom:"",memo:"",notification:""},{day:2,period:2,className:"",classRoom:"",memo:"",notification:""},{day:2,period:3,className:"",classRoom:"",memo:"",notification:""},{day:2,period:4,className:"",classRoom:"",memo:"",notification:""},{day:2,period:5,className:"",classRoom:"",memo:"",notification:""},{day:2,period:6,className:"",classRoom:"",memo:"",notification:""}],
    [{day:3,period:0,className:"",classRoom:"",memo:"",notification:""},{day:3,period:1,className:"",classRoom:"",memo:"",notification:""},{day:3,period:2,className:"",classRoom:"",memo:"",notification:""},{day:3,period:3,className:"",classRoom:"",memo:"",notification:""},{day:3,period:4,className:"",classRoom:"",memo:"",notification:""},{day:3,period:5,className:"",classRoom:"",memo:"",notification:""},{day:3,period:6,className:"",classRoom:"",memo:"",notification:""}],
    [{day:4,period:0,className:"",classRoom:"",memo:"",notification:""},{day:4,period:1,className:"",classRoom:"",memo:"",notification:""},{day:4,period:2,className:"",classRoom:"",memo:"",notification:""},{day:4,period:3,className:"",classRoom:"",memo:"",notification:""},{day:4,period:4,className:"",classRoom:"",memo:"",notification:""},{day:4,period:5,className:"",classRoom:"",memo:"",notification:""},{day:4,period:6,className:"",classRoom:"",memo:"",notification:""}],
  ]

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
  const [weekTime,setWeekTime]=useState(weekTimeSaveData);

  const [pushedClassFrameDetail,setPushedClassFrameDetail]=useState({
    day:"",
    period:"",
  })

  //確認
  /*const scheduleAllNotifications = () => {
    if (Array.isArray(classStartEndTimeUnitList) && Array.isArray(weekTime)) {
      for (let i = 0; i < classStartEndTimeUnitList.length; i++) {
        if (Array.isArray(weekTime[i])) {
          for (let j = 0; j < weekTime[i].length; j++) {
            const notificationTime = timeCalc(classStartEndTimeUnitList[i].hour, classStartEndTimeUnitList[i].minute, weekTime[i][j].notification);
            scheduleNotificationAsync(weekTime[i][j], notificationTime);
          }
        }
      }
    }
  }; */

  //scheduleAllNotifications();
  


  //保存系
  //weekTimeの行列保存、読み出し
  useEffect(()=>{
    getData();
  },[setIsShow])

  useEffect(()=>{
    getData();
  },[weekTimeQty])

  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('timeTableKey');
      jsonValue != null ? setWeekTime((JSON.parse(jsonValue))) : null;
      console.log('timeTableKey:',jsonValue)
      console.log('weekTimeQty:',weekTimeQty)
      console.log('scheduleNotificationAsync:',scheduleNotificationAsync())
    } catch (e) {
      console.log(e)
    }
  };

  const saveDate = async (weekTime) => {
    //console.log(weekTime)
    try {
      const jsonValue = JSON.stringify(weekTime);
      await AsyncStorage.setItem('timeTableKey', jsonValue);
    } catch (e) {
      console.log('e')
    }
  };

  useEffect(()=>{
    saveDate(weekTime);
  })

  //weekTimeQtyの保存・読み出し

  useEffect(() => {
    const loadWeekTimeQty = async () => {
      try {
        const savedWeekTimeQty = await AsyncStorage.getItem('weekTimeQtyKey');
        if (savedWeekTimeQty !== null) {
          setWeekTimeQty(JSON.parse(savedWeekTimeQty));
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadWeekTimeQty();
  }, []);


  //sizechangeの保存・読み出し
  useEffect(() => {
    const loadsizechange = async () => {
      try {
        const stringValue = await AsyncStorage.getItem('sizechangekey');
        if(stringValue != null){
          const value = JSON.parse(stringValue);
          setSizechange(value);
       }
      } catch (e) {
        console.log(e);
      }
    };

    loadsizechange();
  }, []);

  useEffect(() => {
    const savesizechange = async () => {
      try {
        const stringValue = JSON.stringify(sizechange);
        await AsyncStorage.setItem('sizechangekey', stringValue);
      } catch (e) {
        console.log(e);
      }
    };

    savesizechange();
  }, [sizechange]);

  useEffect(() => {
    const saveWeekTimeQty = async () => {
      try {
        await AsyncStorage.setItem('weekTimeQtyKey', JSON.stringify(weekTimeQty));
      } catch (e) {
        console.log(e);
      }
    };

    saveWeekTimeQty();
  }, [weekTimeQty]);

  useEffect(() => {
    console.log('sizechange:',sizechange);
  },[sizechange]);

  const styles = StyleSheet.create({

    bodys:{
      flexDirection: 'row',
      backgroundColor:'#F8F8F8',
      width:'100%',
      paddingTop:30,
      paddingBottom:padding,
      paddingLeft:0,
      paddingRight:0,
      height: '100%',
      alignItems: 'stretch',
      //backgroundColor: 'green',
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    tables:{
      flexDirection: 'column',
      height:'80%',
    },
    tableWeek:{
      //backgroundColor:'#888888',
      height:35,
      width:'100%',
      flexDirection:'row',
    },
    //weeks:{
    //  flex:1,
    //  width:'20%',
    // textAlign:'center', 
    //  backgroundColor:'#888888',
    //  height:'100%',
    //  lineHeight:35,
    //  marginLeft:1,
    //  marginRight:1,
    //},
    //tableKoma:{
    //  marginTop:2,
    //  height:90,
    //  width:'100%',
    //  flexDirection:'row',
    //},
    //koma:{
    //  color:'black',
    //  width:'20%',
    //  textAlign:'center', 
    //  backgroundColor:'white',
    //  height:'100%',
    //  lineHeight:35,
    //  marginLeft:1,
    //  marginRight:1,
    //  borderWidth: 1,
    //  borderColor: '#888888',
    //  borderRadius: 10,    
    //},
    //sectionTitle: {
    //  fontSize: 24,
    //  fontWeight: '600',
    //},
    //sectionDescription: {
    //  marginTop: 8,
    //  fontSize: 18,
    //  fontWeight: '400',
    //},
    //highlight: {
    //  fontWeight: '700',
    //},


    rowClass:{
      flexDirection:'column',
      flex:1,
      height:'100%',
    },
    timeTableClass:{
      flexDirection:'row',
      width:'100%',
      height:125.1,
      paddingRight:2,
    },
    classList:{
      height:'90%',
      flex:9,
      //backgroundColor: 'blue'
    },
    classTimeContiner:{
      marginTop:35,
      flex:1,
      //backgroundColor:'blue',
      height: timesize,
      //backgroundColor: 'pink'
    },
    buttons:{
      paddingTop: 110,
      justifyContent: 'start',
      height: '100%',
      width: '100%', 
      alignItems: 'flex-start',
    },
    Qtybutton:{
      flexDirection: 'row',
      width: '17%',
      height: '8.5%',
      alignSelf: 'flex-end',
      justifyContent: 'space-between',
    },
    TableEnt:{
      height: '100%',
    },
    scrollView:{
      width: '100%',
      height: '100%',
    },
    scrollViewContent:{
      flexGrow: 1,
    }
  });

  const onSubmit=(classDetail,notificationHour,notificationMinute)=>{
    setWeekTime((prev)=>{prev[classDetail.day][classDetail.period]=classDetail; return prev});
    scheduleNotificationAsync(classDetail,notificationHour,notificationMinute);
    console.log('onSubmit///hour:',notificationHour);
    console.log('onSubmit///minute:',notificationMinute);
    
  }

  const [childSize, setChildSize] = useState({ width: 0, height: 0 });
 
  return (
  <View>
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View style={{zIndex:300,left:'10%',top:110,}}>
          {isShow && <TimeTableInfo day={pushedClassFrameDetail.day} period={pushedClassFrameDetail.period} pushFramDetail={weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period]} onEventCallBack={()=>{setIsShow(false)}} onSubmit={onSubmit} timeCalc={timeCalc} classStartEndTimeUnitList={classStartEndTimeUnitList}/>}
        </View>
      <View style={styles.bodys}>
          <View style={styles.classTimeContiner} onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          if (childSize !== height) { // 現在の高さと異なる場合のみ更新
            setChildSize(height);
            console.log(height);
          } // classTimeContainerの高さを取得して状態にセット
        }}>
            {classStartEndTimeUnitList.slice(0,weekTimeQty).map((classStartEndTimeUnitList,index)=><ClassTime key={index} data={classStartEndTimeUnitList} weekTimeQty={weekTimeQty}></ClassTime>)}
          </View>
          <View style={styles.classList}>
            <View style={styles.tables}>
              <View style={styles.tableWeek}>
                <WeekFram weekDay={"Mon"}></WeekFram>
                <WeekFram weekDay={"Tue"}></WeekFram>
                <WeekFram weekDay={"Wed"}></WeekFram>
                <WeekFram weekDay={"Thu"}></WeekFram>
                <WeekFram weekDay={"Fri"}></WeekFram>
              </View>
              <View style={styles.TableEnt}>
                <View style={styles.timeTableClass}>
                  {weekTime.map((weekTime1,index)=>
                    <View key={index} style={styles.rowClass}>
                      {weekTime1.slice(0,weekTimeQty).map((weekTime2,index)=>
                        <ClassFrame 
                          key={index} 
                          TimeTableDate={weekTime2} 
                          day={weekTime2.day} 
                          period={weekTime2.period} 
                          className={weekTime2.className}
                          weekTimeQty={weekTimeQty} 
                          
                          onEventCallBack={(frameDetail)=>{
                            setIsShow(true);
                            setPushedClassFrameDetail(frameDetail);
                            }}
                        />) 
                      }
                    </View>
                  )}
                </View>
              </View>  
            </View>
          </View>
      </View>
    </ScrollView>
  </View>
  );
};

export default TimrTableView;
