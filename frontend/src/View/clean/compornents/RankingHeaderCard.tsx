import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Animated, Easing } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// 投稿数＋ユーザーの現在順位＋Top3ティーザーを1枚に統合
export default function RankingHeaderCard({
  period = "week",
  refetchTrigger = 0,
}) {
  const chevronAnim = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [count, setCount] = useState(0);
  const [userRank, setUserRank] = useState(null);

  const fetchCount = useCallback(async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;
    if (!userId) {
      setCount(0);
      return;
    }
    const { count: c, error } = await supabase
      .from("posts")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId);
    if (!error && typeof c === "number") setCount(c);
  }, []);

  const fetchRanking = useCallback(async () => {
    try {
      const now = Date.now();
      const filters = [];
      if (period === "week") {
        filters.push({
          col: "created_at",
          op: "gte",
          val: new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString(),
        });
      } else if (period === "month") {
        filters.push({
          col: "created_at",
          op: "gte",
          val: new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString(),
        });
      }

      let query = supabase.from("posts").select("user_id, created_at");
      for (const f of filters) query = query[f.op](f.col, f.val);
      const { data, error } = await query;
      if (error) throw error;

      const counts = new Map();
      for (const row of data || []) {
        const uid = row && row.user_id;
        if (!uid) continue;
        counts.set(uid, (counts.get(uid) || 0) + 1);
      }

      const ranked = Array.from(counts.entries())
        .map(([uid, cnt]) => ({ id: uid, points: cnt }))
        .sort((a, b) => b.points - a.points);

      const { data: sessionData } = await supabase.auth.getSession();
      const myId =
        sessionData &&
        sessionData.session &&
        sessionData.session.user &&
        sessionData.session.user.id;
      let myRank = null;
      if (myId) {
        const idx = ranked.findIndex((r) => r.id === myId);
        if (idx >= 0) myRank = idx + 1;
      }

      setUserRank(myRank);
    } catch (e) {
      // no-op
    }
  }, [period]);

  useEffect(() => {
    fetchCount();
    fetchRanking();
  }, [fetchCount, fetchRanking, refetchTrigger]);

  useFocusEffect(
    React.useCallback(() => {
      fetchCount();
      fetchRanking();
    }, [fetchCount, fetchRanking])
  );

  // 小さなシェブロンを左右にわずかにアニメーションさせてCTAを強める
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(chevronAnim, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(chevronAnim, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [chevronAnim]);

  const rankLabel = userRank ? `${userRank}位` : "—位";
  const translateX = chevronAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => navigation.navigate("CleanPostRanking" as never)}
      style={{
        position: "absolute",
        top: Math.max(4, insets.top + -30),
        right: 14,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 6,
        zIndex: 100,
        minWidth: 130,
        paddingRight: 22,
      }}
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
      accessibilityRole="button"
      accessibilityLabel="ランキングページへ移動"
      testID="rankingHeaderCard"
    >
      <Text
        style={{
          color: "black",
          fontFamily: "ZenMaruGothicBold",
          fontSize: 13,
        }}
      >
        自分の投稿：{count}件
      </Text>
      <Text
        style={{
          color: "black",
          fontFamily: "ZenMaruGothicBold",
          fontSize: 13,
        }}
      >
        ランキング：{rankLabel}
      </Text>
      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          right: 6,
          top: "50%",
          marginTop: 9,
          transform: [{ translateX }],
          opacity: 0.9,
        }}
      >
        <MaterialIcons name="chevron-right" size={17} color="#4C4C4C" />
      </Animated.View>
    </TouchableOpacity>
  );
}
