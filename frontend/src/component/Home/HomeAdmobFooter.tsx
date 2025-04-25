import { View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  BannerAd,
  BannerAdSize,
  AdsConsent,
  AdsConsentStatus,
} from "react-native-google-mobile-ads";

const HomeAdmobFooter = () => {
  const [readyToShowAd, setReadyToShowAd] = useState(false);
  const [nonPersonalizedOnly, setNonPersonalizedOnly] = useState(true); // デフォルトはtrue（安全策）

  useEffect(() => {
    const checkConsent = async () => {
      try {
        const consentInfo = await AdsConsent.requestInfoUpdate();

        let status = consentInfo.status;

        if (
          consentInfo.isConsentFormAvailable &&
          status === AdsConsentStatus.REQUIRED
        ) {
          const result = await AdsConsent.showForm();
          status = result.status;
        }

        if (status === AdsConsentStatus.OBTAINED) {
          setNonPersonalizedOnly(false); // 同意取得 → パーソナライズ広告OK
        } else {
          setNonPersonalizedOnly(true); // 同意拒否 or 必要なし → 非パーソナライズ
          console.log("同意なし：非パーソナライズ広告を使用");
        }
      } catch (e) {
        console.error("同意確認エラー: ", e);
        setNonPersonalizedOnly(true); // エラー時も非パーソナライズ
      } finally {
        setReadyToShowAd(true);
      }
    };

    checkConsent();
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <BannerAd
        unitId={"ca-app-pub-7782777506427620/1528362176"} // ★ 本番はここを本物のAd Unit IDに置き換える
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: nonPersonalizedOnly,
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
