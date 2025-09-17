import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";

const PostDetailCard = ({ post, onClose, userId }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.good_count || 0);
  const [pending, setPending] = useState(false);
  // 合計いいね数をサーバーから再取得
  // const fetchLikeCount = async () => {
  //   if (!post?.id) return;
  //   const { count, error } = await supabase
  //     .from("good")
  //     .select("id", { count: "exact", head: true })
  //     .eq("post_id", post.id);

  //   if (error) {
  //     console.warn("fetchLikeCount error:", error.message);
  //     return;
  //   }
  //   setLikeCount(count ?? 0);
  // };

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

  // 初期ロード（post変更時にも）
  useEffect(() => {
    fetchLikeStatus();
    //fetchLikeCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post?.id, userId]);

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
      } else {
        // いいね追加（先にUI更新）
        setLiked(true);
        setLikeCount((c) => c + 1);

        const { error } = await supabase.from("good").insert({
          user_id: userId,
          post_id: post.id,
        });
        // もし複合ユニーク制約(user_id, post_id)があるなら
        // upsertにしてignoreDuplicatesでもOK
        // .upsert({ user_id: userId, post_id: post.id }, { onConflict: "user_id,post_id", ignoreDuplicates: true })

        if (error) throw error;
      }
    } catch (e) {
      // 失敗 → UIを元に戻す＆通知
      setLiked(prevLiked);
      setLikeCount(prevCount);
      console.warn("handleLike error:", e?.message || e);
      alert(`いいね処理に失敗しました：${e?.message ?? "Unknown error"}`);
    } finally {
      // サーバー値で再同期（重複・同時実行でも正確な数になる）
      //await fetchLikeCount();
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
          {/* <TouchableOpacity style={{ padding: 5 }}>
            <FontAwesome name="ellipsis-v" size={20} color="#888" />
          </TouchableOpacity> */}
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
          <TouchableOpacity onPress={handleLike} disabled={pending}>
            <FontAwesome
              name={liked ? "heart" : "heart-o"}
              size={22}
              color="#ff4d4d"
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
        </View>
      </Pressable>
    </Pressable>
  );
};

export default PostDetailCard;
