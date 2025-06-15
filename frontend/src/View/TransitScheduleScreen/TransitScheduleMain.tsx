import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Dimensions,
  InteractionManager,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { TIMETABLES } from "../../data/transitSchedule";
import * as Location from "expo-location";

// ===== 定数データ =====
const campuses = [
  "BKC",
  // , "OIC", "KIC"
];

const campuseDetails = {
  BKC: {
    name: "BKC",
    latitude: 34.982755,
    longitude: 135.963002,
  },
  // , "OIC", "KIC"
};

const campusNearRoutes = {
  BKC: "BKC ➔ 南草津駅",
};

const routes = {
  BKC: [
    "南草津駅 ➔ BKC",
    "BKC ➔ 南草津駅",
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

const { width: screenWidth } = Dimensions.get("window");

// 祝日判定（簡易: 祝日ライブラリ未使用）
const isHoliday = (date: Date) => {
  // ここで祝日判定を追加したい場合はライブラリを利用してください
  return false; // 祝日判定なし（必要なら拡張）
};

// 平日/土日祝の自動判別
const getInitialDay = () => {
  const today = new Date();
  const day = today.getDay();
  if (day === 0 || day === 6 || isHoliday(today)) {
    return "土日祝";
  }
  return "平日";
};

// 2点間の距離計算（Haversine 公式）
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // 地球半径 km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const TransitScheduleMain = () => {
  const [selectedCampus, setSelectedCampus] = useState("BKC");
  const [selectedRoute, setSelectedRoute] = useState(routes["BKC"][0]);
  const [selectedDay, setSelectedDay] = useState(getInitialDay()); // ←ここを自動判別に
  const [locationChecked, setLocationChecked] = useState(false);

  const navigation: any = useNavigation();
  const scrollRefHorizontal = useRef(null);
  const scrollRefVertical = useRef(null);
  const nowLineRef = useRef(null);

  useEffect(() => {
    const loadCampus = async () => {
      const savedCampus = await AsyncStorage.getItem("selectedCampus");
      if (savedCampus && routes[savedCampus]) {
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

    if (scrollRefHorizontal.current) {
      scrollRefHorizontal.current.scrollTo({ x: 0, animated: false });
    }
  };

  const handleRouteTabPress = (route: string) => {
    const index = routes[selectedCampus].indexOf(route);
    if (scrollRefHorizontal.current) {
      scrollRefHorizontal.current.scrollTo({
        x: index * screenWidth,
        animated: true,
      });
    }
    setSelectedRoute(route);
  };

  const handleHorizontalScrollEnd = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
    const newRoute = routes[selectedCampus][index];
    if (newRoute && newRoute !== selectedRoute) {
      setSelectedRoute(newRoute);
    }
  };

  // 現在時刻取得
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (nowLineRef.current && scrollRefVertical.current) {
        console.log("nowLineRef.current", nowLineRef.current);
        nowLineRef.current.measure((fx, fy, width, height, px, py) => {
          scrollRefVertical.current
            .getScrollResponder()
            .scrollResponderScrollNativeHandleToKeyboard(
              nowLineRef.current,
              500,
              true
            );
        });
      }
    }, 500); // 初回だけちょっと長め

    return () => clearTimeout(timer);
  }, []); // ←初回だけ！

  // タブ切り替え時用（今まで通り）
  useEffect(() => {
    const timer = setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        console.log("nowLineRef.curren 2t", nowLineRef.current);

        if (nowLineRef.current && scrollRefVertical.current) {
          nowLineRef.current.measure((fx, fy, width, height, px, py) => {
            scrollRefVertical.current
              .getScrollResponder()
              .scrollResponderScrollNativeHandleToKeyboard(
                nowLineRef.current,
                500,
                true
              );
          });
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedCampus, selectedDay, selectedRoute]);

  // 現在時刻ラインまで自動で下スクロール（ScrollViewのscrollToでy座標指定）
  useEffect(() => {
    const timer = setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        if (nowLineRef.current && scrollRefVertical.current) {
          nowLineRef.current.measureLayout(
            scrollRefVertical.current,
            (x, y) => {
              scrollRefVertical.current.scrollTo({ y: y - 100, animated: true });
            },
            (error) => {
              // 失敗時は何もしない
            }
          );
        }
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedCampus, selectedDay, selectedRoute]);

  // 端末の現在地から最寄りキャンパスのルートを自動選択
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationChecked(true);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      let found = false;
      for (const campusKey of Object.keys(campuseDetails)) {
        const campus = campuseDetails[campusKey];
        const dist = getDistanceFromLatLonInKm(
          loc.coords.latitude,
          loc.coords.longitude,
          campus.latitude,
          campus.longitude
        );
        if (dist <= 1.5 && campusNearRoutes[campusKey]) {
          setSelectedCampus(campusKey);
          // setSelectedRoute(campusNearRoutes[campusKey]);
          handleRouteTabPress(campusNearRoutes[campusKey]);
          found = true;
          break;
        }
      }
      setLocationChecked(true);
    })();
  }, []);

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
              時刻表
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
          {/* 行き先タブ */}
          <View style={{ marginVertical: 16 }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ alignItems: "center" }}
            >
              {routes[selectedCampus].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => handleRouteTabPress(item)}
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

          {/* 横スクロールで各路線ごとの時刻表 */}
          <ScrollView
            ref={scrollRefHorizontal}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleHorizontalScrollEnd}
            contentContainerStyle={{
              width: (screenWidth - 32) * routes[selectedCampus].length,
            }}
          >
            {routes[selectedCampus].map((route) => {
              const timetableData = TIMETABLES[route] || {
                weekday: [],
                weekend: [],
              };
              const timetable =
                selectedDay === "平日"
                  ? timetableData.weekday
                  : timetableData.weekend;
              // 型を明示
              const groupedTimetable: { [hour: string]: typeof timetable } =
                timetable.reduce((acc, entry) => {
                  const hour = entry.time.split(":")[0] + "時台";
                  if (!acc[hour]) acc[hour] = [];
                  acc[hour].push(entry);
                  return acc;
                }, {} as { [hour: string]: typeof timetable });

              let nowLineInserted = false;

              return (
                <ScrollView
                  key={route}
                  style={{
                    width: screenWidth,
                    backgroundColor: "#fff",
                    borderRadius: 12,
                    padding: 8,
                  }}
                  ref={route === selectedRoute ? scrollRefVertical : undefined}
                >
                  {Object.entries(groupedTimetable).map(([hour, entries]) => (
                    <View key={hour}>
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
                        const shouldInsertNowLine = !nowLineInserted && entryMinutes > nowMinutes;
                        if (shouldInsertNowLine) {
                          nowLineInserted = true;
                        }
                        return (
                          <View key={index}>
                            {shouldInsertNowLine && route === selectedRoute && (
                              <View
                                style={{
                                  alignItems: "center",
                                  marginVertical: 10,
                                  position: "relative",
                                }}
                                ref={nowLineRef}
                              >
                                <View
                                  style={{
                                    height: 2.5,
                                    backgroundColor: THEME_COLOR,
                                    width: "100%",
                                    borderRadius: 2,
                                    position: "absolute",
                                    top: "50%",
                                  }}
                                />
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

                            <TouchableOpacity
                              onPress={() => {
                                if (entry.link) {
                                  navigation.navigate(
                                    "TransitScheduleWebView",
                                    {
                                      url: entry.link,
                                    }
                                  );
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
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: "bold",
                                  color: TEXT_COLOR,
                                  width: 70,
                                }}
                              >
                                {entry.time} 発
                              </Text>

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
              );
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransitScheduleMain;
