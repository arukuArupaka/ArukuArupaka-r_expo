import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import MessageListContainer from "../../component/Textbook/Chat/messageListContainer";
import SendBoxContainer from "../../component/Textbook/Chat/SendBoxContainer";
import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const ChatView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [roomID, setRoomID] = useState("");
  const [scrollAreaHeight, setScrollAreaHeight] = useState(0);
  const scrollViewRef = useRef(null);
  const childRef = useRef();

  // メッセージ送信関数
  const SendMessage = async (messageObject) => {
    console.log(messageObject);
    if (childRef.current) {
      childRef.current.sendMessage(messageObject);
    }
  };

  // ルームID決定処理
  useEffect(() => {
    let roomGetID;
    const getDate = async () => {
      try {
        if (!route.params.chatData) return;
        if (!route.params.chatData.myChatID) return;

        const myChatID = route.params.chatData.myChatID;
        const friendChatID = route.params.chatData.friendChatID;

        if (myChatID.toLowerCase() < friendChatID.toLowerCase()) {
          roomGetID = myChatID + friendChatID;
        } else {
          roomGetID = friendChatID + myChatID;
        }
        setRoomID(roomGetID);
      } catch (e) {
        console.log(e);
      }
    };
    getDate();
  }, [route.params.chatData]);

  // スクロールコンテンツサイズ変更時に最下部へ自動スクロール
  const handleContentSizeChange = (contentWidth, contentHeight) => {
    if (scrollAreaHeight === 0) return;
    if (contentHeight > scrollAreaHeight) {
      scrollViewRef.current?.scrollTo({
        y: contentHeight - scrollAreaHeight,
        animated: true,
      });
    }
  };

  // 取引終了確認ダイアログ
  const confirmDeleteTextBook = () => {
    Alert.alert(
      "本当に取引を終了にしますか？",
      "この操作は取り消せません",
      [
        { text: "キャンセル", style: "cancel" },
        { text: "取引完了", onPress: () => deleteTextBook() },
      ]
    );
  };

  // 取引終了処理
  const deleteTextBook = async () => {
    try {
      const docRef = doc(db, "syuppinn", route.params.chatData.bookID);
      await deleteDoc(docRef);
      Alert.alert("取引を終了しました。", "取引が終了しました。");
      navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  };

  // 販売先変更確認ダイアログ
  const confirmChangeBuyUser = () => {
    Alert.alert(
      "販売するユーザーを変更しますか？",
      "この操作は取り消せません",
      [
        { text: "キャンセル", style: "cancel" },
        { text: "変更", onPress: () => changeBuyUser() },
      ]
    );
  };

  // 販売先変更処理
  const changeBuyUser = async () => {
    try {
      const docRef = doc(db, "syuppinn", route.params.chatData.bookID);
      await updateDoc(docRef, {
        buyUser: deleteField(),
      });
      Alert.alert("販売先を変更しました。", "販売先を変更しました。");
      navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  };

  console.log(route.params.chatData);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            {route.params.chatData.productName}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TextBookDetail", { ...route.params.chatData })
            }
            style={{ alignItems: "center" }}
          >
            <Text style={{ color: "gray" }}>教科書の詳細をみる</Text>
          </TouchableOpacity>
          <Image
            source={require("../../image/textbook/ChatNavigation1.png")}
            style={{ width: "90%", height: 120, alignSelf: "center", borderRadius: 10 }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView
            ref={scrollViewRef}
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setScrollAreaHeight(height);
            }}
            onContentSizeChange={handleContentSizeChange}
          >
            <MessageListContainer
              ref={childRef}
              myID={route.params.chatData.myChatID}
              roomID={roomID}
              friend={route.params.chatData.friendChatID}
            />
          </ScrollView>
        </View>

        {route.params.chatData.isMyTextBook && (
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <TouchableOpacity
              onPress={confirmChangeBuyUser}
              style={{
                paddingVertical: 7,
                marginHorizontal: 20,
                backgroundColor: "orange",
                flex: 1,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 15 }}>販売先を変更する</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmDeleteTextBook}
              style={{
                paddingVertical: 7,
                marginHorizontal: 20,
                backgroundColor: "orange",
                flex: 1,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 15 }}>購入手続きを終了する</Text>
            </TouchableOpacity>
          </View>
        )}

        <SendBoxContainer
          roomID={roomID}
          friend={route.params.chatData.friendID}
          myID={route.params.chatData.myChatID}
          SendMessage={(messageObject) => SendMessage(messageObject)}
        />
      </SafeAreaView>
    </View>
  );
};

export default ChatView;
