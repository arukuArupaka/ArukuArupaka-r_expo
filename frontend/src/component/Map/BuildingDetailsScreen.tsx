import React, { useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";

const BuildingDetailsScreen = ({ route }) => {
  const { building, classrooms } = route.params;
  const [loading, setLoading] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff", paddingTop: 30, paddingHorizontal: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", color: "#222", marginBottom: 4 }}>
        {building.name}
      </Text>
      <Text style={{ fontSize: 16, color: "#777", marginBottom: 12 }}>教室一覧</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1e90ff" />
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {classrooms.length > 0 ? (
            classrooms.map((room, idx) => (
              <View
                key={idx}
                style={{
                  backgroundColor: "#fff",
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 14,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 3,
                  elevation: 2,
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ fontSize: 20, fontWeight: "bold", color: "#333" }}>
                    {room.classroom}
                  </Text>
                  <View
                    style={{
                      backgroundColor: room.isUsed ? "#ff4d4f" : "#00b894",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 12, fontWeight: "600" }}>
                      {room.isUsed ? "使用中" : "空き"}
                    </Text>
                  </View>
                </View>

                {room.name && (
                  <Text style={{ fontSize: 16, marginTop: 8, color: "#444" }}>
                    📘 科目: {room.name}
                  </Text>
                )}

                {room.teacher && (
                  <Text style={{ fontSize: 14, color: "#666", marginTop: 4 }}>
                    👨‍🏫 教員: {room.teacher}
                  </Text>
                )}
              </View>
            ))
          ) : (
            <Text style={{ textAlign: "center", marginTop: 40, fontSize: 16, color: "#999" }}>
              教室データがありません
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default BuildingDetailsScreen;
