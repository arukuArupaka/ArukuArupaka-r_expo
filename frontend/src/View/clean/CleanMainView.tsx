import React, { useState } from "react";
import { useFonts } from "expo-font";
import { View, StatusBar, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { supabase } from "./lib/supabase";
import PostDetailCard from "./compornents/PostDtailCard";
import CleanMap from "./compornents/CleanMap";
import { PostButton } from "./compornents/PostButton";
import NewPostMarker from "./compornents/NewPostMarker";
import type { MapPressEvent } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";

type LatLng = { latitude: number; longitude: number };

const CleanMainView = () => {
  const [fontsLoaded] = useFonts({
    ZenMaruGothicBlack: require("../../../assets/fonts/ZenMaruGothic-Black.ttf"),
    ZenMaruGothicBold: require("../../../assets/fonts/ZenMaruGothic-Bold.ttf"),
  });

  const [markerLocation, setMarkerLocation] = useState<LatLng | null>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const navigation = useNavigation<any>();
  const headerHeight = useHeaderHeight();
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!cancelled && !session) {
          navigation.replace("CleanLoginView");
        } else if (!cancelled && session) {
          setUserId(session.user.id);
        }
      })();
      return () => {
        cancelled = true;
      };
    }, [navigation])
  );

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
        <View
          pointerEvents="box-none"
          style={{
            position: "absolute",
            top: 15,
            left: 15,
            zIndex: 3,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("CleanMyPage")}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 8,
            }}
          >
            <Ionicons name="person" size={24} color="#000" />
          </TouchableOpacity>
        </View>

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
