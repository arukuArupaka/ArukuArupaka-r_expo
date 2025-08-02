import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text } from "react-native";
import MapView from "react-native-maps";
import { supabase } from "../lib/supabase";
import PostMarker from "./PostMarker";

const CleanMap = ({ onSelectPost, onRegionChangeComplete }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.from("posts").select(`
            *,
            users ( name, nickname )
          `);
        if (error) throw error;
        if (data) setPosts(data);
      } catch (err) {
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
    </MapView>
  );
};

export default CleanMap;
