import { View, Text, Alert } from "react-native";
import React from "react";
import SendBox from "./SendBox";
import { async } from "@firebase/util";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import uuid from "react-native-uuid";

const SendBoxContainer = (props) => {
  const sendMessage = async (message) => {
    const sendMessageObject = {
      sendAt: new Date(),
      message: message,
      sendUser: props.myID,
      id: uuid.v4(),
    };
    try {
      // メッセージをコンソールにログ出力

      // Firestoreのドキュメント参照を取得
      const docRef = doc(db, "chatData", `${props.friend}`, `${props.roomID}`, "messages");

      // ドキュメントを常に作成または更新
      await setDoc(docRef, {
        messages: arrayUnion({ ...sendMessageObject }),
      }, { merge: true });
      
      props.SendMessage(sendMessageObject);
    } catch (e) {
      // その他のエラーの場合
      Alert.alert("エラー", "メッセージの送信に失敗しました");
      console.error(e);
    } finally {
    }
  };
  return <SendBox sendMessage={(message) => sendMessage(message)} />;
};
export default SendBoxContainer;
