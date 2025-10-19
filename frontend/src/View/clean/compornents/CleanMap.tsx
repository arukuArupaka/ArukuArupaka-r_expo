import React, { useEffect } from "react";
import { ActivityIndicator, Text, Image, View, Pressable } from "react-native";
import MapView, { MapPressEvent, Region, Marker } from "react-native-maps";
import PostMarker from "./PostMarker";
import { usePosts } from "../lib/postsApi";
import { CleanLocation } from "./CleanLocations";
import type { CleanLocation as CleanLocationType } from "./CleanLocations";

const BASE_REGION: Region = {
  latitude: 34.98222,
  longitude: 135.96371,
  latitudeDelta: 0.007,
  longitudeDelta: 0.007,
};

const CLEAN_ICON_SIZE = 52;

type Props = {
  onSelectPost: (post: any) => void;
  onRegionChangeComplete?: (region: Region) => void;
  onMapPress?: (e: MapPressEvent) => void;
  children?: React.ReactNode;
  userId: string | null | undefined;
  refetchTrigger?: number; // 投稿後のみ更新するためのトークン
};

const CleanMap: React.FC<Props> = ({
  onSelectPost,
  onRegionChangeComplete,
  onMapPress,
  children,
  userId,
  refetchTrigger,
}) => {
  const { posts, loading, error, refetch } = usePosts();
  const [selectedClean, setSelectedClean] = React.useState<CleanLocationType | null>(null);

  // refetchTrigger が変化した時のみ再取得
  useEffect(() => {
    if (refetchTrigger) {
      refetch();
    }
  }, [refetchTrigger, refetch]);

  const uniquePosts = React.useMemo(() => {
    const seen = new Set<string>();
    return posts.filter((p: any) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
  }, [posts]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  if (error)
    return (
      <Text style={{ flex: 1, textAlign: "center" }}>エラー: {error}</Text>
    );

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        onPress={onMapPress}
        initialRegion={BASE_REGION}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {uniquePosts.map((post) => (
          <PostMarker
            key={post.id}
            post={post}
            onPress={onSelectPost}
            userId={userId}
          />
        ))}

        {CleanLocation.map((loc) => (
          <Marker
            key={`${loc.name}-${loc.latitude}-${loc.longitude}`}
            coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
            tracksViewChanges={false}
            onPress={() => setSelectedClean(loc)}
          >
            <Image
              source={loc.icon}
              style={{ width: CLEAN_ICON_SIZE, height: CLEAN_ICON_SIZE }}
              resizeMode="contain"
            />
          </Marker>
        ))}

        {children}
      </MapView>

      {selectedClean && (
        <View
          style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
          pointerEvents="box-none"
        >
          <Pressable
            onPress={() => setSelectedClean(null)}
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
          />

          <View
            style={{
              position: "absolute",
              left: 16,
              right: 16,
              top: "30%",
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 16,
              zIndex: 101,
            }}
          >
            <Text style={{ fontFamily: "ZenMaruGothicBold", fontSize: 16, marginBottom: 8 }}>掃除道具🧹🪣</Text>
            <Text style={{ marginBottom: 6, fontSize: 15 }}>場所：{selectedClean.name}</Text>
            <Text style={{ fontSize: 15}}>ご自由にお使いください</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default CleanMap;
