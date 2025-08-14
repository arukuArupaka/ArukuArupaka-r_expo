import React from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const PostDetailCard = ({ post, onClose }) => {
  if (!post) {
    return null;
  }

  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString("ja-JP")
    : "日付不明";

  const statusInfo = {
    text: post.status === "resolved" ? "完了" : "未完了",
    color: post.status === "resolved" ? "#4CAF50" : "#F57C00",
    bgColor: post.status === "resolved" ? "#E8F5E9" : "#FFF8E1",
  };

  return (
    <Pressable
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onClose}
    >
      <Pressable
        style={{
          width: "85%",
          backgroundColor: "white",
          borderRadius: 15,
          paddingVertical: 15,
          paddingHorizontal: 20,
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
          <TouchableOpacity style={{ padding: 5 }}>
            <FontAwesome name="ellipsis-v" size={20} color="#888" />
          </TouchableOpacity>
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
          <Text style={{ fontSize: 14, color: "#B2B2B2" }}>
            {post.users ? post.users.nickname : "匿名ユーザー"}
          </Text>
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
            {post.building} {post.place}
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
            {post.comment || "コメントはありません。"}
          </Text>
        </View>

        {post.image_url ? (
          <Image
            source={{ uri: post.image_url }}
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

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="heart" size={22} color="#ff4d4d" />
          <Text
            style={{
              marginLeft: 6,
              color: "#333",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {post.good_count}
          </Text>
        </View>
      </Pressable>
    </Pressable>
  );
};

export default PostDetailCard;
