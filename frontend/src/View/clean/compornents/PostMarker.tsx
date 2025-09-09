import React from "react";
import { Image, View } from "react-native";
import { Marker } from "react-native-maps";

const PostMarker = ({ post, onPress, userId }) => {
  let imageSource;
  if (post.user_id === userId) {
    imageSource =
      post.status === "resolved"
        ? require("../assets/image/broom-self-green.png")
        : require("../assets/image/broom-self-red.png");
  } else {
    imageSource =
      post.status === "resolved"
        ? require("../assets/image/broom-green.png")
        : require("../assets/image/broom-red.png");
  }

  return (
    <Marker
      coordinate={{ latitude: post.latitude, longitude: post.longitude }}
      onPress={() => onPress(post)}
    >
      <Image source={imageSource} style={{ width: 50, height: 50 }} />
    </Marker>
  );
};

export default PostMarker;
