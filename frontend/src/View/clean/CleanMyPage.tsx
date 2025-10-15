import { useEffect } from "react";
import { supabase } from "./lib/supabase";
import React, { useState, useRef, useCallback } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  Modal,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
// @ts-ignore: 型定義がなくても Expo に同梱されているため問題ありません
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import PostDetailCard from "./compornents/PostDtailCard";
import IconById, {
  getIconSourceById,
  iconIds,
  getRandomIconId,
} from "./compornents/IconById";
import SupabaseInputField from "./compornents/ui/SupabaseInputField";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const initialRandomIconIdRef = useRef<number>(getRandomIconId());

  const [selectedIcon, setSelectedIcon] = useState<any>(
    getIconSourceById(initialRandomIconIdRef.current)
  );
  const [selectedIconId, setSelectedIconId] = useState<number>(
    initialRandomIconIdRef.current
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [nickname, setNickname] = useState<string>("");
  const [realName, setRealName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [coopMemberNumber, setCoopMemberNumber] = useState<string>("");
  const nicknameDirtyRef = useRef<boolean>(false);
  const realNameDirtyRef = useRef<boolean>(false);
  const birthDateDirtyRef = useRef<boolean>(false);
  const coopNumberDirtyRef = useRef<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const hasLoadedFromDB = useRef<boolean>(false);
  const [coopConsent, setCoopConsent] = useState<boolean>(false);

  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [postsLoading, setPostsLoading] = useState<boolean>(false);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const fetchProfile = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.warn("ユーザーがログインしていません");
      return;
    }

    setUserId(user.id);

    try {
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select(
          "id,icon,nickname,real_name,birth_date,coop_member_number,coop_consent"
        )
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error("プロフィール情報の取得に失敗：", profileError.message);
      }

      let iconId = Number((profile as any)?.icon);

      if (!Number.isInteger(iconId) || iconId < 1 || iconId > 10) {
        // 初回のみ：ランダム決定して即時保存
        iconId = initialRandomIconIdRef.current;
        setSelectedIconId(iconId);
        setSelectedIcon(getIconSourceById(iconId));
        try {
          await supabase.from("users").update({ icon: iconId }).eq("id", user.id);
        } catch (e) {
          console.error("初回アイコン保存に失敗：", e);
        }
      } else {
     // 以降：保存済みをそのまま表示
     setSelectedIconId(iconId);
     setSelectedIcon(getIconSourceById(iconId));
   }

   if (!nicknameDirtyRef.current)
     setNickname((profile as any)?.nickname ?? "");
   if (!realNameDirtyRef.current)
     setRealName((profile as any)?.real_name ?? "");
   if (!birthDateDirtyRef.current)
     setBirthDate((profile as any)?.birth_date ?? "");
   if (!coopNumberDirtyRef.current)
     setCoopMemberNumber((profile as any)?.coop_member_number ?? "");
   setCoopConsent(Boolean((profile as any)?.coop_consent));
 } catch (error) {
   console.error("プロフィール情報の取得中にエラーが発生：", error);
 } finally {
   hasLoadedFromDB.current = true;
 }
}, []);

  // 画面離脱時などに一括で保存するためのまとめ関数
  const saveAll = useCallback(async () => {
    try {
      if (!userId) return;
      const payload: any = {
        nickname: (nickname ?? "").trim(),
        real_name: (realName ?? "").trim(),
        birth_date: (birthDate ?? "").trim(),
        coop_member_number: (coopMemberNumber ?? "").trim().replace(/\s+/g, ""),
      };
      const { error } = await supabase
        .from("users")
        .update(payload)
        .eq("id", userId);
    } catch (e) {
      console.error("プロフィール保存中に予期せぬエラー:", e);
    }
  }, [userId, nickname, realName, birthDate, coopMemberNumber]);

  // coop_consent 保存関数
  const saveCoopConsent = useCallback(
    async (value?: boolean) => {
      try {
        if (!userId) return;
        const nextVal = value ?? coopConsent;
        const { data, error } = await supabase
          .from("users")
          .update({ coop_consent: nextVal })
          .eq("id", userId)
          .select("id")
          .maybeSingle();
        if (error) {
          console.error("同意フラグ保存に失敗：", error);
        } else if (!data) {
          console.warn(
            "同意フラグ更新対象の行がありません（users.id が未作成）"
          );
        }
      } catch (e) {
        console.error("同意フラグ保存中に予期せぬエラー：", e);
      }
    },
    [userId, coopConsent]
  );

  const saveIcon = useCallback(async (iconIdArg?: number) => {
    try {
      if (!userId) return; // 自分の行だけ更新
      const idToSave = iconIdArg ?? selectedIconId;
      if (!Number.isInteger(idToSave) || idToSave < 1 || idToSave > 10) return;

      // 更新結果を返させて検証
      const { data, error } = await supabase
        .from("users")
        .update({ icon: idToSave })
        .eq("id", userId)
        .select("id")
        .maybeSingle();

      if (error) {
        console.error("アイコンの保存に失敗：", error);
      } else if (!data) {
        console.warn("ユーザー行が存在せず更新0件でした（必要なら upsert を検討）");
      }
    } catch (e) {
      console.error("アイコン保存中に予期せぬエラー：", e);
    }
  }, [userId, selectedIconId]);

  const saveAllWithIcon = useCallback(async () => {
    await Promise.all([saveAll(), (async () => await saveIcon())()]);
  }, [saveAll]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
      (async () => {
        try {
          await saveAllWithIcon();
        } catch (err) {
          console.warn("プロフィール保存に失敗:", err);
        } finally {
          navigation.dispatch(e.data.action);
        }
      })();
    });
    return unsubscribe;
  }, [navigation, saveAllWithIcon]);
  useEffect(() => {
    hasLoadedFromDB.current = false;
    fetchProfile();
  }, [fetchProfile]);

  useFocusEffect(
    useCallback(() => {
      hasLoadedFromDB.current = false;
      fetchProfile();
      return () => {
        if (hasLoadedFromDB.current) {
          void saveAll();
        }
      };
    }, [fetchProfile, saveAll])
  );

  const fetchMyPosts = useCallback(async () => {
    if (!userId) return;
    setPostsLoading(true);
    setPostsError(null);
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          users ( nickname )
        `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setMyPosts(data ?? []);
    } catch (e: any) {
      console.error("自分の投稿取得に失敗:", e?.message || e);
      setPostsError(e?.message || "投稿の取得に失敗しました");
    } finally {
      setPostsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

 
  // 外側タップ時は保存せず閉じるのみ
  const handleOverlayPress = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ padding: 10, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          top: 20,
          marginBottom: 20,
          width: 120,
          height: 120,
          borderRadius: 60,
          borderWidth: 2,
          borderColor: "#000",
          alignSelf: "center",
        }}
      >
        <Image
          source={selectedIcon}
          style={{
            width: 116,
            height: 116,
            borderRadius: 58,
            alignSelf: "center",
          }}
        />
        <Ionicons
          name="add-circle"
          size={35}
          color="black"
          style={{ position: "absolute", right: 1, bottom: 8 }}
          onPress={() => setModalVisible(true)}
        />
      </View>
      <Modal visible={modalVisible} transparent animationType="fade">
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleOverlayPress}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 10,
              width: "80%",
            }}
            onStartShouldSetResponder={() => true}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 10,
              }}
            >
              {iconIds.map((id) => (
               <TouchableOpacity
               key={id}
               onPress={async () => {
                 // 先にUI反映
                 setSelectedIcon(getIconSourceById(id));
                 setSelectedIconId(id);
                 // DB保存
                 await saveIcon(id);
                 // モーダルを閉じる（外側のonPressは何もしない）
                 setModalVisible(false);
               }}
             >
                  <IconById id={id} size={50} style={{ margin: 5 }} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
      <SupabaseInputField
        label="ニックネーム"
        table="users"
        column="nickname"
        userId={userId}
        value={nickname}
        onChangeText={(v) => {
          nicknameDirtyRef.current = true;
          setNickname(v);
        }}
        placeholder="ニックネームを入力"
      />

      {/* coop_consent チェックボックス（ニックネームの直下に移動） */}
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 0,
          justifyContent: "flex-end",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: "ZenMaruGothicBold",
            marginRight: 8,
          }}
        >
          生協連携に同意
        </Text>
        <TouchableOpacity
          onPress={async () => {
            const next = !coopConsent;
            setCoopConsent(next);
            await saveCoopConsent(next);
          }}
        >
          <FontAwesome5
            name={coopConsent ? "check-square" : "square"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {coopConsent && (
        <>
          <SupabaseInputField
            label="氏名（本名）"
            table="users"
            column="real_name"
            userId={userId}
            value={realName}
            onChangeText={(v) => {
              realNameDirtyRef.current = true;
              setRealName(v);
            }}
            placeholder="氏名（本名）を入力"
          />

          <SupabaseInputField
            label="生年月日（YYYY-MM-DD）"
            table="users"
            column="birth_date"
            userId={userId}
            value={birthDate}
            onChangeText={(v) => {
              birthDateDirtyRef.current = true;
              setBirthDate(v);
            }}
            placeholder="生年月日（YYYY-MM-DD）を入力"
            keyboardType="numbers-and-punctuation"
            returnKeyType="done"
            normalize={(v) => v}
          />

          <SupabaseInputField
            label="生協会員番号"
            table="users"
            column="coop_member_number"
            userId={userId}
            value={coopMemberNumber}
            onChangeText={(v) => {
              coopNumberDirtyRef.current = true;
              setCoopMemberNumber(v);
            }}
            placeholder="生協会員番号を入力"
            keyboardType="number-pad"
            returnKeyType="done"
            normalize={(v) => v.replace(/\s+/g, "")}
          />
        </>
      )} */}

      <Text
        style={{
          fontSize: 16,
          fontFamily: "ZenMaruGothicBlack",
          color: "#555555",
          marginTop: 10,
        }}
      >
        過去の投稿
      </Text>
      <View style={{ marginTop: 10 }}>
        {postsLoading && (
          <View style={{ paddingVertical: 20 }}>
            <ActivityIndicator size="small" color="#888" />
          </View>
        )}
        {postsError && !postsLoading && (
          <Text style={{ color: "#f00", paddingVertical: 10 }}>
            {postsError}
          </Text>
        )}
        {!postsLoading && !postsError && myPosts.length === 0 && (
          <Text style={{ color: "#777", paddingVertical: 10 }}>
            まだ投稿がありません。
          </Text>
        )}
        {!postsLoading &&
          !postsError &&
          myPosts.map((post) => (
            <TouchableOpacity
              key={post.id}
              onPress={() => setSelectedPost(post)}
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#e5e5e5",
                borderRadius: 12,
                padding: 12,
                marginBottom: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text style={{ fontSize: 12, color: "#666" }}>
                  {post.created_at
                    ? new Date(post.created_at).toLocaleDateString("ja-JP")
                    : "日付不明"}
                </Text>
                <View
                  style={{
                    backgroundColor:
                      post.status === "resolved" ? "#E8F5E9" : "#FFF8E1",
                    paddingVertical: 3,
                    paddingHorizontal: 10,
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      color: post.status === "resolved" ? "#4CAF50" : "#F57C00",
                      fontWeight: "bold",
                      fontSize: 12,
                    }}
                  >
                    {post.status === "resolved" ? "完了" : "未完了"}
                  </Text>
                </View>
              </View>

              <View style={{ marginBottom: 8 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#4E4E4E",
                    marginBottom: 2,
                    fontWeight: "bold",
                  }}
                >
                  場所
                </Text>
                <Text style={{ fontSize: 14, color: "#333" }}>
                  {post.building || "不明"} {post.place || ""}
                </Text>
              </View>

              {post.image_url ? (
                <Image
                  source={{ uri: post.image_url }}
                  style={{
                    width: "100%",
                    height: 120,
                    borderRadius: 10,
                    marginTop: 6,
                    marginBottom: 6,
                  }}
                />
              ) : null}

              {post.comment ? (
                <Text numberOfLines={2} style={{ fontSize: 13, color: "#666" }}>
                  {post.comment}
                </Text>
              ) : null}
            </TouchableOpacity>
          ))}
      </View>

      <Modal
        visible={!!selectedPost}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedPost(null)}
      >
        {selectedPost && (
          <PostDetailCard
            post={selectedPost}
            userId={userId}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </Modal>
    </ScrollView>
  );
};

export default ProfileScreen;
