import { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Button,
  Platform,
  StyleSheet,
  Alert,
  Clipboard,
} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

// アプリがフォアグラウンドで実行中でも通知を表示する設定
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    // アプリ起動時にトークンを取得する
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
        console.log("取得したExpo Push Token:", token);
      }
    });
  }, []);

  // ボタンを押してトークンを再取得・表示する関数
  const handleGetToken = async () => {
    const token = await registerForPushNotificationsAsync();
    if (token) {
      setExpoPushToken(token);
      console.log("再取得したExpo Push Token:", token);
      Alert.alert("トークン取得成功", token, [{ text: "OK" }]);
    }
  };

  // トークンをクリップボードにコピーする関数
  const copyToClipboard = () => {
    if (expoPushToken) {
      Clipboard.setString(expoPushToken);
      Alert.alert(
        "コピーしました",
        "プッシュトークンをクリップボードにコピーしました。"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Push Token</Text>
      <Text style={styles.info}>
        以下のトークンをサーバーに送信して、プッシュ通知を送れるようになります。
      </Text>

      <Text style={styles.token} selectable onLongPress={copyToClipboard}>
        {expoPushToken || "トークンを取得中…"}
      </Text>
      <Text style={styles.copyHint}>
        (トークンを長押しするとコピーできます)
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="トークンを再取得する" onPress={handleGetToken} />
      </View>
    </View>
  );
}

// プッシュ通知の権限をリクエストし、Expo Push Tokenを取得するメインの関数
async function registerForPushNotificationsAsync() {
  let token;

  if (!Device.isDevice) {
    Alert.alert(
      "エラー",
      "プッシュ通知はエミュレーターやシミュレーターではなく、実機でテストする必要があります。"
    );
    return;
  }

  // 現在の通知許可ステータスを確認
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // 許可が得られていない場合は、再度許可を求める
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  // 最終的に許可が得られなかった場合は処理を中断
  if (finalStatus !== "granted") {
    Alert.alert(
      "許可が必要です",
      "プッシュ通知の許可が得られませんでした。設定アプリから通知を許可してください。"
    );
    return;
  }

  // projectId を app.json/app.config.js から自動で取得
  const projectId = Constants.expoConfig?.extra?.eas?.projectId;
  if (!projectId) {
    Alert.alert(
      "設定エラー",
      "app.json (または app.config.js) に projectId が設定されていません。`npx eas project:init` を実行してください。"
    );
    return;
  }

  // Expo Push Token を取得
  try {
    const pushTokenData = await Notifications.getExpoPushTokenAsync({
      projectId,
    });
    token = pushTokenData.data;
  } catch (e) {
    console.error(e);
    Alert.alert(
      "トークン取得エラー",
      `Expo Push Tokenの取得に失敗しました: ${e.message}`
    );
  }

  // Android用の設定
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

// スタイル
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  token: {
    fontSize: 14,
    textAlign: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    marginBottom: 5,
  },
  copyHint: {
    fontSize: 12,
    color: "#888",
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
