import React from 'react';
import {Text, View,StyleSheet,useColorScheme} from 'react-native';
import WeekFram from '../component/TimeTable/WeekFrame';
import ClassFrame from '../component/TimeTable/ClassFrame';
import TimeTableInfo from '../component/TimeTable/TimeTableInfo';
import ClassTime from '../component/TimeTable/classTime';
import {useState,useEffect} from 'react'
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';



const TimrTableView = () => {
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

  const scheduleNotificationAsync = async (classDetail) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        body:classDetail.memo,
        title: classDetail.classRoom+" "+classDetail.className
      },
      trigger: {
        weekday: classDetail.day+2,
        hour: classStartEndTimeUnitList[classDetail.period].pushHour,
        minute: classStartEndTimeUnitList[classDetail.period].pushMinitu,
        repeats: true,
      }
    })
  }



  const requestPermissionsAsync = async () => {
    const { granted } = await Notifications.getPermissionsAsync();
    if (granted) { return }
  
    await Notifications.requestPermissionsAsync();
  }


  //時間割系
  const [isShow,setIsShow]=useState(false)
  const weekTimeSaveData=[
    [{day:0,period:0,className:"",classRoom:"",memo:"",notification:""},{day:0,period:1,className:"",classRoom:"",memo:"",notification:""},{day:0,period:2,className:"",classRoom:"",memo:"",notification:""},{day:0,period:3,className:"",classRoom:"",memo:"",notification:""},{day:0,period:4,className:"",classRoom:"",memo:"",notification:""}],
    [{day:1,period:0,className:"",classRoom:"",memo:"",notification:""},{day:1,period:1,className:"",classRoom:"",memo:"",notification:""},{day:1,period:2,className:"",classRoom:"",memo:"",notification:""},{day:1,period:3,className:"",classRoom:"",memo:"",notification:""},{day:1,period:4,className:"",classRoom:"",memo:"",notification:""}],
    [{day:2,period:0,className:"",classRoom:"",memo:"",notification:""},{day:2,period:1,className:"",classRoom:"",memo:"",notification:""},{day:2,period:2,className:"",classRoom:"",memo:"",notification:""},{day:2,period:3,className:"",classRoom:"",memo:"",notification:""},{day:2,period:4,className:"",classRoom:"",memo:"",notification:""}],
    [{day:3,period:0,className:"",classRoom:"",memo:"",notification:""},{day:3,period:1,className:"",classRoom:"",memo:"",notification:""},{day:3,period:2,className:"",classRoom:"",memo:"",notification:""},{day:3,period:3,className:"",classRoom:"",memo:"",notification:""},{day:3,period:4,className:"",classRoom:"",memo:"",notification:""}],
    [{day:4,period:0,className:"",classRoom:"",memo:"",notification:""},{day:4,period:1,className:"",classRoom:"",memo:"",notification:""},{day:4,period:2,className:"",classRoom:"",memo:"",notification:""},{day:4,period:3,className:"",classRoom:"",memo:"",notification:""},{day:4,period:4,className:"",classRoom:"",memo:"",notification:""}],
  ]
  const classStartEndTimeUnitList=[
    {
      start:"9:00",
      end:"10:30",
      pushHour:8,
      pushMinitu:50,
    },
    {
      start:"10:40",
      end:"12:10",
      pushHour:10,
      pushMinitu:30,      
    },
    {
      start:"13:00",
      end:"14:30",
      pushHour:12,
      pushMinitu:50,
    },
    {
      start:"14:40",
      end:"16:10",
      pushHour:14,
      pushMinitu:30,
    },
    {
      start:"16:20",
      end:"17:50",
      pushHour:16,
      pushMinitu:10,
    },
  ]
  const [weekTime,setWeekTime]=useState(weekTimeSaveData);

  const [pushedClassFrameDetail,setPushedClassFrameDetail]=useState({
    day:"",
    period:"",
  })


  //保存系
  useEffect(()=>{
    getData();
  },[setIsShow])

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('timeTableKey');
      jsonValue != null ? setWeekTime((JSON.parse(jsonValue))) : null;
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

  const onSubmit=(classDetail)=>{
    setWeekTime((prev)=>{prev[classDetail.day][classDetail.period]=classDetail; return prev});
    scheduleNotificationAsync(classDetail);
    
  }
 
  return (
    <View style={{width:'100%',height:'100%',margin:0,padding:0}}>
      <View style={{zIndex:100,left:'10%',top:110,}}>
        {isShow && <TimeTableInfo day={pushedClassFrameDetail.day} period={pushedClassFrameDetail.period} pushFramDetail={weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period]} onEventCallBack={()=>{setIsShow(false)}} onSudmit={onSubmit}/>}
      </View>
      
    <View style={styles.bodys}>
      <View style={styles.classTimeContiner}>
        {classStartEndTimeUnitList.map((classStartEndTimeUnitList,index)=><ClassTime key={index} data={classStartEndTimeUnitList}></ClassTime>)}
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
            <View style={styles.timeTableClass}>
              {weekTime.map((weekTime1,index)=><View key={index} style={styles.rowClass}>{ weekTime1.map((weekTime2,index)=><ClassFrame key={index} TimeTableDate={weekTime2} day={weekTime2.day} period={weekTime2.period} className={weekTime2.className} onEventCallBack={(frameDetail)=>{setIsShow(true);setPushedClassFrameDetail(frameDetail)}}/>) }</View>)}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
  const styles = StyleSheet.create({

    bodys:{
      backgroundColor:'F8F8F8',
      width:'100%',
      paddingTop:30,
      paddingBottom:0,
      paddingLeft:0,
      paddingRight:0,
      flexDirection:'row',
      height:'100%'
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    tables:{
       height:'80%',
    },
    tableWeek:{
      //backgroundColor:'#888888',
      height:35,
      width:'100%',
      flexDirection:'row',
    },
    weeks:{
      flex:1,
      width:'20%',
      textAlign:'center', 
      backgroundColor:'#888888',
      height:'100%',
      lineHeight:35,
      marginLeft:1,
      marginRight:1,
    },
    tableKoma:{
      marginTop:2,
      height:90,
      width:'100%',
      flexDirection:'row',
    },
    koma:{
      color:'black',
      width:'20%',
      textAlign:'center', 
      backgroundColor:'white',
      height:'100%',
      lineHeight:35,
      marginLeft:1,
      marginRight:1,
      borderWidth: 1,
      borderColor: '#888888',
      borderRadius: 10,    
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },


    rowClass:{
      flexDirection:'column',
      flex:1,
      height:'100%',
    },
    timeTableClass:{
      flexDirection:'row',
      width:'100%',
      height:'25%',
      paddingRight:2,
    },
    classList:{
      height:'90%',
      flex:9,
    },
    classTimeContiner:{
      marginTop:35,
      flex:1,
      //backgroundColor:'blue',
      height:'90%',
    }
  });

export default TimrTableView;
