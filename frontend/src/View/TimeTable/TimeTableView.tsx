import { View, StyleSheet, Text, Touchable, TouchableOpacity } from "react-native";
import WeekRow from "../../component/TimeTable/timeTableView/WeekRow";
import ClassTimeColumn from "../../component/TimeTable/timeTableView/ClassTimeColumn";
import React, { useEffect, useRef, useState } from "react";
import TimeTableViewBody from "../../component/TimeTable/timeTableView/TimeTableViewBody";
import Dialog from "react-native-dialog";
import { Video } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../component/TimeTable/types/root-stack-param-list";
import FriendSelectContainer from "../../component/TimeTable/common/FriendSelectContainer";
import { useTimeTable } from "../../component/TimeTable/TimeTableContext";

const TimeTableView = () => {
  const [showTutorial1, setShowTutorial1] = useState(false);
  const { userSettingContent } = useTimeTable();
  const videoRef = useRef(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        if (hasLaunched === null) {
          // 初回起動
          await AsyncStorage.setItem("hasLaunched", "true");
          setShowTutorial1(true);
        } else {
          // 2回目以降の起動
        }
      } catch (error) {
        console.log("Error checking first launch:", error);
      }
    };

    checkFirstLaunch();
  }, []);

  useEffect(() => {
    console.log("userSettingContent:", userSettingContent);
  }, [userSettingContent]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        {(!userSettingContent.department ||
          !userSettingContent.semester ||
          !userSettingContent.schoolYear) && (
          <TouchableOpacity onPress={() => {navigation.navigate("TimeTableSetting")}}
            style={{
              backgroundColor: "#D32F2F", // 明るい黄色
              borderRadius: 10,
              paddingVertical: 5,
              marginTop: 10,
              paddingHorizontal: 15,
              marginHorizontal: 10, // 左右に余白を確保
              // 影をつける（iOS用）
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
              // Android用
              elevation: 4,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: "#FFEB3B", // 濃い赤
                textAlign: "center",
              }}
            >
              {"⚠️学部かセメスターか年度\nが選択されていません。"}
            </Text>
          </TouchableOpacity>
        )}
        <FriendSelectContainer />
      </View>
      <View
        style={{
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
