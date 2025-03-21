import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Linking } from "react-native";



const BuildingDetailsScreen = ({ route }) => {
  const { building } = route.params;
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetchOccupiedClassrooms(building.name, setClassrooms, setLoading, setError);
  }, [building]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>{building.name}</Text>
      <Text style={{ fontSize: 18 }}>授業中の教室：</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={{ marginTop: 10 }}>
          {classrooms.length > 0 ? (
            classrooms.map((room, idx) => (
              <View key={idx} style={{ marginBottom: 15 }}>
                <Text>科目名: {room.name}</Text>
                <Text>教室名: {room.classRoom}</Text>
                <Text>先生: {room.teacher}</Text>
                <Text style={{ color: "blue" }} onPress={() => Linking.openURL(room.syllabusUrl)}>シラバスを見る</Text>
              </View>
            ))
          ) : (
            <Text style={{ fontSize: 14, color: "red" }}>授業中の教室なし</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default BuildingDetailsScreen;
