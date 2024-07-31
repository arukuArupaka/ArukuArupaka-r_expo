import { View, Text } from "react-native";
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
      const docRef = doc(
        db,
        "chatData",
        `${props.friend}`,
        `${props.roomID}`,
        "messages"
      );

      // ドキュメントの存在を確認
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        console.log( 33, [
          {
            ...sendMessageObject,
          },
        ]);
        // ドキュメントが存在する場合、メッセージを更新（追加）
        await updateDoc(docRef, {
          messages: arrayUnion({
            ...sendMessageObject,
          }),
        });
      } else {
        // ドキュメントが存在しない場合、新しく作成
        alert(  [
          {
            ...sendMessageObject,
          },
        ]);
        await setDoc(docRef, {
          messages: [
            {
              ...sendMessageObject,
            },
          ],
        });
      }
    } catch (e) {
      // その他のエラーの場合
      console.error(e);
    } finally {
      props.SendMessage(sendMessageObject);
    }
  };
  return <SendBox sendMessage={(message) => sendMessage(message)} />;
};
export default SendBoxContainer;
