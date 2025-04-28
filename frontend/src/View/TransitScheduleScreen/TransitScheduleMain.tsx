import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Linking,
  InteractionManager,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { TIMETABLES } from "../../data/transitSchedule";

// ===== 定数データ =====
const campuses = [
  "BKC",
  //  ,"KIC", "OIC"
];

const routes = {
  BKC: [
    "BKC ➔ 南草津駅",
    "南草津駅 ➔ BKC",
    // "南草津駅 ➔ 大阪駅",
    // "南草津駅 ➔ 米原駅",
  ],
  OIC: ["茨木駅 ➔ 大阪駅", "茨木駅 ➔ 京都駅", "茨木市駅 ➔ 大阪梅田駅"],
  KIC: ["KIC前 ➔ 京都駅"],
};

const weekdays = ["平日", "土日祝"];

const THEME_COLOR = "#7A1C23";
const TEXT_COLOR = "#333";
const SUBTEXT_COLOR = "#888";
const BG_COLOR = "#F5F5F5";

const TransitScheduleMain = () => {
  const [selectedCampus, setSelectedCampus] = useState("BKC");
  const [selectedRoute, setSelectedRoute] = useState(routes["BKC"][0]);
  const [selectedDay, setSelectedDay] = useState("平日");

  const timetableData = TIMETABLES[selectedRoute] || {
    weekday: [],
    weekend: [],
  };
  const timetable =
    selectedDay === "平日" ? timetableData.weekday : timetableData.weekend;

  const navigation = useNavigation();

  useEffect(() => {
    const loadCampus = async () => {
      const savedCampus = await AsyncStorage.getItem("selectedCampus");
      if (savedCampus) {
        setSelectedCampus(savedCampus);
        setSelectedRoute(routes[savedCampus][0]);
      }
    };
    loadCampus();
  }, []);

  const handleCampusChange = async (campus: string) => {
    setSelectedCampus(campus);
    setSelectedRoute(routes[campus][0]);
    await AsyncStorage.setItem("selectedCampus", campus);
  };

  // 現在時刻取得
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  // ===== 時間ごとにグループ化 =====
  const groupedTimetable = timetable.reduce((acc, entry) => {
    const hour = entry.time.split(":")[0] + "時台";
    if (!acc[hour]) acc[hour] = [];
    acc[hour].push(entry);
    return acc;
  }, {});

  let nowLineInserted = false; // 全体で1回だけ表示するフラグ

  // スクロール制御系

  const scrollRef = useRef(null); // ScrollView用のref
  const nowLineRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (nowLineRef.current && scrollRef.current) {
        nowLineRef.current.measure((fx, fy, width, height, px, py) => {
          scrollRef.current.scrollTo({ y: py - 300, animated: true });
        });
      }
    }, 100); // 100ms 待つと安定するケースが多い

    return () => clearTimeout(timer);
  }, [selectedCampus, selectedDay, selectedRoute]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME_COLOR }}>
      <View style={{ flex: 1, backgroundColor: BG_COLOR }}>
        <StatusBar barStyle="light-content" />

        {/* ===== カスタムヘッダー ===== */}
        <View
          style={{
            backgroundColor: THEME_COLOR,
            paddingTop: 10,
            paddingBottom: 10,
            paddingHorizontal: 20,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderBottomWidth: 4,
            borderColor: "#5C1F29",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 4,
            elevation: 6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ padding: 5 }}
            >
              <Entypo name="chevron-left" size={28} color="#fff" />
            </TouchableOpacity>

            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold",
                letterSpacing: 2,
                textAlign: "center",
                flex: 1,
                marginRight: 28,
              }}
            >
              BusDess 強化版
            </Text>
          </View>

          <View
            style={{
              marginTop: 12,
              alignSelf: "center",
              backgroundColor: "#fff",
              paddingVertical: 6,
              paddingHorizontal: 16,
              borderRadius: 20,
              flexDirection: "row",
            }}
          >
            <Entypo name="location-pin" size={20} color={THEME_COLOR} />
            <RNPickerSelect
              onValueChange={(value) => handleCampusChange(value)}
              items={campuses.map((c) => ({ label: c, value: c }))}
              value={selectedCampus}
              useNativeAndroidPickerStyle={false}
              style={{
                inputIOS: {
                  color: THEME_COLOR,
                  fontWeight: "bold",
                  textAlign: "left",
                  paddingLeft: 10,
                  width: 100,
                },
                inputAndroid: {
                  color: THEME_COLOR,
                  fontWeight: "bold",
                  textAlign: "center",
                },
              }}
              Icon={() => (
                <Entypo
                  style={{ fontSize: 16, color: THEME_COLOR }}
                  name="select-arrows"
                  size={20}
                />
              )}
              placeholder={{}}
            />
          </View>
        </View>

        {/* ===== メインコンテンツ ===== */}
        <View style={{ flex: 1, padding: 16 }}>
          {/* 行き先・到着地 */}
          <View style={{ marginVertical: 16 }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ alignItems: "center" }}
            >
              {routes[selectedCampus].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setSelectedRoute(item)}
                  style={{ marginRight: 20 }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: selectedRoute === item ? THEME_COLOR : TEXT_COLOR,
                      borderBottomWidth: selectedRoute === item ? 2 : 0,
                      borderColor: THEME_COLOR,
                      paddingBottom: 4,
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* 曜日切替 */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            {weekdays.map((day) => (
              <TouchableOpacity
                key={day}
                onPress={() => setSelectedDay(day)}
                style={{
                  backgroundColor: selectedDay === day ? THEME_COLOR : "#ddd",
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 20,
                  marginHorizontal: 6,
                }}
              >
                <Text
                  style={{
                    color: selectedDay === day ? "#fff" : "#555",
                    fontSize: 12,
                  }}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ===== 時刻表リスト（デザイン改良版） ===== */}
          <ScrollView
            ref={scrollRef}
            style={{ backgroundColor: "#fff", borderRadius: 12, padding: 8 }}
          >
            {Object.entries(groupedTimetable).map(([hour, entries]) => (
              <View key={hour}>
                {/* 時間帯ラベル */}
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    marginVertical: 6,
                    color: THEME_COLOR,
                  }}
                >
                  ◆ {hour}
                </Text>

                {entries.map((entry, index) => {
                  const entryMinutes =
                    parseInt(entry.time.split(":")[0]) * 60 +
                    parseInt(entry.time.split(":")[1]);
                  const nowMinutes = now.getHours() * 60 + now.getMinutes();
                  // const nowMinutes = 14 * 60 + 30; // 14時30分をハードコーディ*

                  const shouldInsertNowLine =
                    !nowLineInserted && entryMinutes > nowMinutes;

                  if (shouldInsertNowLine) {
                    nowLineInserted = true;
                  }

                  return (
                    <View key={index}>
                      {/* 現在時刻ライン */}
                      {shouldInsertNowLine && (
                        <View
                          style={{
                            alignItems: "center",
                            marginVertical: 10,
                            position: "relative",
                          }}
                          ref={nowLineRef}
                        >
                          {/* 太めのライン */}
                          <View
                            style={{
                              height: 2.5, // 太さUP
                              backgroundColor: THEME_COLOR,
                              width: "100%",
                              borderRadius: 2,
                              position: "absolute",
                              top: "50%",
                            }}
                          />
                          {/* 中央のテキストバッジ */}
                          <View
                            style={{
                              backgroundColor: "#fff",
                              paddingHorizontal: 10,
                              zIndex: 1,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                color: THEME_COLOR,
                                fontWeight: "bold",
                                letterSpacing: 1,
                              }}
                            >
                              現在 {currentTime}
                            </Text>
                          </View>
                        </View>
                      )}

                      {/* 時刻表アイテム */}
                      <TouchableOpacity
                        onPress={() => {
                          if (entry.link) {
                            navigation.navigate("TransitScheduleWebView", {
                              url: entry.link,
                            });
                          }
                        }}
                        disabled={!entry.link}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingVertical: 6,
                          borderBottomWidth: 1,
                          borderColor: "#eee",
                        }}
                      >
                        {/* 時刻 */}
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: TEXT_COLOR,
                            width: 70, // 固定幅で時刻を揃える
                          }}
                        >
                          {entry.time} 発
                        </Text>

                        {/* 詳細情報 */}
                        <Text
                          style={{
                            fontSize: 10,
                            color: SUBTEXT_COLOR,
                            flex: 1,
                          }}
                          numberOfLines={1}
                        >
                          {entry.detail}
                        </Text>

                        {/* リンクアイコン */}
                        {entry.link && (
                          <Entypo
                            name="chevron-right"
                            size={16}
                            color={THEME_COLOR}
                            style={{ marginLeft: 8 }}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransitScheduleMain;
