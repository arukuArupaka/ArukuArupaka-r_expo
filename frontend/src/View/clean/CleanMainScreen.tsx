import React, { useState } from "react";
import { StatusBar, View, Image } from "react-native";
import CleanMap from "./compornents/CleanMap";
import { PostButton } from "./compornents/PostButton";
import PostDetailCard from "./compornents/PostDtailCard";

const CleanMainScreen = () => {
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
          <Image
            source={require("./assets/image/broom-blue.png")}
            style={{ width: 40, height: 40 }}
          />
        </View>
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

export default CleanMainScreen;
