import React, { useContext } from "react";
import { Platform, View } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { useSelector } from "react-redux";
//import { PremiumContext, TrackingContext } from "../../PremiumContext";

interface Props {
  size: BannerAdSize;
}

export default function MyAdmob(props: Props) {

  const nonPersonalizedOnly=useSelector((state)=>state.common.nonPersonalizedOnly)

//   const { isPremium } = useContext(PremiumContext);
//   const { nonPersonalizedOnly } = useContext(TrackingContext);

  // テスト用のID
  // 実機テスト時に誤ってタップしたりすると、広告の配信停止をされたりするため、テスト時はこちらを設定する
  const unitId = TestIds.BANNER;

  // 実際に広告配信する際のID
  // 広告ユニット（バナー）を作成した際に表示されたものを設定する
  const adUnitID = Platform.select({
    ios:"ca-app-pub-5827416667703619/5823693158",
    android: "ca-app-pub-5827416667703619/1898489074",
  });

  // プレミアムユーザーは広告を表示しない
//   if (isPremium) {
//     return <View />;
//   }

  return (
    <BannerAd
      {...props}
      unitId={adUnitID}
      requestOptions={{ requestNonPersonalizedAdsOnly:nonPersonalizedOnly }}
    />
  );
}