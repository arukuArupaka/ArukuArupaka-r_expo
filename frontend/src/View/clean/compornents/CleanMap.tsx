import React, { useEffect } from "react";
import { ActivityIndicator, Text } from "react-native";
import MapView, { MapPressEvent, Region } from "react-native-maps";
import PostMarker from "./PostMarker";
import { usePosts } from "../lib/postsApi";

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
    <MapView
      style={{ flex: 1 }}
      onPress={onMapPress}
      initialRegion={{
        latitude: 34.98222,
        longitude: 135.96371,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
      }}
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
      {children}
    </MapView>
  );
};

export default CleanMap;
