import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PeriodTabs } from "./compornents/PeriodTabs";
import { PodiumRow } from "./compornents/Podium";
import { OthersList } from "./compornents/OthersList";
import { supabase } from "./lib/supabase";

export default function CleanPostRanking() {
  const [period, setPeriod] = useState("week");
  const { loading, error, top3, others, myRank, myNickname, myPoints } =
    useRanking(period);
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
        <View style={{ width: 48 }} />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "ZenMaruGothicBold",
              color: "#4C4C4C",
            }}
          >
            クリーンランキング
          </Text>
          <Text style={{ fontSize: 12, color: "#6A6A6A", marginTop: 4 }}>
            自分で掃除したものみカウントされます
          </Text>
        </View>
        <View style={{ width: 48 }} />
      </View>

      <PeriodTabs period={period} onChange={setPeriod} />

      {period === "month" ? (
        <Text
          style={{
            textAlign: "center",
            color: "#6A6A6A",
            marginTop: 6,
            marginBottom: 2,
          }}
        >
          {new Date().getFullYear()}年{new Date().getMonth() + 1}月
        </Text>
      ) : null}

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        {loading ? (
          <View style={{ paddingVertical: 24, alignItems: "center" }}>
            <ActivityIndicator size="small" color="#FF7A7A" />
          </View>
        ) : null}
        {error ? (
          <Text
            style={{ color: "#E74C3C", textAlign: "center", marginBottom: 8 }}
          >
            {error}
          </Text>
        ) : null}

        <PodiumRow top3={top3} />
        <OthersList others={others} />
      </ScrollView>
      {myRank ? (
        <View
          style={{
            position: "absolute",
            left: 16,
            right: 16,
            bottom: Math.max(12, insets.bottom + 8),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 12,
              borderRadius: 10,
              backgroundColor: "#F9F9F9",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.12,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text
              style={{
                width: 28,
                textAlign: "center",
                fontFamily: "ZenMaruGothicBold",
                color: "#4C4C4C",
              }}
            >
              {myRank}
            </Text>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: "#EEE",
                marginRight: 10,
              }}
            />
            <Text style={{ flex: 1, fontSize: 16, color: "#4C4C4C" }}>
              {myNickname || "あなた"}
            </Text>
            {typeof myPoints === "number" ? (
              <Text
                style={{ fontFamily: "ZenMaruGothicBold", color: "#FF7A7A" }}
              >
                {myPoints} 投稿
              </Text>
            ) : null}
          </View>
        </View>
      ) : null}
    </View>
  );
}

function useRanking(period) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [top3, setTop3] = useState([]);
  const [others, setOthers] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const [myNickname, setMyNickname] = useState(null);
  const [myPoints, setMyPoints] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const filters = [] as any[];
        const now = Date.now();
        if (period === "week") {
          filters.push({
            col: "created_at",
            op: "gte",
            val: new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString(),
          });
        } else if (period === "month") {
          const current = new Date();
          const startOfMonth = new Date(
            current.getFullYear(),
            current.getMonth(),
            1,
            0,
            0,
            0,
            0
          );
          filters.push({
            col: "created_at",
            op: "gte",
            val: startOfMonth.toISOString(),
          });
        }

        let query: any = supabase
          .from("posts")
          .select("user_id, created_at, users ( nickname )")
          .eq("status", "self");
        for (const f of filters) {
          query = query[f.op](f.col, f.val);
        }

        const { data, error } = await query;
        if (error) throw error;

        const counts = new Map();
        const nicknameMap = new Map();
        for (const row of (data as any[]) || []) {
          const uid = row?.user_id as string | undefined;
          if (!uid) continue;
          const nick = row?.users?.nickname as string | undefined;
          if (nick && nick.trim()) nicknameMap.set(uid, nick.trim());
          counts.set(uid, (counts.get(uid) || 0) + 1);
        }

        const missingIds = Array.from(counts.keys()).filter(
          (id) => !nicknameMap.has(id)
        );
        if (missingIds.length > 0) {
          const { data: moreUsers, error: moreErr } = await supabase
            .from("users")
            .select("id, nickname")
            .in("id", missingIds);
          if (moreErr) throw moreErr;
          for (const u of (moreUsers as any[]) || []) {
            if (u?.id && u?.nickname && String(u.nickname).trim()) {
              nicknameMap.set(u.id, String(u.nickname).trim());
            }
          }
        }

        const ranked = Array.from(counts.entries())
          .map(([uid, cnt]) => ({
            id: uid,
            nickname: nicknameMap.get(uid) || "匿名ユーザー",
            points: cnt,
          }))
          .sort((a, b) => b.points - a.points);

        if (!cancelled) {
          setTop3(ranked.slice(0, 3));
          setOthers(ranked.slice(3));

          try {
            const { data: sessionData } = await supabase.auth.getSession();
            const myId = sessionData?.session?.user?.id;
            if (myId) {
              const idx = ranked.findIndex((u) => u.id === myId);
              if (idx >= 0) {
                setMyRank(idx + 1);
                setMyNickname(ranked[idx]?.nickname || null);
                setMyPoints(ranked[idx]?.points ?? null);
              } else {
                setMyRank(null);
                setMyNickname(null);
                setMyPoints(null);
              }
            } else {
              setMyRank(null);
              setMyNickname(null);
              setMyPoints(null);
            }
          } catch {
            setMyRank(null);
            setMyNickname(null);
            setMyPoints(null);
          }
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "ランキング取得に失敗しました");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [period]);

  return { loading, error, top3, others, myRank, myNickname, myPoints };
}
