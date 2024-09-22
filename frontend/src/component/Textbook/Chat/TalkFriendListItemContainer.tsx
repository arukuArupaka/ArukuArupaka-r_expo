import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  arrayRemove,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import TextBookChatView from "../../../View/Textbook/main/TextBookChatView";
import { db } from "../../../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTimeTable } from "../../TimeTable/timeTableContext";
import { useSelector } from "react-redux";

const TalkFriendListItemContainer = (props) => {
  const { setUnreadMessagesJSON, unreadMessagesJSON } = useTimeTable();
  //const userUUID = useSelector((state: State) => state.user.userUUID || "");
  const [roomID, setRoomID] = useState("");
  const navigation = useNavigation();
  const [isReadFirst, setIsreadFirst] = useState(false);

  let roomGetID;
  let unsubscribe;

  useEffect(() => {
    const watchMessage = () => {
      // ドキュメント参照を取得
      if (props.FriendData.myChatID && roomGetID) {
        const docRef = doc(
          db,
          "chatData",
          `${props.FriendData.myID}`,
          `${roomGetID}`,
          "messages"
        );
        // リアルタイムリスナーを設定
        unsubscribe = onSnapshot(docRef, async (docSnapshot) => {
          try {
            let unreadMessages = [];

            const myID = props.FriendData.myChatID;
            const friendID = props.FriendData.friendChatID;

            if (myID.toLowerCase() < friendID.toLowerCase()) {
              roomGetID = myID + friendID;
              setRoomID(roomGetID);
            }
            if (myID.toLowerCase() > friendID.toLowerCase()) {
              roomGetID = friendID + myID;
              setRoomID(roomGetID);
            }

            console.log("79");
            console.log(unreadMessagesJSON[roomGetID]);

            if (!unreadMessagesJSON[roomGetID]) {
              console.log("getdata62", `chatUnreadMessages_${roomGetID}`);
              const storedMessages = await AsyncStorage.getItem(
                `chatUnreadMessages_${roomGetID}`
              );
              console.log(JSON.parse(storedMessages));
              if (
                storedMessages !== null &&
                JSON.parse(storedMessages).length !== 0
              ) {
                unreadMessages = JSON.parse(storedMessages);
              }
              console.log("getdata");
              console.log(unreadMessages);
            }

            console.log(docSnapshot.exists());
            if (docSnapshot.exists()) {
              const data = docSnapshot.data().messages;
              console.log(docSnapshot.data().messages);
              console.log(22);
              if (data.length === 0) {
                if (
                  !unreadMessagesJSON[roomGetID] ||
                  unreadMessagesJSON[roomGetID].length === 0
                ) {
                  console.log(unreadMessages);
                  setUnreadMessagesJSON((prev) => {
                    return {
                      ...prev,
                      [roomGetID]: removeDuplicates([...unreadMessages]),
                    };
                  });
                }
                setIsreadFirst(true);
                return;
              }
              data.forEach((messageObject) => {
                console.log(62);
                console.log(messageObject);
                // Alert.alert(messageObject.message);
                unreadMessages.push(messageObject);
              });
              console.log(unreadMessages);
              unreadMessages.sort(
                (a, b) => new Date(b.sendAt) - new Date(a.sendAt)
              );
              console.log(36);
              // setUnreadMessagesDisplay([
              //   ...removeDuplicates([...unreadMessages]),
              // ]);
              console.log(getRoomID());

              if (data && data.length > 0) {
                for (const message of data) {
                  try {
                    // AsyncStorageに保存
                    //   const storageKey = `${props.roomID}-${message.sendAt}`;
                    //   await AsyncStorage.setItem(storageKey, JSON.stringify(message));
                    //setGetmessageArray(data.messages)
                    console.log(30);
                    // Firestoreから削除
                    //sortMessageArray(data.messages)
                    await updateDoc(docRef, {
                      messages: arrayRemove(message),
                    });
                  } catch (error) {
                    console.error(
                      "Error saving message to AsyncStorage or deleting from Firestore:",
                      error
                    );
                  }
                }
              }
            }

            if (unreadMessages.length === 0) {
              setIsreadFirst(true);
              return;
            }

            setUnreadMessagesJSON((prev) => {
              return {
                ...prev,
                [roomGetID]: removeDuplicates([
                  ...(prev[roomGetID] || []),
                  ...unreadMessages,
                ]),
              };
            });
            setIsreadFirst(true);
          } catch (e) {
            console.error(e);
          }
        });
      }
    };
    const getDate = async () => {
      try {
        if (!props.FriendData.myChatID) {
          return;
        }
        // console.log(userUUID);
        console.log(props.id);
        const myID = props.FriendData.myChatID;
        const friendID = props.FriendData.friendChatID;

        if (myID.toLowerCase() < friendID.toLowerCase()) {
          roomGetID = myID + friendID;
          setRoomID(roomGetID);
        }
        if (myID.toLowerCase() > friendID.toLowerCase()) {
          roomGetID = friendID + myID;
          setRoomID(roomGetID);
        }
        watchMessage();
        console.log(49);
      } catch (e) {
        console.log(e);
      }
    };
    getDate();

    const getRoomID = async () => {
      const myID = props.FriendData.myChatID;
      const friendID = props.FriendData.friendChatID;

      if (myID.toLowerCase() < friendID.toLowerCase()) {
        roomGetID = myID + friendID;
        return setRoomID(roomGetID);
      }
      if (myID.toLowerCase() > friendID.toLowerCase()) {
        roomGetID = friendID + myID;
        return setRoomID(roomGetID);
      }
    };

    // コンポーネントのクリーンアップ時にリスナーを解除
    return () => {
      unsubscribe;
      console.log("unsubscribe");
    };
  }, [props.roomID, props.myID]);

  function removeDuplicates(data) {
    const seen = new Set();
    return data.filter((item) => {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        return true;
      }
      return false;
    });
  }

  useEffect(() => {
    const refreshChatMessages = async () => {
      if (!roomID) return;
      console.log("保存けいとう", isReadFirst);

      if (!isReadFirst) return;

      //if(unreadMessagesJSON[roomID].length===0) return

      try {
        console.log("保存けいとう");

        console.log(unreadMessagesJSON[roomID]);
        console.log(
          unreadMessagesJSON[roomID] ? unreadMessagesJSON[roomID] : []
        );

        await AsyncStorage.setItem(
          `chatUnreadMessages_${roomID}`,
          JSON.stringify(
            unreadMessagesJSON[roomID] ? unreadMessagesJSON[roomID] : []
          )
        );
      } catch (error) {
        console.error("Error accessing AsyncStorage:", error);
      }
    };

    refreshChatMessages();
  }, [unreadMessagesJSON[roomID], roomID]);

  return (
    <TouchableOpacity
      style={{
        borderTopWidth: 1,
        borderTopColor: "silver",
        flexDirection: "row",
        paddingLeft: "2%",
        alignItems: "center",
        paddingVertical: "4%",
      }}
      onPress={() =>
        navigation.navigate("ChatView", {
          chatData: {
            myChatID: props.FriendData.myChatID,
            friendChatID: props.FriendData.friendChatID,
            myID: props.FriendData.myID,
            friendID: props.FriendData.friendID,
            bookID: props.FriendData.bookID,
            isMyTextBook: props.isMyTextBook,
            productName: props.FriendData.productName,
            ...props.FriendData,
          },
        })
      }
    >
      <Ionicons name="person-circle-outline" size={50} color="orange" />
      <View className="flex-grow">
        <Text className="text-xl">
          {props.FriendData.productName
            ? props.FriendData.productName
            : "error"}
        </Text>
        <Text>
          {unreadMessagesJSON &&
            unreadMessagesJSON.hasOwnProperty(roomID) &&
            unreadMessagesJSON[roomID] &&
            unreadMessagesJSON[roomID].length !== 0 &&
            unreadMessagesJSON[roomID][unreadMessagesJSON[roomID].length - 1]
              .message}
        </Text>
      </View>
      {unreadMessagesJSON &&
        unreadMessagesJSON.hasOwnProperty(roomID) &&
        unreadMessagesJSON[roomID] &&
        unreadMessagesJSON[roomID].length != 0 && (
          <View
            style={{ backgroundColor: "orange", borderRadius: 10 }}
            className="bg-[#30CB89] rounded-xl"
          >
            <Text
              style={{
                fontSize: 20,
                color: "white",
                width: 10,
                textAlign: "center",
              }}
              className="text-lg color-white w-10 text-center"
            >
              {unreadMessagesJSON[roomID].length}
            </Text>
          </View>
        )}
    </TouchableOpacity>
  );
};

export default TalkFriendListItemContainer;
