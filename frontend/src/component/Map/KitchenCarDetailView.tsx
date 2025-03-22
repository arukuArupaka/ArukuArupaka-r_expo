import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const KitchenCarDetailView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params.kitchenCarObject;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      {/* 注意メッセージ */}
      <Text
        style={{
          textAlign: "center",
          fontSize: 14,
          marginBottom: 16,
          padding: 10,
          backgroundColor: "#fff3cd",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#ffeeba",
          color: "#856404",
        }}
      >
        ※予告なく変更される場合があります
      </Text>

      {/* 店舗名 */}
      <Text style={{ fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
        {data.storeName.stringValue}
      </Text>

      {/* おすすめ情報 */}
      <View
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: 10,
          padding: 16,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
          🍴 おすすめ情報
        </Text>
        <Text style={{ fontSize: 16, color: "#333" }}>{data.message.stringValue}</Text>
      </View>

      {/* 関連ワード */}
      <View
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: 10,
          padding: 16,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
          🏷️ 関連ワード
        </Text>
        <Text style={{ fontSize: 16, color: "#333" }}>{data.herf.stringValue}</Text>
      </View>

      {/* 営業時間 */}
      <View
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: 10,
          padding: 16,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>⏰ 営業時間</Text>
        <Text style={{ fontSize: 16 }}>
          {data.startTime.stringValue} ～ {data.endTime.stringValue}
        </Text>
      </View>

      {/* Webサイトリンク */}
      {data.url?.stringValue && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("HomeWebSite", { uri: data.url.stringValue })
          }
          style={{
            marginTop: 30,
            backgroundColor: "#007bff",
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            WEBサイトに移動
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default KitchenCarDetailView;
