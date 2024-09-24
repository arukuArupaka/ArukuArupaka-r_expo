import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import ImageScrollComponent from "../component/Bike/tap";
import Bottan from "../component/Bike/botann.js";
import ColorChange from "../component/TimeTable/ColorChange";

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
            marginTop: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => setShowImageScroll(true)}
            style={{
              marginLeft: 15,
              alignItems: "center",
              borderRadius: 65,
              backgroundColor: showImageScroll ? "#30cb89" : "#eeeeee",
              width: 170,
              height: 30,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginTop: 1,
                color: showImageScroll ? "#ffffff" : "#010101",
              }}
            >
              タップで
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowImageScroll(false)}
            style={{
              marginLeft: 5,
              alignItems: "center",
              borderRadius: 65,
              backgroundColor: showImageScroll ? "#eeeeee" : "#30cb89",
              width: 170,
              height: 30,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: showImageScroll ? "#010101" : "#ffffff",
              }}
            >
              ボタンで
            </Text>
          </TouchableOpacity>
        </View>

        {showImageScroll ? <ImageScrollComponent /> : <Bottan />}
      </View>
    </ScrollView>
  );
};

export default BikeView;
