import React, { useState, useEffect, useRef } from "react";
import { Alert } from "react-native";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../../../firebase";
import { setUserObject } from "../../../redux/actions/userAction";
import FriendRegisterCamera from "./FriendRegisterCamera";

const FriendRegisterCameraContainer = () => {
  const user = useSelector((state: any) => state.user.userObject);
  const dispatch = useDispatch();

  const [confirmFriendData, setConfirmFriendData] = useState(null);

  const firebaseUserAddFriendConvertToken = async (friendConvertToken) => {
    try {
      // Firestoreの "friends" コレクションにドキュメントを追加
      await setDoc(
        doc(collection(db, "users"), `${auth.currentUser.uid}`),
        {
          friendConvertToken: friendConvertToken,
        },
        { merge: true }
      );
      dispatch(
        setUserObject({ ...user, friendConvertToken: friendConvertToken })
      );
    } catch (error) {
      console.error("Error adding friend convert token: ", error);
      throw error; // エラーハンドリング
    }
  };

  const isReading = useRef(false);
  const getFriendData = async (friendToken) => {
    if (isReading.current) {
      return;
    }
    try {
      isReading.current = true;
      console.log(74, friendToken);
      const q = query(
        collection(db, "users"),
        where("friendConvertToken", "==", friendToken),
        limit(1)
      );
      const querySnapshot = await getDocs(q);

      // 取得したドキュメントを処理
      if (!querySnapshot.empty) {
        const friendData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      }
      const friendData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setConfirmFriendData(friendData[0]);
      console.log(87, friendData[0]);
    } catch (error) {
      Alert.alert("エラー", "友達の情報を取得できませんでした", [
        {
          text: "OK",
          onPress: () => {
            isReading.current = false;
          },
        },
      ]);
    }
  };

  const onCloseConfirmDialog = () => {
    setConfirmFriendData({});
    isReading.current = false;
  };

  /**
   * 対象ユーザーのドキュメント内の、自分宛てに来たフレンド申請一覧に自分のIDを追加する
   * @param friendID
   */
  const addFriend = async (friendData) => {
    try {
      console.log("friendData", friendData);
      // すでに対象ユーザーにフレンド申請を送っていた場合
      if (
        !!friendData[0].receivedFriendRequests &&
        friendData[0].receivedFriendRequests.some(
          (el) => el.id === auth.currentUser.uid
        )
      ) {
        Alert.alert("エラー", "すでにフレンド申請を送っています", [
          {
            text: "OK",
            onPress: () => {
              isReading.current = false;
            },
          },
        ]);
        throw new Error("Already requested");
      }
      console.log(friendData.receivedFriendRequests, auth.currentUser.uid);
      const myDocRef = doc(db, "users", auth.currentUser.uid);
      const myDoc = await getDoc(myDocRef); // ここは今後要修正（おそらくreduxで自分のドキュメントを管理しているんだろうけど、やり方分からんから修正求む）
      const myDocument = myDoc.data();
      if (myDocument.friendList.some((el) => el.id === friendData[0].id)) {
        Alert.alert("エラー", "すでにフレンドです", [
          {
            text: "OK",
            onPress: () => {
              isReading.current = false;
            },
          },
        ]);
        throw new Error("Already friend");
      }
      const docRef = doc(db, "users", `${friendData[0].id}`);
      await setDoc(
        docRef,
        {
          receivedFriendRequests: arrayUnion({
            id: auth.currentUser.uid,
            name: myDocument.userName,
            requestedAt: new Date(),
          }), // friendList に friendID を追加
        },
        { merge: true } // 既存のデータを保持して更新
      );

      setConfirmFriendData({});
      isReading.current = false;
    } catch (error) {
      console.error("Error adding friend: ", error);
    }
  };

  return (
    <FriendRegisterCamera
      firebaseUserAddFriendConvertToken={firebaseUserAddFriendConvertToken}
      getFriendData={getFriendData}
      confirmFriendData={confirmFriendData}
      onCloseConfirmDialog={onCloseConfirmDialog}
      addFriend={addFriend}
    />
  );
};

export default FriendRegisterCameraContainer;
