import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // 追加

const pinImage = require("../../image/map/image1.png");

const CAMPUSES = {
  ritsumei_BKC: { key: "BKC", latitude: 34.9805, longitude: 135.9635 },
  ritsumei_KIC: { key: "KIC", latitude: 35.033, longitude: 135.723 },
  ritsumei_OIC: { key: "OIC", latitude: 34.8105, longitude: 135.5615 },
};

const BUILDINGS = [
  {
    name: "京都衣笠体育館",
    latitude: 35.03260685626769,
    longitude: 135.72137243247462,
    color: "#FF0000",
  },
  {
    name: "明学館",
    latitude: 35.03248308641657,
    longitude: 135.7218558422674,
    color: "#00FF00",
  },
  {
    name: "恒心館",
    latitude: 35.032857400531455,
    longitude: 135.72187373062124,
    color: "#0000FF",
  },
  {
    name: "洋洋館",
    latitude: 35.03341132423693,
    longitude: 135.7221711441208,
    color: "#FFFF00",
  },
  {
    name: "諒友館",
    latitude: 35.033162954893704,
    longitude: 135.7224808017929,
    color: "#FF00FF",
  },
  {
    name: "啓明館",
    latitude: 35.03247981626899,
    longitude: 135.72246561526225,
    color: "#00FFFF",
  },
  {
    name: "尽心館",
    latitude: 35.032232331672624,
    longitude: 135.72241828644417,
    color: "#800000",
  },
  {
    name: "敬学館",
    latitude: 35.032224309856886,
    longitude: 135.72228619973652,
    color: "#808000",
  },
  {
    name: "清心館",
    latitude: 35.03242281638815,
    longitude: 135.72305892876838,
    color: "#008000",
  },
  {
    name: "研心館",
    latitude: 35.032951805200035,
    longitude: 135.72320462053875,
    color: "#800080",
  },
  {
    name: "有心館",
    latitude: 35.03309347005321,
    longitude: 135.72386770177542,
    color: "#008080",
  },
  {
    name: "尚学館",
    latitude: 35.03995832031566,
    longitude: 135.72651385950047,
    color: "#FFA500",
  },
  {
    name: "存心館",
    latitude: 35.03367933549287,
    longitude: 135.72427139385243,
    color: "#FFC0CB",
  },
  {
    name: "学生会館",
    latitude: 35.03548952800499,
    longitude: 135.72491370651827,
    color: "#A52A2A",
  },
  {
    name: "歴史都市防災研究所",
    latitude: 35.03363364938425,
    longitude: 135.72669485758783,
    color: "#556B2F",
  },
  {
    name: "末川記念会館",
    latitude: 35.03406465832097,
    longitude: 135.72602571343052,
    color: "#2F4F4F",
  },
  {
    name: "フォレストハウス",
    latitude: 34.980875,
    longitude: 135.964152,
    color: "#DC143C",
  },
  {
    name: "リンクスクエア",
    latitude: 34.980199,
    longitude: 135.964152,
    color: "#1E90FF",
  },
  {
    name: "コラーニングⅠ",
    latitude: 34.980129,
    longitude: 135.962768,
    color: "#228B22",
  },
  {
    name: "コラーニングⅡ",
    latitude: 34.979665,
    longitude: 135.963211,
    color: "#FF69B4",
  },
  {
    name: "プリズムハウス",
    latitude: 34.981076,
    longitude: 135.96335,
    color: "#9932CC",
  },
  {
    name: "アドセミナリオ",
    latitude: 34.980661,
    longitude: 135.961819,
    color: "#8B0000",
  },
  {
    name: "アクロスウィング",
    latitude: 34.981435,
    longitude: 135.961583,
    color: "#FF8C00",
  },
  { name: "A", latitude: 34.810874, longitude: 135.561179, color: "#8A2BE2" },
  { name: "B", latitude: 34.80996, longitude: 135.562718, color: "#FFD700" },
  { name: "C", latitude: 34.809967, longitude: 135.561321, color: "#32CD32" },
  { name: "D", latitude: 34.809516, longitude: 135.560746, color: "#FF4500" },
  { name: "E", latitude: 34.810492, longitude: 135.560514, color: "#4682B4" },
  { name: "F", latitude: 34.808944, longitude: 135.559923, color: "#D2691E" },
  { name: "G", latitude: 34.810781, longitude: 135.561705, color: "#6A5ACD" },
  { name: "H", latitude: 34.808995, longitude: 135.561481, color: "#8B4513" },
];

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
    console.log("fetchOccupiedClassrooms");

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
    // const todayWeekday = weekdays[new Date().getDay()];
    const todayWeekday = weekdays[1]; // 月曜日固定

    const schoolYear = new Date().getFullYear();
    const semester = getSemester();

    try {
      const response = await fetch(
        `https://db-manager-api.arupaka.uk/lecture/get-occupied-classrooms?campus=${props.campusData.apiQuery}&schoolYear=${schoolYear}&semester=${semester}&weekday=${todayWeekday}&period=${period}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
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

  // console.log(findNoClassroomsByBuilding("コラーニングⅠ"))
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
        {/* ピンの描画 */}
        {BUILDINGS.map((building, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: building.latitude,
              longitude: building.longitude,
            }}
            title={building.name}
            onPress={() =>
              navigation.navigate("BuildingDetails", {
                building: building,
                classrooms: findClassroomsByBuilding(building.name),
              })
            }
          >
            <View style={{ alignItems: "center" }}>
              {/* アイコン */}
              {/* <MaterialCommunityIcons name="map-marker" size={40} color={building.color} /> */}
              <Image
                source={pinImage}
                style={{ width: 40, height: 40, tintColor: building.color }}
              />

              {/* 数字バッジ */}
              {true && (
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
              )}
            </View>
          </Marker>
        ))}
      </MapView>

      {/* 日時 & 限目のオーバーレイ */}
      {showOverlay && (
        <View
          style={{
            position: "absolute",
            top: 50,
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
          {/* 左ボタン */}

          {/* 日付・時間・限目表示 */}
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            {currentDate} {currentTime}
          </Text>

          <TouchableOpacity onPress={() => changePeriod(-1)}>
            <Text style={{ color: "#fff", fontSize: 24 }}>◀</Text>
          </TouchableOpacity>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            {period}限
          </Text>
          {/* 右ボタン */}
          <TouchableOpacity onPress={() => changePeriod(1)}>
            <Text style={{ color: "#fff", fontSize: 24 }}>▶</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default DisplayMap;
