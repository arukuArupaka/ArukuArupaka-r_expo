import React from "react";
import { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";

const PostMarker = ({ post }) => {
  const iconColor = post.complete ? "#46A3FF" : "#F06E6E";

  return (
    <Marker
      coordinate={{
        latitude: post.latitude,
        longitude: post.longitude,
      }}
    >
      <MaterialIcons name="cleaning-services" size={30} color={iconColor} />
    </Marker>
  );
};

export default PostMarker;
