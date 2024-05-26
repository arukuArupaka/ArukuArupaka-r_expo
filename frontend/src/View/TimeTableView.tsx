import React from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  useColorScheme,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import WeekFram from "../component/TimeTable/WeekFrame";
import ClassFrame from "../component/TimeTable/ClassFrame";
import TimeTableInfo from "../component/TimeTable/TimeTableInfo";
import ClassTime from "../component/TimeTable/classTime";
import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TimeTableQty from "../component/TimeTable/TimeTableQty";
import { useTimeTable } from "../component/TimeTable/TimeTableContext";
import Dialog from "react-native-dialog";
import RNPickerSelect from "react-native-picker-select";

const TimrTableView = ({ navigation }) => {
  const {
    kamokuStatus,
    setKamokuStatus,
    unitCalc,
    setUnitCalc,
    unitSum,
    setUnitSum,
    weekTimeQty,
    timesize,
    setWeekTimeQty,
    sizechange,
    setSizechange,
    padding,
    show,
    setShow,
    season,
    setSeason,
    time,
    setTime,
    day,
    setDay,
    department,
    setDepartment,
    dodata,
    setDodata,
    pushedClassFrameDetail,
    setPushedClassFrameDetail,
    weekTime,
    setWeekTime,
    indata,
    setIndata,
    period,
    setPeriod,
    kamokuItem,
    setKamokuItem,
    nodata,
    setNodata,
    isInfoShow,
    setIsInfoShow,
  } = useTimeTable();

  const [showTutorial, setShowTutorial] = useState(true);
  const [schoolName, setSchoolName] = useState(true);
  
  const requestPermissionsAsync = async () => {
    const { granted } = await Notifications.getPermissionsAsync();
    if (granted) {
      return;
    }

    await Notifications.requestPermissionsAsync();
  };

  //プッシュ通知系
  React.useEffect(() => {
    requestPermissionsAsync();
  });

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const scheduleNotificationAsync = async (
    classDetail,
    notificationHour,
    notificationMinute
  ) => {
    try {
      // デバッグ: notificationTime の内容を確認
      console.log("Scheduling notification:", notificationHour);
      let classroom = classDetail.classRoom;

      // 通知をスケジュールする際に数値であることを確認
      if (
        typeof notificationHour === "number" &&
        typeof notificationMinute === "number"
      ) {
        const trigger = new Date();
        trigger.setHours(notificationHour);
        trigger.setMinutes(notificationMinute);
        console.log("notificationHour:", notificationHour);
        console.log("notificationMinute:", notificationMinute);
        console.log("classDetail.day:", classDetail.day);
        if (classDetail.day == 5) {
          classDetail.day = 0;
        }

        if (classDetail.classRoom.indexOf("コラーニング") >= 0) {
          classroom = classDetail.classRoom.replace("コラーニング", "C");
        } else if (classDetail.classRoom.indexOf("フォレストハウス") >= 0) {
          classroom = classDetail.classRoom.replace("フォレストハウス", "F");
        } else if (classDetail.classRoom.indexOf("プリズムハウス") >= 0) {
          classroom = classDetail.classRoom.replace("プリズムハウス", "P");
        }

        await Notifications.scheduleNotificationAsync({
          content: {
            body: classDetail.memo,
            title: classroom + " " + classDetail.className + "       ",
          },
          trigger: {
            weekday: classDetail.day + 2,
            hour: notificationHour,
            minute: notificationMinute,
            repeats: true,
          },
        });
      }
    } catch (e) {
      console.log(e.message);
      console.log("例外処理です");
    }
  };
  //通知時間計算
  const timeCalc = (hour, minute, notification) => {
    let notificationHour = hour;
    let notificationMinute = minute;

    if (minute >= notification) {
      notificationHour = hour;
      notificationMinute = minute - notification;
    } else if (minute < notification) {
      if (notification <= 60) {
        notificationHour = hour - 1;
        notificationMinute = 60 - (notification - minute);
      } else if (minute >= Math.floor(notification % 60)) {
        notificationHour = hour - Math.floor(notification / 60);
        notificationMinute = minute - Math.floor(notification % 60);
      } else {
        notificationHour = hour - Math.floor(notification / 60) - 1;
        notificationMinute =
          60 - Math.abs(minute - Math.floor(notification % 60));
      }
    }
    //0時、24時の処理
    if (notificationHour < 0) {
      notificationHour += 24;
    } else if (notificationHour >= 24) {
      notificationHour -= 24;
    }

    return { notificationHour, notificationMinute };
  };

  const notificationTime = [
    [
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
    ],
    [
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
    ],
    [
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
    ],
    [
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
    ],
    [
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
      { notihour: "", notiminute: "" },
    ],
  ];

  //時間割系
  const [isShow, setIsShow] = useState(false);

  const classStartEndTimeUnitList = [
    {
      start: "9:00",
      end: "10:30",
      hour: 9,
      minute: 0,
    },
    {
      start: "10:40",
      end: "12:10",
      hour: 10,
      minute: 40,
    },
    {
      start: "13:00",
      end: "14:30",
      hour: 13,
      minute: 0,
    },
    {
      start: "14:40",
      end: "16:10",
      hour: 14,
      minute: 40,
    },
    {
      start: "16:20",
      end: "17:50",
      hour: 16,
      minute: 20,
    },
    {
      start: "18:00",
      end: "19:30",
      hour: 18,
      minute: 0,
    },
    {
      start: "19:40",
      end: "20:10",
      hour: 19,
      minute: 40,
    },
  ];

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

  useEffect(() => {
    console.log("nodata:", nodata);
  }, [nodata]);

  useEffect(() => {
    getData();
  }, [nodata]);

  useEffect(() => {
    console.log("kamokuStatus:", kamokuStatus);
  }, [kamokuStatus]);

  useEffect(() => {
    getData();
  }, [kamokuStatus]);

  useEffect(() => {
    getData();
  }, [weekTimeQty]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("timeTableKey");
      jsonValue != null ? setWeekTime(JSON.parse(jsonValue)) : null;
      //console.log('timeTableKey:',jsonValue)
      console.log("weekTimeQty:", weekTimeQty);
      //console.log(weekTime)
      console.log("scheduleNotificationAsync:", scheduleNotificationAsync());
    } catch (e) {
      console.log(e);
    }
  };

  const saveDate = async (weekTime) => {
    //console.log(weekTime)
    try {
      const jsonValue = JSON.stringify(weekTime);
      await AsyncStorage.setItem("timeTableKey", jsonValue);
    } catch (e) {
      console.log("e");
    }
  };

  useEffect(() => {
    saveDate(weekTime);
  });

  //weekTimeQtyの保存・読み出し

  useEffect(() => {
    const loadWeekTimeQty = async () => {
      try {
        const savedWeekTimeQty = await AsyncStorage.getItem("weekTimeQtyKey");
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
        const stringValue = await AsyncStorage.getItem("sizechangekey");
        if (stringValue != null) {
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
        await AsyncStorage.setItem("sizechangekey", stringValue);
      } catch (e) {
        console.log(e);
      }
    };

    savesizechange();
  }, [sizechange]);

  useEffect(() => {
    const saveWeekTimeQty = async () => {
      try {
        await AsyncStorage.setItem(
          "weekTimeQtyKey",
          JSON.stringify(weekTimeQty)
        );
      } catch (e) {
        console.log(e);
      }
    };

    saveWeekTimeQty();
  }, [weekTimeQty]);

  useEffect(() => {
    console.log("sizechange:", sizechange);
  }, [sizechange]);

  //nodataの保存・読み出し

  useEffect(() => {
    const loadnodata = async () => {
      try {
        const stringValue = await AsyncStorage.getItem("nodatakey");
        if (stringValue != null) {
          const value = JSON.parse(stringValue);
          setNodata(value);
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadnodata();
  }, []);

  useEffect(() => {
    const savenodata = async () => {
      try {
        const stringValue = JSON.stringify(nodata);
        await AsyncStorage.setItem("nodatakey", stringValue);
      } catch (e) {
        console.log(e);
      }
    };

    savenodata();
    console.log("nodataの保存が実行され、その値は", nodata);
  }, [nodata]);

  //kamokuStatusの保存、読み込み

  useEffect(() => {
    const loadkamokuStatus = async () => {
      try {
        const stringValue = await AsyncStorage.getItem("kamokuStatuskey");
        if (stringValue != null) {
          const value = JSON.parse(stringValue);
          setKamokuStatus(value);
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadkamokuStatus();
  }, []);

  useEffect(() => {
    const savekamokuStatus = async () => {
      try {
        const stringValue = JSON.stringify(kamokuStatus);
        await AsyncStorage.setItem("kamokuStatuskey", stringValue);
      } catch (e) {
        console.log(e);
      }
    };

    savekamokuStatus();
    console.log("kamokuStatusの保存が実行され、その値は", kamokuStatus);
  }, [kamokuStatus]);

  //unitcalcの計算
  useEffect(() => {
    const loadunit = async () => {
      try {
        const stringValue = await AsyncStorage.getItem("unitsumkey");
        if (stringValue != null) {
          const value = JSON.parse(stringValue);
          console.log("unitSumの値は");
          console.log(unitSum);
          setUnitSum(value);
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadunit();
  }, []);

  useEffect(() => {
    const saveunit = async () => {
      try {
        const stringValue = JSON.stringify(unitSum);
        await AsyncStorage.setItem("unitsumkey", stringValue);
      } catch (e) {
        console.log(e);
      }
    };

    saveunit();
    console.log("unitsumの保存が実行され、その値は", unitSum);
  }, [unitSum]);

  ////////////

  useEffect(() => {
    const getDepartmentChange = async () => {
      try {
        const stringValue = await AsyncStorage.getItem("departmentkey");
        if (stringValue != null) {
          const value = JSON.parse(stringValue);
          setDepartment(value);
          console.log(department);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getDepartmentChange();
  }, []);

  useEffect(() => {
    const saveDepartmentChange = async () => {
      try {
        const stringValue = JSON.stringify(department);
        await AsyncStorage.setItem("departmentkey", stringValue);
        console.log("保存実行されました");
      } catch (e) {
        console.log(e);
      }
    };
    saveDepartmentChange();
  }, [department]);

  useEffect(() => {
    const getSeasonChange = async () => {
      try {
        const stringValue = await AsyncStorage.getItem("seasonkey");
        if (stringValue != null) {
          const value = JSON.parse(stringValue);
          setSeason(value);
          console.log(season);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getSeasonChange();
  }, []);

  useEffect(() => {
    const saveSeasonChange = async () => {
      try {
        const stringValue = JSON.stringify(season);
        await AsyncStorage.setItem("seasonkey", stringValue);
        console.log("保存実行されました");
      } catch (e) {
        console.log(e);
      }
    };

    saveSeasonChange();
  }, [season]);

  const styles = StyleSheet.create({
    bodys: {
      flexDirection: "row",
      backgroundColor: "#F8F8F8",
      width: "100%",
      paddingTop: 30,
      paddingBottom: padding,
      paddingLeft: 0,
      paddingRight: 0,
      height: "100%",
      alignItems: "stretch",
      //backgroundColor: 'green',
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    tables: {
      flexDirection: "column",
      height: "80%",
    },
    tableWeek: {
      //backgroundColor:'#888888',
      height: 35,
      width: "100%",
      flexDirection: "row",
    },
    rowClass: {
      flexDirection: "column",
      flex: 1,
      height: "100%",
    },
    timeTableClass: {
      flexDirection: "row",
      width: "100%",
      height: 125.1,
      paddingRight: 2,
    },
    classList: {
      height: "90%",
      flex: 9,
      //backgroundColor: 'blue'
    },
    classTimeContiner: {
      marginTop: 35,
      flex: 1,
      //backgroundColor:'blue',
      height: timesize,
      //backgroundColor: 'pink'
    },
    buttons: {
      paddingTop: 110,
      justifyContent: "start",
      height: "100%",
      width: "100%",
      alignItems: "flex-start",
    },
    Qtybutton: {
      flexDirection: "row",
      width: "17%",
      height: "8.5%",
      alignSelf: "flex-end",
      justifyContent: "space-between",
    },
    TableEnt: {
      height: "100%",
    },
    scrollView: {
      width: "100%",
      height: "100%",
    },
    scrollViewContent: {
      flexGrow: 1,
    },
  });

  const onSubmit = (classDetail, notificationHour, notificationMinute) => {
    setWeekTime((prev) => {
      prev[classDetail.day][classDetail.period] = classDetail;
      return prev;
    });
    scheduleNotificationAsync(
      classDetail,
      notificationHour,
      notificationMinute
    );
    console.log("onSubmit///hour:", notificationHour);
    console.log("onSubmit///minute:", notificationMinute);
  };

  const [childSize, setChildSize] = useState({ width: 0, height: 0 });

  const dayad = (qty) => {
    let day = "月";
    switch (qty) {
      case 0:
        day = "月";
        break;
      case 1:
        day = "火";
        break;
      case 2:
        day = "水";
        break;
      case 3:
        day = "木";
        break;
      case 4:
        day = "金";
        break;
      default:
        day = "月";
    }
    return day;
  };

  return (
    <View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={{ zIndex: 300, left: "10%", top: 110 }}>
          {/*{isInfoShow && <TimeTableInfo day={pushedClassFrameDetail.day} period={pushedClassFrameDetail.period} onEventCallBack={()=>{setIsInfoShow(false)}} onSubmit={onSubmit} timeCalc={timeCalc} classStartEndTimeUnitList={classStartEndTimeUnitList}/>}*/}
        </View>
        <View style={styles.bodys}>
          <View
            style={styles.classTimeContiner}
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              if (childSize !== height) {
                // 現在の高さと異なる場合のみ更新
                setChildSize(height);
                console.log(height);
              } // classTimeContainerの高さを取得して状態にセット
            }}
          >
            {classStartEndTimeUnitList
              .slice(0, weekTimeQty)
              .map((classStartEndTimeUnitList, index) => (
                <ClassTime
                  key={index}
                  data={classStartEndTimeUnitList}
                  weekTimeQty={weekTimeQty}
                ></ClassTime>
              ))}
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
                  {weekTime.map((weekTime1, index) => (
                    <View key={index} style={styles.rowClass}>
                      {weekTime1
                        .slice(0, weekTimeQty)
                        .map((weekTime2, index) => (
                          <ClassFrame
                            key={index}
                            TimeTableDate={weekTime2}
                            day={weekTime2.day}
                            period={weekTime2.period}
                            className={weekTime2.className}
                            weekTimeQty={weekTimeQty}
                            onEventCallBack={(frameDetail) => {
                              //console.log(typeof weekTime2.day);
                              //console.log(typeof weekTime2.period);
                              if (weekTime2.className == "") {
                                setShow(true);
                                setPeriod(weekTime2.period);
                                const adDay = dayad(weekTime2.day);
                                setDay(adDay);
                                setTime(weekTime2.period + 1);
                                navigation.navigate("TimeTableClass");
                                setDodata(true);
                                console.log("Viewのdayとperiod");
                                console.log(weekTime2.day - 0);
                                console.log(weekTime2.period - 0);
                                console.log(weekTime2);
                                setIsInfoShow(false);
                                setPushedClassFrameDetail({
                                  day: weekTime2.day - 0,
                                  period: weekTime2.period - 0,
                                });
                              } else {
                                setIsShow(true);
                                setPushedClassFrameDetail({
                                  day: weekTime2.day - 0,
                                  period: weekTime2.period - 0,
                                });
                                setPeriod(weekTime2.period);
                                const adDay = dayad(weekTime2.day);
                                setDay(adDay);
                                setTime(weekTime2.period + 1);
                                navigation.navigate("KomaView");
                                console.log(weekTime2);
                                console.log("colorは");
                                console.log(weekTime[0][0].color);
                              }
                            }}
                          />
                        ))}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Dialog.Container visible={showTutorial}>
      <Dialog.Title style={{marginBottom:10}}>チュートリアル(2/2)</Dialog.Title>


        <Dialog.Description>
          大学 学部 学科 セメスターを選択してください。
        </Dialog.Description>
        <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
          <Dialog.Description>立命館の学生ですか？</Dialog.Description>
          <Dialog.Switch
            value={schoolName}

              onValueChange={(value)=>setSchoolName(value)}
          />
        </View>
        {schoolName&&<View style={{marginHorizontal:20}}>
        <RNPickerSelect
          items={[
            { label: '法学部', value: '法学部', key: 'hougaku' },
            { label: '経済学部', value: '経済学部', key: 'keizai' },
            { label: '経営学部', value: '経営学部', key: 'keiei' },
            { label: '産業社会学部', value: '産業社会学部', key: 'sansha' },
            { label: '国際関係学部', value: '国際関係学部', key: 'kokusai' },
            { label: '政策科学部', value: '政策科学部', key: 'seisaku' },
            { label: '文学部', value: '文学部', key: 'bun' },
            { label: '映像学部', value: '映像学部', key: 'eizou' },
            { label: '総合心理学部', value: '総合心理学部', key: 'sougou' },
            { label: '理工学部', value: '理工学部', key: 'rikou' },
            { label: 'グローバル教養学部', value: 'グローバル教養学部', key: 'gurokyou' },
            { label: '食マネジメント学部', value: '食マネジメント学部', key: 'shokumane' },
            { label: '情報理工学部', value: '情報理工学部', key: 'jouri' },
            { label: '生命科学部', value: '生命科学部', key: 'seimei' },
            { label: '薬学部', value: '薬学部', key: 'yakugaku' },
            { label: 'スポーツ健康学部', value: 'スポーツ健康学部', key: 'supoken' }
        ]}
          onValueChange={(value) => setDepartment(value)}
          value={department}
          placeholder={{label:"ここをタップして学部選択", value: ''}}
        />
        <RNPickerSelect
          items={[
            { label: "秋セメスター", value: "秋セメスター", key: "fall" },
            { label: "春セメスター", value: "春セメスター", key: "spring" },
          ]}
          onValueChange={(value) => setSeason(value)}
          value={season}
          placeholder={{label:"ここをタップしてセメスター選択", value: ''}}
        />
        </View>}
        {schoolName&&(true)&&<Text style={{color:'red',textAlign:'center'}}>学部とセメスターを選択してください。</Text>}
        {/* <Dialog.Button label="Cancel" color="red" onPress={() => {}} /> */}
        <Dialog.Button label="OK" onPress={() => {}} />
      </Dialog.Container>
    </View>
  );
};

export default TimrTableView;
