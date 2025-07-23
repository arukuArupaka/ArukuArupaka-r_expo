import React, { useState } from "react";
import { useFonts } from "expo-font";
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import { Animated } from "react-native";

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
  const handlePost = () => {
    if (!markerLocation) return;
  };
  //マーカーの切り替え
  const [showMine, setShowMine] = useState(true);
  const [showAll, setShowAll] = useState(true);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 34.98222186686605, //初期状態でBKCが中心になるように設定
            longitude: 135.96371280735272,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          onPress={handleMapPress}
          zoomEnabled={true} //ズーム機能
          zoomTapEnabled={true} //ダブルタップでズーム(iosのみ)
          showsCompass={false} //コンパス非表示
        >
          {markerLocation && (
            <>
              <Marker coordinate={markerLocation}>
                <MaterialIcons
                  name="cleaning-services"
                  size={30}
                  color="#F06E6E"
                />
              </Marker>
            </>
          )}
        </MapView>
        <TouchableOpacity
          onPress={handlePost}
          disabled={!markerLocation}
          style={{
            position: "absolute",
            bottom: 50,
            alignSelf: "center",
            backgroundColor: markerLocation ? "#7ACCFF" : "#CECECE",
            width: "40%",
            height: "8%",
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 20,
              fontFamily: "ZenMaruGothicBold",
            }}
          >
            みくと最強
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CleanMainView;
