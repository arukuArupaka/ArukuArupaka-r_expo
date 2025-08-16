import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text } from "react-native";
import MapView, { MapPressEvent, Region } from "react-native-maps";
import { supabase } from "../lib/supabase";
import PostMarker from "./PostMarker";

type Props = {
  onSelectPost: (post: any) => void;
  onRegionChangeComplete?: (region: Region) => void;
  onMapPress?: (e: MapPressEvent) => void;
  children?: React.ReactNode;
};

const CleanMap: React.FC<Props> = ({
  onSelectPost,
  onRegionChangeComplete,
  onMapPress,
  children,
}) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.from("posts").select(`
          *,
          users ( name, nickname )
        `);
        if (error) throw error;
        if (data) setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  if (error)
    return (
      <Text style={{ flex: 1, textAlign: "center" }}>エラー: {error}</Text>
    );

  return (
    <MapView
      style={{ flex: 1 }}
      onPress={onMapPress} // ← 親にフォワード
      initialRegion={{
        latitude: 34.98222,
        longitude: 135.96371,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
      }}
      onRegionChangeComplete={onRegionChangeComplete}
    >
      {posts.map((post) => (
        <PostMarker key={post.id} post={post} onPress={onSelectPost} />
      ))}
      {children}
    </MapView>
  );
};

export default CleanMap;
