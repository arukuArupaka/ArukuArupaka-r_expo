import React, { useState } from "react";
import { useFonts } from "expo-font";
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import { Animated } from "react-native";
import PostDetailCard from "./compornents/PostDtailCard";
import CleanMap from "./compornents/CleanMap";
import { PostButton } from "./compornents/PostButton";

const CleanMainView = () => {
  //フォント
  const [fontsLoaded] = useFonts({
    ZenMaruGothicBlack: require("../../../assets/fonts/ZenMaruGothic-Black.ttf"),
    ZenMaruGothicBold: require("../../../assets/fonts/ZenMaruGothic-Bold.ttf"),
  });
  //マーカー・投稿
  const [markerLocation, setMarkerLocation] = useState(null);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerLocation(coordinate);
  };
  const navigation = useNavigation();
  const handlePost = () => {
    if (!markerLocation) return;
    navigation.navigate("CleanPostView");
  };
  //マーカーの切り替え
  const [showMine, setShowMine] = useState(true);
  const [showAll, setShowAll] = useState(true);

  const [newPostLocation, setNewPostLocation] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const navigateToPostPage = () => {
    //投稿入力ページへ移動する
  };

  const handleSelectPost = (post) => {
    setSelectedPost(post);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <CleanMap
          onSelectPost={handleSelectPost}
          onRegionChangeComplete={(region) => {
            setNewPostLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}
        />
        <PostButton onPress={navigateToPostPage} />
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
