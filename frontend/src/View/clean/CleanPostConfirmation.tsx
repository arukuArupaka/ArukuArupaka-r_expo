import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
  Pressable,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { supabase } from "./lib/supabase";
import { uploadImageAsync } from "./lib/uploadImage";
import { fetchPostById } from "./lib/postsApi";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

type CleanPostConfirmationRouteProp = RouteProp<
  {
    CleanPostConfirmation: {
      selectedBuilding: string;
      locationDetail: string;
      comment: string;
      photoUri: string | null;
      isRequestingCleaning: boolean;
      latitude: number;
      longitude: number;
      postId: number | null;
    };
  },
  "CleanPostConfirmation"
>;

export default function CleanPostConfirmation() {
  const navigation = useNavigation();
  const route = useRoute<CleanPostConfirmationRouteProp>();
  const [name, setName] = useState("匿名ユーザー");

  const {
    selectedBuilding = "",
    locationDetail = "",
    comment = "",
    photoUri = null,
    isRequestingCleaning = false,
    postId = null,
  } = route.params || {};

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from("users")
            .select("name")
            .eq("id", user.id)
            .single();
          if (error) throw error;
          if (data?.name) {
            setName(data.name);
          }
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
  }, []);

  const formattedDate = new Date().toLocaleDateString("ja-JP");

  const statusInfo = {
    text: isRequestingCleaning ? "未完了" : "完了",
    color: isRequestingCleaning ? "#F57C00" : "#4CAF50",
    bgColor: isRequestingCleaning ? "#FFF8E1" : "#E8F5E9",
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "red",
          textAlign: "center",
          marginTop: 16,
          marginBottom: 20,
        }}
      >
        以下の内容で投稿されました！
      </Text>
      <Image
        source={require("./assets/image/arupaka-happy.png")}
        style={{ width: 120, height: 120, alignSelf: "center" }}
      />
      <Pressable
        style={{
          width: "85%",
          backgroundColor: "white",
          borderBlockColor: "black",
          borderWidth: 1,
          borderRadius: 15,
          paddingVertical: 15,
          paddingHorizontal: 20,
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 14, color: "#666" }}>{formattedDate}</Text>
          <View
            style={{
              backgroundColor: statusInfo.bgColor,
              paddingVertical: 4,
              paddingHorizontal: 12,
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                color: statusInfo.color,
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              {statusInfo.text}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <FontAwesome
            name="user-circle"
            size={18}
            color="#777"
            style={{ marginRight: 12, width: 20 }}
          />
          <Text style={{ fontSize: 14, color: "#B2B2B2" }}>{name}</Text>
        </View>

        <View style={{ marginBottom: 15 }}>
          <Text
            style={{
              fontSize: 12,
              color: "#4E4E4E",
              marginBottom: 4,
              fontWeight: "bold",
            }}
          >
            場所
          </Text>
          <Text style={{ fontSize: 16, color: "#B2B2B2" }}>
            {selectedBuilding} {locationDetail}
          </Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 12,
              color: "#4E4E4E",
              marginBottom: 4,
              fontWeight: "bold",
            }}
          >
            コメント
          </Text>
          <Text style={{ fontSize: 14, color: "#B2B2B2", lineHeight: 21 }}>
            {comment || "コメントはありません。"}
          </Text>
        </View>

        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            style={{
              width: "100%",
              height: 180,
              borderRadius: 10,
              marginBottom: 20,
            }}
          />
        ) : (
          <View
            style={{
              width: "100%",
              height: 180,
              backgroundColor: "#f5f5f5",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <FontAwesome name="camera" size={40} color="#ccc" />
          </View>
        )}
      </Pressable>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 50,
          alignSelf: "center",
          width: "40%",
          height: "8%",
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate("CleanMainView" as never)}
      >
        <LinearGradient
          colors={["#C4E8FF", "#45B8FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            flex: 1,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            マップへ戻る
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
