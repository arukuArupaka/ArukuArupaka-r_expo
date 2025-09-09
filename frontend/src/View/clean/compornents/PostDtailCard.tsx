import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";
import EditPostComment from "./EditPostComment";

interface PostDetailCardProps {
  post: any; // TODO: 型を定義 (id, good_count, status, created_at, users, building, place, comment, image_url)
  onClose: () => void;
  userId: string | null | undefined; // 親から渡されるログインユーザーID
}

const PostDetailCard: React.FC<PostDetailCardProps> = ({
  post,
  onClose,
  userId,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.good_count || 0);
  const [pending, setPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [postState, setPost] = useState(post);

  // 既に自分がいいね済みか
  const fetchLikeStatus = async () => {
    if (!userId || !post?.id) return; // userId 未取得ならスキップ
    const { data, error } = await supabase
      .from("good")
      .select("id")
      .eq("user_id", userId)
      .eq("post_id", post.id)
      .limit(1)
      .maybeSingle();
    if (error) {
      console.warn("fetchLikeStatus error:", error.message);
      return;
    }
    setLiked(!!data);
  };

  useEffect(() => {
    fetchLikeStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post?.id, userId]);

  const handleLike = async () => {
    if (pending || !userId || !post?.id) return; // userId 無ければ操作不可
    setPending(true);
    const prevLiked = liked;
    const prevCount = likeCount;

    // 楽観的更新: liked を反転し likeCount を増減
    const delta = liked ? -1 : 1;
    setLiked(!liked);
    setLikeCount((c) => Math.max(0, c + delta));

    try {
      // good テーブル更新 (状態判定のためだけに保持)
      if (liked) {
        const { error: delErr } = await supabase
          .from("good")
          .delete()
          .eq("user_id", userId)
          .eq("post_id", post.id);
        if (delErr) throw delErr;
      } else {
        const { error: insErr } = await supabase.from("good").insert({
          user_id: userId,
          post_id: post.id,
        });
        if (insErr) throw insErr;
      }

      // posts.good_count をサーバー側に反映
      // 競合対策が必要なら RPC/トリガー推奨。ここでは単純更新。
      const newServerCount = Math.max(0, prevCount + delta);
      const { data: updated, error: updErr } = await supabase
        .from("posts")
        .update({ good_count: newServerCount })
        .eq("id", post.id)
        .select("good_count")
        .single();
      if (updErr) throw updErr;
      if (updated?.good_count !== undefined) {
        setLikeCount(updated.good_count);
        // ローカルの post オブジェクトにも即反映（親が再描画するケース向け）
        post.good_count = updated.good_count; // eslint-disable-line no-param-reassign
      }
    } catch (e: any) {
      // ロールバック
      setLiked(prevLiked);
      setLikeCount(prevCount);
      console.warn("handleLike error:", e?.message || e);
      alert(`いいね処理に失敗しました：${e?.message ?? "Unknown error"}`);
    } finally {
      setPending(false);
    }
  };

  if (!post) return null;

  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString("ja-JP")
    : "日付不明";
  const statusInfo = {
    text:
      post.status === "resolved" || post.status === "self" ? "完了" : "未完了",
    color:
      post.status === "resolved" || post.status === "self"
        ? "#4CAF50"
        : "#F57C00",
    bgColor:
      post.status === "resolved" || post.status === "self"
        ? "#E8F5E9"
        : "#FFF8E1",
  };

  const handleCommentUpdated = (updatedPost) => {
    setPost(updatedPost);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
            {post.user_id === userId ? (
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => setIsEditing(true)}
              >
                <Text style={{ color: "#007AFF", fontWeight: "bold" }}>
                  編集
                </Text>
              </TouchableOpacity>
            ) : null}
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
            <TouchableOpacity
              onPress={handleLike}
              disabled={pending || !userId}
            >
              <FontAwesome
                name={liked ? "heart" : "heart-o"}
                size={22}
                color={userId ? "#ff4d4d" : "#bbb"}
              />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: 6,
                color: "#333",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {likeCount}
            </Text>
            {!userId && (
              <Text style={{ marginLeft: 8, fontSize: 12, color: "#999" }}>
                ログインしていいね
              </Text>
            )}
          </View>
        </Pressable>
        {isEditing && (
          <EditPostComment
            post={post}
            isVisible={isEditing}
            onClose={() => setIsEditing(false)}
            onCommentUpdated={handleCommentUpdated}
          />
        )}
      </Pressable>
    </TouchableWithoutFeedback>
  );
};

export default PostDetailCard;
