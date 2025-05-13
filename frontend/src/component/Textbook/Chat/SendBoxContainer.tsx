import { View, Text, Alert } from "react-native";
import React, { useEffect } from "react";
import SendBox from "./SendBox";
import { arrayUnion, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import uuid from "react-native-uuid";
import * as Notifications from "expo-notifications"; // expo-notificationsをインポート

const SendBoxContainer = (props) => {
  useEffect(() => {
    const registerDevice = async () => {
      try {
        // 通知の許可をリクエスト
        const { status } = await Notifications.requestPermissionsAsync();

        if (status === "granted") {
          // デバイストークンの取得
          const token = await Notifications.getExpoPushTokenAsync();
          console.log("Expo Push Token:", token.data);

          // Firestoreに保存
          await setDoc(
            doc(db, "userTokens", props.myID),
            { expoPushToken: token.data },
            { merge: true }
          );
        } else {
          console.log("通知が許可されていません");
        }
      } catch (error) {
        console.error("通知の取得に失敗:", error);
        Alert.alert("通知エラー", "デバイストークンの取得に失敗しました");
      }
    };

    registerDevice();
  }, []);

  const sendMessage = async (message) => {
    const sendMessageObject = {	
      sendAt: new Date(),
      message: message,
      sendUser: props.myID,
      id: uuid.v4(),
    };

    try {
      const docRef = doc(
        db,
        "chatData",
        `${props.friend}`,
        `${props.roomID}`,
        "messages"
      );

      // メッセージをFirestoreに保存
      try {
        await setDoc(
          docRef,
          {
            messages: arrayUnion({ ...sendMessageObject }),
          },
          { merge: true }
        );
      } catch (error) {
        console.error("Firestoreメッセージ保存エラー:", error);
        throw new Error("メッセージの保存に失敗しました");
      }

      // 受信者のデバイストークンを取得
      const userDocRef = doc(db, "userTokens", props.friend);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const { expoPushToken } = userDoc.data();

        // 受信者が通知を許可している場合、プッシュ通知を送信
        if (expoPushToken) {
          try {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: `${props.myID}さんからメッセージが届きました！`,
                body: message,
              },
              trigger: null, // 即時通知
            });
          } catch (error) {
            console.error("プッシュ通知エラー:", error);
            throw new Error("プッシュ通知の送信に失敗しました");
          }
        }
      } else {
        console.log("受信者のデバイストークンが見つかりません");
      }

      props.SendMessage(sendMessageObject);
    } catch (e) {
      Alert.alert("エラー", e.message || "メッセージの送信に失敗しました");
      console.error(e);
    }
  };

  return <SendBox sendMessage={(message) => sendMessage(message)} />;
};

export default SendBoxContainer;


