import React from 'react';
import {Text, View,StyleSheet,useColorScheme, Button} from 'react-native';
import WeekFram from '../component/TimeTable/WeekFrame';
import ClassFrame from '../component/TimeTable/ClassFrame';
import TimeTableInfo from '../component/TimeTable/TimeTableInfo';
import ClassTime from '../component/TimeTable/classTime';
import {useState,useEffect} from 'react'
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimeTableQty from '../component/TimeTable/TimeTableQty';


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
    const trigger = new Date(); // 現在の日時を取得
    trigger.setHours(3);       // 通知を送信する時間（例：10時）
    trigger.setMinutes(19);      // 分を設定（例：0分）
  
    await Notifications.scheduleNotificationAsync({
      content: {
        body: classDetail.memo,
        title: classDetail.classRoom + " " + classDetail.className
      },
      trigger: {
        repeats: true, // 繰り返し通知する場合は true
        //seconds: trigger.getTime() / 1000 // Unixタイムスタンプを秒単位で設定
      }
    });
  };
  


  const requestPermissionsAsync = async () => {
    const { granted } = await Notifications.getPermissionsAsync();
    if (granted) { return }
  
    await Notifications.requestPermissionsAsync();
  }


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
      minutte:40
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

  //weekTimeQtyの保存、読み出し
  // useStateの初期値を設定せず、後で設定する
  const [weekTimeQty, setWeekTimeQty] = useState();

  useEffect(() => {
    const loadWeekTimeQty = async () => {
      try {
        const savedWeekTimeQty = await AsyncStorage.getItem('weekTimeQtyKey');
        if (savedWeekTimeQty !== null) {
          setWeekTimeQty(JSON.parse(savedWeekTimeQty));
        } else {
          setWeekTimeQty(5); // AsyncStorageに値がない場合のデフォルト値
        }
      } catch (e) {
        console.log(e);
        setWeekTimeQty(5); // エラーが発生した場合のデフォルト値
      }
    };

    loadWeekTimeQty();
  }, []);

  useEffect(() => {
    // weekTimeQtyが定義されている場合のみ保存処理を実行
    if (weekTimeQty !== undefined) {
      const saveWeekTimeQty = async () => {
        try {
          await AsyncStorage.setItem('weekTimeQtyKey', JSON.stringify(weekTimeQty));
        } catch (e) {
          console.log(e);
        }
      };

      saveWeekTimeQty();
    }
  }, [weekTimeQty]);
  
    // その他のコンポーネントのコード...
  
  //コマ数に応じて左のタイムテーブル修正
  const getTimeSize = (qty) => {
    let Top = '90';
    switch(qty){
            case 5:
                    Top = '90';
                    break;
            case 6:
                    Top = '90';
                    break;
            case 7:
                    Top = '89';
                    break;
    }
    return `${Top}%`;
    
  };
  
  const timesize = getTimeSize(weekTimeQty);

  const styles = StyleSheet.create({

    bodys:{
      flexDirection: 'row',
      backgroundColor:'F8F8F8',
      width:'100%',
      paddingTop:30,
      paddingBottom:0,
      paddingLeft:0,
      paddingRight:0,
      height:'100%',
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
      height: timesize,
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
      height: '100%'
    },
  });

  const onSubmit=(classDetail)=>{
    setWeekTime((prev)=>{prev[classDetail.day][classDetail.period]=classDetail; return prev});
    scheduleNotificationAsync(classDetail);
    
  }
 
  return (
    <View style={{width:'100%',height:'100%',margin:0,padding:0}}>
      <View style={{zIndex:300,left:'10%',top:110,}}>
        {isShow && <TimeTableInfo day={pushedClassFrameDetail.day} period={pushedClassFrameDetail.period} pushFramDetail={weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period]} onEventCallBack={()=>{setIsShow(false)}} onSudmit={onSubmit}/>}
      </View>
      
    <View style={styles.bodys}>
      <View style={styles.classTimeContiner}>
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
          <View style={styles.buttons}>
            <View style={styles.Qtybutton}>
              <TimeTableQty qty={"  -"}
                onEventCallBack={()=>{
                  weekTimeQty <= 5 ? 5 : setWeekTimeQty(weekTimeQty - 1);}}
                weektimeqty = {weekTimeQty}/>
              <TimeTableQty qty={"  +"}
                onEventCallBack={()=>{
                  weekTimeQty >= 7 ? 7 : setWeekTimeQty(weekTimeQty + 1);}}
                weektimeqty = {weekTimeQty}/>
            </View>
          </View>  
        </View>
      </View>
    </View>
  </View>
  );
};

export default TimrTableView;
