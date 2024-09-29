import { View, StyleSheet,Text } from "react-native";
import WeekRow from "../../component/TimeTable/timeTableView/WeekRow";
import ClassTimeColumn from "../../component/TimeTable/timeTableView/ClassTimeColumn";
import React, { useEffect, useRef, useState } from "react";
import TimeTableViewBody from "../../component/TimeTable/timeTableView/TimeTableViewBody";
import Dialog from "react-native-dialog";
import { Video } from "expo-av";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";



const TimeTableView = () => {
  const [showTutorial1, setShowTutorial1] = useState(false);
  const videoRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          // 初回起動
          await AsyncStorage.setItem('hasLaunched', 'true');
          setShowTutorial1(true);
        } else {
          // 2回目以降の起動
        }
      } catch (error) {
        console.log('Error checking first launch:', error);
      }
    };

    checkFirstLaunch();
  }, []);

  

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 50,
          height: "100%",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <View style={{ width: "99%", height: "100%", flexDirection: "row" }}>
          <View style={styles.timeColumnContainer}>
            <ClassTimeColumn />
          </View>
          <View style={styles.weekAndClassContainer}>
            <WeekRow />
            <TimeTableViewBody />
          </View>
        </View>
      </View>
      {showTutorial1 && (
        <Dialog.Container visible={true}>
          <Dialog.Title>チュートリアル</Dialog.Title>
          <Dialog.Description>
            授業開始前に教室の場所を通知する機能です。
          </Dialog.Description>
          <View style={{ alignItems: "center", marginBottom: 30 }}>
            <Video
              ref={videoRef}
              style={{ width: 175, height: 300 }}
              source={require("../../videos/notificationExample.mp4")}
              useNativeControls
              resizeMode="contain"
              shouldPlay
              isLooping
              onPlaybackStatusUpdate={(status) => {}}
            />
          </View>
          <Dialog.Button
            label="次へ"
            onPress={() => {
              setShowTutorial1(false);
              navigation.navigate("TimeTableSetting");
            }}
          />
        </Dialog.Container>
      )}
      
    </View>
  );
};
const styles = StyleSheet.create({
  timeColumnContainer: {
    height: "85%",
    flex: 1,
  },
  weekAndClassContainer: {
    flexDirection: "column",
    height: "85%",
    flex: 8,
  },
});

export default TimeTableView;
