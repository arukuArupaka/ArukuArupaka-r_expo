import React, { useMemo } from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function PodiumRow({ top3 }) {
  const [second, first, third] = useMemo(() => {
    const a = top3[0];
    const b = top3[1];
    const c = top3[2];
    function placeholder(rank) {
      return { id: `placeholder-${rank}`, nickname: "—", points: 0 };
    }
    return [b || placeholder(2), a || placeholder(1), c || placeholder(3)];
  }, [top3]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 18,
      }}
    >
      <PodiumItem rank={2} user={second} height={100} />
      <PodiumItem rank={1} user={first} height={130} />
      <PodiumItem rank={3} user={third} height={85} />
    </View>
  );
}

export function PodiumItem({ rank, user, height }) {
  const gradientColors = useMemo(() => {
    if (rank === 1) {
      return ["#FFF7C2", "#FFD700", "#C9A400"] as const;
    }
    if (rank === 2) {
      return ["#F5F7FA", "#C0C0C0", "#9EA6B0"] as const;
    }
    return ["#F6D2B1", "#CD7F32", "#8C4A1E"] as const;
  }, [rank]);
  return (
    <View style={{ alignItems: "center", width: "30%" }}>
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: "#EEE",
          marginBottom: 8,
          overflow: "hidden",
        }}
      >
        {user.avatar ? (
          <Image
            source={{ uri: user.avatar }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : null}
      </View>
      <Text
        style={{
          fontFamily: "ZenMaruGothicBold",
          color: "#4C4C4C",
          marginBottom: 4,
        }}
      >
        {user.nickname}
      </Text>
      <Text style={{ color: "#FF7A7A", marginBottom: 8 }}>
        {user.points} pt
      </Text>
      <View
        style={{ width: "100%", height, borderRadius: 8, overflow: "hidden" }}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontFamily: "ZenMaruGothicBold",
              color: rank === 1 ? "#4C4C4C" : "#fff",
            }}
          >
            {rank} 位
          </Text>
        </LinearGradient>
      </View>
    </View>
  );
}
