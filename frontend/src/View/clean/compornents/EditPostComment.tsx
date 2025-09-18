import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { supabase } from "../lib/supabase";

const EditPostComment = ({ post, isVisible, onClose, onCommentUpdated }) => {
  const [comment, setComment] = useState(post.comment);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = async () => {
    if (!comment.trim()) {
      Alert.alert("エラー", "コメントを入力してください。");
      return;
    }
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("posts")
        .update({ comment: comment })
        .eq("id", post.id)
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        onCommentUpdated(data[0]);
        Alert.alert("成功", "コメントを更新しました。");
        onClose();
      }
    } catch (error) {
      console.error("コメントの更新に失敗しました:", error);
      Alert.alert("エラー", "コメントの更新に失敗しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
        }}
        pointerEvents="box-none"
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />

        <View
          style={{
            width: "85%",
            backgroundColor: "white",
            borderRadius: 15,
            paddingVertical: 15,
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
            コメントを編集
          </Text>
          <TextInput
            style={{
              width: "100%",
              minHeight: 80,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 8,
              padding: 10,
              marginBottom: 20,
              fontSize: 16,
              backgroundColor: "#fafafa",
            }}
            onChangeText={setComment}
            value={comment}
            multiline
            placeholder="コメントを入力..."
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#ccc",
                borderRadius: 8,
                paddingVertical: 12,
                marginRight: 10,
                alignItems: "center",
              }}
              onPress={onClose}
              disabled={isSubmitting}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                キャンセル
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#007AFF",
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: "center",
              }}
              onPress={handleUpdate}
              disabled={isSubmitting}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                {isSubmitting ? "更新中..." : "更新"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditPostComment;
