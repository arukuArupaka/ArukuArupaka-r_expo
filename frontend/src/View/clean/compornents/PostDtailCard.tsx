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
// @ts-ignore: Expo に同梱のため型定義がなくても実行時には存在します
import { FontAwesome } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";
import EditPostComment from "./EditPostComment";

const PostDetailCard = ({ post, onClose, userId, isVisible }) => {
  // 投稿データの再取得
  const fetchPost = async () => {
    if (!post?.id) return;
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", post.id)
      .maybeSingle();
    if (!error && data) {
      setPost(data);
      setLikeCount(data.good_count || 0);
    }
  };
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.good_count || 0);
  const [pending, setPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [postState, setPost] = useState(post);
  const [imgError, setImgError] = useState(false); // 画像読み込みエラー状態

  // 自分がいいね済みかの確認
  const fetchLikeStatus = async () => {
    if (!userId || !post?.id) return;
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

  // カードが開かれるたびに投稿データといいね状態を取得
  useEffect(() => {
    if (isVisible) {
      fetchPost();
      fetchLikeStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, post?.id, userId]);

  // いいね押下時（楽観的UI＋失敗時ロールバック＋最後にサーバー値へ同期）
  const handleLike = async () => {
    console.log("HANDLE_LIKE", {
      pending,
      userId,
      postId: post?.id,
      likedBefore: liked,
    });
    if (pending || !userId || !post?.id) return;
    setPending(true);

    const prevLiked = liked;
    const prevCount = likeCount;

    try {
      if (liked) {
        // いいね解除（先にUI更新）
        setLiked(false);
        setLikeCount((c) => Math.max(0, c - 1));

        const { error } = await supabase
          .from("good")
          .delete()
          .eq("user_id", userId)
          .eq("post_id", post.id);
        if (error) throw error;

        // postsテーブルのgood_countをデクリメント
        const { error: updateError } = await supabase
          .from("posts")
          .update({ good_count: Math.max(0, likeCount - 1) })
          .eq("id", post.id);
        if (updateError) throw updateError;
      } else {
        setLiked(true);
        setLikeCount((c) => c + 1);

        const { error } = await supabase.from("good").insert({
          user_id: userId,
          post_id: post.id,
        });
        if (error) throw error;

        // postsテーブルのgood_countをインクリメント
        const { error: updateError } = await supabase
          .from("posts")
          .update({ good_count: likeCount + 1 })
          .eq("id", post.id);
        if (updateError) throw updateError;
      }
    } catch (e) {
      // 失敗 → UIを元に戻す＆通知
      setLiked(prevLiked);
      setLikeCount(prevCount);
      console.warn("handleLike error:", e?.message || e);
      alert(`いいね処理に失敗しました：${e?.message ?? "Unknown error"}`);
    } finally {
      setPending(false);
    }
  };
  if (!post) {
    return null;
  }

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
          zIndex: 100,
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

          {post.image_url && !imgError ? (
            <Image
              source={{ uri: `${post.image_url}` }}
              style={{
                width: "100%",
                height: 180,
                borderRadius: 10,
                marginBottom: 20,
              }}
              onLoad={undefined}
              onError={(e) => {
                // 失敗時のみ簡易ログ（必要なら詳細ログ復活）
                console.warn(
                  "[PostDetailCard][Image error]",
                  e?.nativeEvent?.error
                );
                setImgError(true);
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
              {post.image_url ? (
                <Text style={{ fontSize: 10, color: "#999", marginTop: 6 }}>
                  画像読み込み失敗 {imgError ? "(error)" : "(no url)"}
                </Text>
              ) : null}
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
