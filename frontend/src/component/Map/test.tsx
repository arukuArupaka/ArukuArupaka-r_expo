import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { ARUPAKA_BACKEND_URL } from "../../../env";

const pinImage = require("../../image/map/image1.png");

const CAMPUSES = {
  びわこくさつキャンパス: {
    key: "BKC",
    latitude: 34.9805,
    longitude: 135.9635,
  },
  衣笠キャンパス: { key: "KIC", latitude: 35.033, longitude: 135.723 },
  大阪いばらきキャンパス: {
    key: "OIC",
    latitude: 34.8105,
    longitude: 135.5615,
  },
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
    name: "コラーニングハウス1",
    latitude: 34.980129,
    longitude: 135.962768,
    color: "#228B22",
  },
  {
    name: "コラーニングハウス2",
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

const DisplayMap = () => {
  const navigation = useNavigation();

  `${ARUPAKA_BACKEND_URL}/lecture/get-occupied-classrooms?campus=BKC&schoolYear=2025&semester=Spring&weekday=Monday&period=1`;

  const fetchOccupiedClassrooms = async (weekday) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${ARUPAKA_BACKEND_URL}/lecture/get-occupied-classrooms?campus=BKC&schoolYear=2025&semester=Spring&weekday=${weekday}&period=1`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setClassrooms(data);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
      setError("データ取得に失敗しました。再試行してください。");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOccupiedClassrooms("Monday");
  }, [""]);

  const [selectedCampus, setSelectedCampus] =
    useState("びわこくさつキャンパス");

  return (
    <View>
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
      >
        {BUILDINGS.map((building, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: building.latitude,
              longitude: building.longitude,
            }}
            title={building.name}
            onPress={() => navigation.navigate("BuildingDetails", { building })}
          >
            <Image
              source={pinImage}
              style={{ width: 40, height: 40, tintColor: building.color }}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default DisplayMap;
