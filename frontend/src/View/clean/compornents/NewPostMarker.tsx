import React from "react";
import { Marker } from "react-native-maps";
import { Image } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const NewPostMarker = ({ markerLocation }) => {
  return (
    <>
      <Marker coordinate={markerLocation}>
        
        <MaterialCommunityIcons name="target" size={50} color="blue" />
        {/* <Image
          source={require("../assets/image/broom-blue.png")}
          style={{ width: 50, height: 55 }}
        /> */}
      </Marker>
    </>
  );
};

// MapViewの外でも使えるシンプルなアイコン（HowTo画面等で利用）
export const NewPostMarkerIcon = ({ size = 28, color = "blue", style }: { size?: number; color?: string; style?: any }) => (
  <MaterialCommunityIcons name="target" size={size} color={color} style={style} />
);

export default NewPostMarker;
