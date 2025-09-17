import React, { useState } from "react";
import { useFonts } from "expo-font";
import { View, StatusBar } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { supabase } from "./lib/supabase";
import PostDetailCard from "./compornents/PostDtailCard";
import CleanMap from "./compornents/CleanMap";
import RankingHeaderCard from "./compornents/RankingHeaderCard";
import { PostButton } from "./compornents/PostButton";
import NewPostMarker from "./compornents/NewPostMarker";
import type { MapPressEvent } from "react-native-maps";

type LatLng = { latitude: number; longitude: number };

const CleanMainView = () => {
  const handleRegionChangeComplete = (region: {
    latitude: number;
    longitude: number;
  }) => {
    setMarkerLocation({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };
  const [fontsLoaded] = useFonts({
    ZenMaruGothicBlack: require("../../../assets/fonts/ZenMaruGothic-Black.ttf"),
    ZenMaruGothicBold: require("../../../assets/fonts/ZenMaruGothic-Bold.ttf"),
  });

  const [markerLocation, setMarkerLocation] = useState<LatLng>({
    latitude: 34.98222,
    longitude: 135.96371,
  });
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [refetchToken, setRefetchToken] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  const navigation = useNavigation<any>();
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!cancelled && !session) {
          navigation.replace("CleanLoginView");
          setUserId(null);
        } else {
          setUserId(session.user.id);
        }
      })();
      return () => {
        cancelled = true;
      };
    }, [navigation])
  );

  const handlePost = () => {
    if (!markerLocation) return;
    navigation.navigate("CleanPostView", {
      latitude: markerLocation.latitude,
      longitude: markerLocation.longitude,
      onPosted: () => {
        // 投稿完了コールバックでトークン更新
        setRefetchToken((t) => t + 1);
      },
    });
  };

  const handleSelectPost = (post: any) => setSelectedPost(post);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <RankingHeaderCard period="week" refetchTrigger={refetchToken} />
        <CleanMap
          onSelectPost={handleSelectPost}
          onRegionChangeComplete={handleRegionChangeComplete}
          userId={userId}
          refetchTrigger={refetchToken}
        >
          {markerLocation && (
            <View
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginLeft: -20,
                marginTop: -40,
              }}
              pointerEvents="none"
            >
              <NewPostMarker markerLocation={markerLocation} />
            </View>
          )}
        </CleanMap>

        <PostButton onPress={handlePost} enabled={!!markerLocation} />

        {selectedPost && (
          <PostDetailCard
            post={selectedPost}
            userId={userId}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </View>
    </>
  );
};

export default CleanMainView;
