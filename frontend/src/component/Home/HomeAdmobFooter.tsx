import { View } from "react-native";
import React from "react";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const HomeAdmobFooter = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <BannerAd
        unitId={"ca-app-pub-7782777506427620/1528362176"} // ★ 本番はここを本物のAd Unit IDに置き換える
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log("Ad loaded");
        }}
        onAdFailedToLoad={(error) => {
          console.error("Ad failed to load: ", error);
        }}
      />
    </View>
  );
};

export default HomeAdmobFooter;
