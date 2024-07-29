import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import ImageScrollComponent from "../component/Bike/tap.js";
import Bottan from "../component/Bike/botann.js";

const BikeView = () => {
  const [showImageScroll, setShowImageScroll] = useState(true);

  const toggleComponent = () => {
    setShowImageScroll((prev) => !prev);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => setShowImageScroll(true)}
            style={{
              marginLeft: 10,
              alignItems: "center",
              borderRadius: 20,
              backgroundColor: showImageScroll ? "#30cb89" : "#eeeeee",
              width: 200,
            }}
          >
            <Text style={{ fontSize: 20 }}>タップ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowImageScroll(false)}
            style={{
              marginLeft: 10,
              alignItems: "center",
              borderRadius: 20,
              backgroundColor: showImageScroll ? "#eeeeee" : "#30cb89",
              width: 200,
            }}
          >
            <Text style={{ fontSize: 20 }}>ボタン</Text>
          </TouchableOpacity>
        </View>

        {showImageScroll ? <ImageScrollComponent /> : <Bottan />}
      </View>
    </ScrollView>
  );
};

export default BikeView;
