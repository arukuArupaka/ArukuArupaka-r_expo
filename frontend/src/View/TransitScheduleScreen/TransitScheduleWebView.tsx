import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Linking,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation, useRoute } from "@react-navigation/native";

const THEME_COLOR = "#7A1C23";

const TransitScheduleWebView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { url } = route.params;

  const [loading, setLoading] = useState(true);

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* カスタムヘッダー */}
        <View style={{ flex: 1, position: "relative" }}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Entypo name="chevron-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>時刻表 詳細</Text>
          </View>

          {/* WebView */}
          <WebView
            source={{ uri: url }}
            onLoadEnd={() => setLoading(false)}
            style={{ flex: 1 }}
          />

          {/* ローディング中のオーバーレイ */}
          {loading && (
            <View style={styles.loadingOverlay}>
              <View style={styles.loadingBox}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.loadingText}>読み込み中...</Text>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>

      {/* フッターボタン */}
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.footerText}>外部ブラウザで開く</Text>
        <Entypo
          name="export"
          size={16}
          color="#fff"
          style={{ marginLeft: 6 }}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLOR,
  },
  header: {
    backgroundColor: THEME_COLOR,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 3,
    borderColor: "#5C1F29",
  },
  backButton: {
    marginRight: 12,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  loadingOverlay: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)", // 暗め背景
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingBox: {
    backgroundColor: THEME_COLOR,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME_COLOR,
    paddingVertical: 10,
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default TransitScheduleWebView;
