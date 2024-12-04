import React, { useState, useEffect, useRef } from "react";
import { Alert } from "react-native";
import {
  arrayUnion,
  collection,
  doc,
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

  const user = useSelector((state:any) => state.user.userObject);
  const dispatch = useDispatch();

  const [confirmFriendData, setConfirmFriendData] = useState({});

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

  const addFriend = async (friendID) => {
    try {
      const docRef = doc(db, "users", `${auth.currentUser.uid}`);
      await setDoc(
        docRef,
        {
          friendList: arrayUnion(friendID), // friendList に friendID を追加
        },
        { merge: true } // 既存のデータを保持して更新
      );

      setConfirmFriendData({});
      dispatch(
        setUserObject({
          ...user,
          friendList: [...(user.friendList || []), friendID], // friendList が存在しない場合は空配列を使用
        })
      );
      isReading.current = false;
    } catch (error) {
      console.error("Error adding friend: ", error);
    }
  };
  console.log(user);

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
