import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { Linking } from "react-native";

// あなたのNext.jsカレンダーアプリのURLをここに設定！
const CALENDAR_URL = "https://calender-eta-three.vercel.app/";

export default function ACalendar() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: CALENDAR_URL }}
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        onShouldStartLoadWithRequest={(request) => {
          const isExternal = !request.url.startsWith(CALENDAR_URL);

          if (isExternal) {
            Linking.openURL(request.url);
            return false;
          }

          return true;
        }}
      />
    </View>
  );
}
