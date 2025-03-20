import { FC, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ClassPeriod } from "../../component/TimeTable/types/class-period";
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
import { auth, db } from "../../../firebase";
import * as Clipboard from "expo-clipboard";
import FriendAddConfirmDialog from "../../component/TimeTable/FriendRegister/FriendAddConfirmDialog";
import Feather from "@expo/vector-icons/Feather";

const TimeTableFriendSearch = () => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [userDocument, setUserDocument] = useState<any>(null);
  const textInputRef = useRef<TextInput>(null); // TextInputの参照を作成

  const fetchUserDocument = async () => {
    const docRef = doc(db, "users", `${auth.currentUser.uid}`);
    const document = await getDoc(docRef);
    const data = document.data();
    console.log(data);
    setUserDocument(data);
  };

  useEffect(() => {
    // コンポーネントがマウントされた時にフォーカスを当てる
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
    fetchUserDocument();
  }, []); // 空の依存配列でコンポーネントマウント時のみ実行

  const pbcopy = async () => {
    await Clipboard.setStringAsync(userDocument.friendConvertToken);
  };

  const searchUserDocument = async () => {
    const q = query(
      collection(db, "users"),
      where("friendConvertToken", "==", searchWord),
      limit(1)
    );
    const querySnapshot = await getDocs(q);

    const friendData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    setSearchResult(friendData[0]);
  };

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
          },
        ]);
        throw new Error("Already requested");
      }
      console.log(friendData.receivedFriendRequests, auth.currentUser.uid);
      const myDocRef = doc(db, "users", auth.currentUser.uid);
      const myDoc = await getDoc(myDocRef); // ここは今後要修正（おそらくreduxで自分のドキュメントを管理しているんだろうけど、やり方分からんから修正求む）
      const myDocument = myDoc.data();
      console.log("id", friendData[0].id);
      const docRef = doc(db, "users", `${friendData[0].id}`);
      console.log("docRef", docRef);
      await setDoc(
        docRef,
        {
          receivedFriendRequests: arrayUnion({
            id: auth.currentUser.uid,
            name: myDocument.userName,
            requestedAt: new Date(),
          }), // friendList に friendID を追加
          hello: "hello",
        },
        { merge: true } // 既存のデータを保持して更新
      );
      const updatedData = await getDoc(docRef);
      console.log("updatedData", updatedData.data());

      setSearchResult(null);
    } catch (error) {
      console.error("Error adding friend: ", error);
    }
  };

  const onClose = () => {
    setSearchResult(null);
  };

  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
      }}
    >
      <View style={styles.header}>
        <View style={styles.searchBoxContainer}>
          <View style={styles.searchBox}>
            <View style={styles.searchBox2}>
              <FontAwesome
                name="search"
                size={24}
                color="black"
                style={{ marginLeft: 10 }}
              />
              <TextInput
                ref={textInputRef} // TextInputの参照を設定
                onChangeText={(text) => {
                  setSearchWord(text);
                }}
                value={searchWord}
                placeholder="ユーザーIDを入力"
                style={{
                  fontSize: 20,
                  marginLeft: 5,
                  width: "80%",
                  fontWeight: "bold",
                }}
              />
            </View>
            <TouchableOpacity
              onPress={async () => await searchUserDocument()}
              style={{
                padding: 8,
                backgroundColor: "#d3d3d3",
                borderRadius: 10,
                marginLeft: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", margin: 10, fontSize: 15 }}>
                検索
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            あなたのユーザーID:
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>
              {!!userDocument ? `${userDocument.friendConvertToken}` : ""}
            </Text>
            <TouchableOpacity onPress={pbcopy} style={{ marginLeft: 10 }}>
              <Feather name="copy" size={20} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        {!!searchResult && (
          <FriendAddConfirmDialog
            confirmFriendData={searchResult}
            onClose={onClose}
            onConfirm={addFriend}
          />
        )}
      </ScrollView>
    </View>
  );
};
export default TimeTableFriendSearch;

const styles = StyleSheet.create({
  header: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
  },
  searchBoxContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    marginTop: 20,
  },
  searchBox: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: "10%",
  },
  searchBox2: {
    width: "67%",
    height: "35%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
});
