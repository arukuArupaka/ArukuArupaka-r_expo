import React from "react";
import { Marker } from "react-native-maps";
import { Image } from "react-native";

export const NewPostMarker = ({ markerLocation }) => {
  return (
    <>
      <Marker coordinate={markerLocation}>
        <Image
          source={require("../assets/image/broom-blue.png")}
          style={{ width: 50, height: 55 }}
        />
      </Marker>
    </>
  );
};
export default NewPostMarker;
