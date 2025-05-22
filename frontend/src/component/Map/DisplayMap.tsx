import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // 追加
import KitchenCarIconContainer from "./KitchenCarIconContainer";
import { BUILDINGS, CAMPUSES, mapObjectData } from "./buildingData";
import * as Location from "expo-location";
import { ARUPAKA_BACKEND_URL } from '@env';

const pinImage = require("../../image/map/image1.png");

const DisplayMap = (props) => {
  const navigation = useNavigation();
  const [selectedCampus, setSelectedCampus] = useState(props.campusData.id);
  const [period, setPeriod] = useState(1); // 1: 授業中 (デフォルト)
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [showOverlay, setShowOverlay] = useState(true);

  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOccupiedClassrooms = async (period) => {
    setLoading(true);
    setError(null);

    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const todayWeekday = weekdays[new Date().getDay()];

    const schoolYear = new Date().getFullYear();
    const semester = getSemester();

    try {
      const response = await fetch(
        `${ARUPAKA_BACKEND_URL}/lecture/get-occupied-classrooms?campus=${props.campusData.apiQuery}&schoolYear=${schoolYear}&semester=${semester}&weekday=${todayWeekday}&period=${period}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data);
      setClassrooms(data);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
      setError("データ取得に失敗しました。再試行してください。");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOccupiedClassrooms(period);
  }, [selectedCampus, period]);

  const getSemester = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    return month >= 3 && month <= 9 ? "Spring" : "Autumn";
  };

  // 日付と時間の更新
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const formattedTime = now.toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    setPeriod(getCurrentPeriod());

    return () => clearInterval(interval);
  }, []);

  const getCurrentPeriod = useCallback(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // 各時限の時間範囲
    const periods = [
      { period: 1, start: [9, 0], end: [10, 35] },
      { period: 2, start: [10, 45], end: [12, 20] },
      { period: 3, start: [13, 10], end: [14, 45] },
      { period: 4, start: [14, 55], end: [16, 30] },
      { period: 5, start: [16, 40], end: [18, 15] },
      { period: 6, start: [18, 25], end: [20, 0] },
      { period: 7, start: [20, 10], end: [21, 45] },
    ];

    for (let i = 0; i < periods.length; i++) {
      const { period, start, end } = periods[i];
      const [startHour, startMinute] = start;
      const [endHour, endMinute] = end;

      // 現在時刻がこの限目の範囲内にある場合
      if (
        (currentHour > startHour ||
          (currentHour === startHour && currentMinute >= startMinute)) &&
        (currentHour < endHour ||
          (currentHour === endHour && currentMinute <= endMinute))
      ) {
        return period;
      }
    }

    // 現在時刻がどの時限にも該当しない場合 → 次の時限を探す
    for (let i = 0; i < periods.length; i++) {
      const { period, start } = periods[i];
      const [startHour, startMinute] = start;

      if (
        currentHour < startHour ||
        (currentHour === startHour && currentMinute < startMinute)
      ) {
        return period; // 現在時刻より後の最も近い時限を返す
      }
    }

    return 1; // すべての時限が終了している場合 → 翌日の1限を返す
  }, [selectedCampus]);

  // マップをタッチしたらオーバーレイを3秒間表示
  const handleMapTouch = () => {
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 3000);
  };

  // 何限目かを変更する関数
  const changePeriod = (delta) => {
    setPeriod((prev) => {
      const newPeriod = prev + delta;
      return newPeriod < 1 ? 6 : newPeriod > 6 ? 1 : newPeriod;
    });
  };

  const findClassroomsByBuilding = useCallback(
    (buildingName) => {
      return classrooms.filter((room) => room.building === buildingName);
    },
    [classrooms]
  );

  const findNoClassroomsByBuilding = useCallback(
    (buildingName) => {
      return classrooms.filter(
        (room) => room.building === buildingName && room.isUsed === false
      );
    },
    [classrooms]
  );

  const goToBuildingDetails = (building) => {
    if (loading) {
      Alert.alert("データ取得中です。しばらくお待ちください。");
      return;
    }
    navigation.navigate("BuildingDetails", {
      building: building,
      classrooms: findClassroomsByBuilding(building.name),
    });
  };

  // キッチンカー表示ロジック

  const [kitchenCarJSON, setKitchenCarJSON] = useState([]);
  useEffect(() => {
    const url =
      "https://firestore.googleapis.com/v1/projects/arupaka-kitchen-car/databases/(default)/documents:runQuery";

    async function fetchCarPosition() {
      try {
        // 今日の0時0分0秒（ISO文字列）を取得
        const now = new Date();
        const startOfDay = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        const startOfDayISO = startOfDay.toISOString(); // ← ISO8601形式へ変換

        // クエリの構築（timestampValueにISO文字列を使用）
        const query = {
          structuredQuery: {
            from: [{ collectionId: "car_position_BKC" }],
            where: {
              fieldFilter: {
                field: { fieldPath: "time" },
                op: "GREATER_THAN_OR_EQUAL",
                value: { timestampValue: startOfDayISO },
              },
            },
          },
        };

        // POSTリクエストの送信
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(query),
        });

        if (!response.ok) {
          throw new Error("ネットワーク応答に問題がありました");
        }

        // レスポンスの解析
        const data = await response.json();
        const documents = data
          .map((doc) => doc.document)
          .filter((doc) => doc !== undefined);

        console.log("取得したドキュメント：", documents);

        if (documents.length > 0) {
          setKitchenCarJSON(documents);
        } else {
          console.log("本日のキッチンカー位置データは存在しません");
        }
      } catch (error) {
        console.error("フェッチエラー:", error);
      }
    }

    fetchCarPosition();
  }, []);

  // キッチンカーロジックここまで

  // firebase建物表示ロジック

  const [buildingDataFirebase, setBuildingDataFirebase] = useState([]);

  useEffect(() => {
    const url =
      "https://firestore.googleapis.com/v1/projects/arupaka-map-building/databases/(default)/documents:runQuery";

    async function fetchCarPosition() {
      try {
        // 今日の0時0分0秒（ISO文字列）を取得
        const now = new Date();
        const startOfDay = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        const startOfDayISO = startOfDay.toISOString(); // ← ISO8601形式へ変換

        // クエリの構築（timestampValueにISO文字列を使用）
        const query = {
          structuredQuery: {
            from: [{ collectionId: "building_position_BKC" }],
          },
        };

        // POSTリクエストの送信
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(query),
        });

        if (!response.ok) {
          // throw new Error("ネットワーク応答に問題がありました");
        }

        // レスポンスの解析
        const data = await response.json();
        const documents = data
          .map((doc) => doc.document)
          .filter((doc) => doc !== undefined);

        console.log("取得したドキュメント：", documents);

        if (documents.length > 0) {
          setBuildingDataFirebase(documents);
        } else {
          console.log("本日のキッチンカー位置データは存在しません");
        }
      } catch (error) {
        // console.error("フェッチエラー:", error);
      }
    }

    fetchCarPosition();
  }, []);

  // firebase建物ロジックここまで

  //現在位置取得
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    let locationSubscription = null;

    (async () => {
      // 権限リクエスト
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("位置情報の使用が許可されていません");
        return;
      }

      // リアルタイム位置情報の取得（watch）
      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000, // 最短間隔（ms）
          distanceInterval: 5, // 5m動いたら更新
        },
        (location) => {
          setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      );
    })();

    // アンマウント時に解除
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  //現在地取得ロジックここまで

  return (
    <View>
      {/* マップ */}
      <MapView
        style={{
          width: "100%",
          height: "100%",
        }}
        initialRegion={{
          latitude: CAMPUSES[selectedCampus].latitude,
          longitude: CAMPUSES[selectedCampus].longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        onTouchStart={handleMapTouch} // マップタッチでオーバーレイを表示
      >
        {/* 静的建物データ */}
        {mapObjectData.map((building, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: building.location.latitude,
              longitude: building.location.longitude,
            }}
            title={building.name}
            description={building.type.join(", ")}
          >
            <TouchableOpacity
              onLongPress={() =>
                navigation.navigate("HomeWebSite", { uri: building.url })
              }
            >
              <Image
                source={require("@src/image/map/bus_stand.png")}
                style={{ width: 18, height: 36 }}
              />
              <View style={{ width: 18, height: 36 }} />
            </TouchableOpacity>
          </Marker>
        ))}
        {/* 授業建物表示 */}
        {BUILDINGS.map((building, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: building.latitude,
              longitude: building.longitude,
            }}
            description="アイコンをタップして詳細表示"
            title={building.name}
            onPress={() => goToBuildingDetails(building)}
          >
            <View style={{ alignItems: "center" }}>
              {/* アイコン */}
              {/* <MaterialCommunityIcons name="map-marker" size={40} color={building.color} /> */}
              <Image
                source={pinImage}
                style={{ width: 40, height: 40, tintColor: building.color }}
              />

              {/* 数字バッジ */}
              <View
                style={{
                  position: "absolute",
                  top: -5,
                  right: -4,
                  backgroundColor: "red",
                  borderRadius: 10,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  elevation: 3, // Android影
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4, // iOS影
                }}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    {findNoClassroomsByBuilding(building.name).length}
                  </Text>
                )}
              </View>
            </View>
          </Marker>
        ))}
        {/* 授業建物表示ここまで */}
        {/* キッチンカー表示 */}
        {kitchenCarJSON &&
          kitchenCarJSON.length != 0 &&
          kitchenCarJSON.map((kitchenCarObject, index) => (
            <KitchenCarIconContainer
              kitchenCarObject={kitchenCarObject ? kitchenCarObject.fields : {}}
              key={index}
            />
          ))}
        {/* キッチンカー表示ここまで */}
        {/* firebase建物表示 */}
        {buildingDataFirebase &&
          buildingDataFirebase.length != 0 &&
          buildingDataFirebase.map((kitchenCarObject, index) => (
            <KitchenCarIconContainer
              kitchenCarObject={kitchenCarObject ? kitchenCarObject.fields : {}}
              key={index}
            />
          ))}
        {/* キッチンカー表示ここまで */}
        {/* ユーザーの位置 */}
        {userLocation && (
          <Marker coordinate={userLocation} title="現在地">
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {/* 外側のオーラ */}
              <View
                style={{
                  position: "absolute",
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "rgba(0, 122, 255, 0.2)", // 薄い青
                }}
              />
              {/* 中心の丸 */}
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: "#007bff", // 濃い青
                  borderWidth: 2,
                  borderColor: "#fff",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              />
            </View>
          </Marker>
        )}
        {/* ユーザーの位置ここまで */}
      </MapView>

      {/* 日時 & 限目のオーバーレイ */}
      {showOverlay && (
        <View
          style={{
            position: "absolute",
            top: 25,
            left: 10,
            right: 10,
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            {currentDate} {currentTime}
          </Text>
          <TouchableOpacity onPress={() => changePeriod(-1)}>
            <Text style={{ color: "#fff", fontSize: 24 }}>◀</Text>
          </TouchableOpacity>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            {period}限
          </Text>
          <TouchableOpacity onPress={() => changePeriod(1)}>
            <Text style={{ color: "#fff", fontSize: 24 }}>▶</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default DisplayMap;
