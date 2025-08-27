import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { View, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "./lib/supabase";
import PostDetailCard from "./compornents/PostDtailCard";
import CleanMap from "./compornents/CleanMap";
import { PostButton } from "./compornents/PostButton";
import NewPostMarker from "./compornents/NewPostMarker";
import type { MapPressEvent } from "react-native-maps";

type LatLng = { latitude: number; longitude: number };

const CleanMainView = () => {
  const [fontsLoaded] = useFonts({
    ZenMaruGothicBlack: require("../../../assets/fonts/ZenMaruGothic-Black.ttf"),
    ZenMaruGothicBold: require("../../../assets/fonts/ZenMaruGothic-Bold.ttf"),
  });

  const [markerLocation, setMarkerLocation] = useState<LatLng | null>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const navigation = useNavigation<any>();
  // 初期セッションの復元が完了するまで待ってから未ログインならLoginへ遷移
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        if (!session) {
          navigation.replace("CleanLoginView");
        }
        return;
      }
      if (event === "SIGNED_OUT") {
        navigation.replace("CleanLoginView");
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, [navigation]);

  const handleMapPress = (event: MapPressEvent) => {
    const coord = event?.nativeEvent?.coordinate;
    if (coord) setMarkerLocation(coord);
  };

  const handlePost = () => {
    if (!markerLocation) return;
    navigation.navigate("CleanPostView", {
      latitude: markerLocation.latitude,
      longitude: markerLocation.longitude,
    });
  };

  const handleSelectPost = (post: any) => setSelectedPost(post);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <CleanMap onSelectPost={handleSelectPost} onMapPress={handleMapPress}>
          {markerLocation && <NewPostMarker markerLocation={markerLocation} />}
        </CleanMap>

        <PostButton onPress={handlePost} enabled={!!markerLocation} />

        {selectedPost && (
          <PostDetailCard
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </View>
    </>
  );
};

export default CleanMainView;
