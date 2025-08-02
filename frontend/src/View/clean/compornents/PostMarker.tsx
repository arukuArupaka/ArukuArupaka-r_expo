import React from "react";
import { Image } from "react-native";
import { Marker } from "react-native-maps";

const PostMarker = ({ post, onPress }) => {
  const imageSource =
    post.status === "resolved"
      ? require("../assets/image/broom-green.png")
      : require("../assets/image/broom-red.png");

  return (
    <Marker
      coordinate={{ latitude: post.latitude, longitude: post.longitude }}
      onPress={() => onPress(post)}
    >
      <Image source={imageSource} style={{ width: 40, height: 40 }} />
    </Marker>
  );
};

export default PostMarker;
