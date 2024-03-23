/*import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';

const TokenStorageComponent = () => {
  useEffect(() => {
    const requestPermissionAndGetToken = async () => {
      // ユーザーに通知の許可を求める
      const authStatus = await messaging().requestPermission();
      //const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      //if (enabled) {
        // デバイスのトークンを取得
        const token = await messaging().getToken();
        // 仮のユーザーID; 実際のアプリではユーザー固有のIDを使用
        const userId = 'your-user-id';

        // FirestoreにデバイストークンとユーザーIDを保存
        firestore().collection('tokens').add({
          userId: userId,
          token: token,
        }).then(() => {
          console.log('Token stored in firestore');
        }).catch((error) => {
          console.error('Error storing token:', error);
        });
      //}
    };

    requestPermissionAndGetToken();
  }, []);

  // UIが不要なため、ここには何も返さない
  return null;
};

export default TokenStorageComponent;*/

import * as Device from "expo-device";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

export async function registerForPushNotifications() {
  let token = "";
  // 端末上でこの関数が実行されているかを確認する
  if (Device.isDevice) {
    // 通知の権限の状態を取得する
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    // 通知が拒否されている場合
    if (existingStatus !== "granted") {
      // アラートを表示して、通知の許可を取得する
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    // 結局通知を拒否された場合
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

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
