import { View, Text, SafeAreaView, ScrollView,KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import MessageListContainer from "../../component/Textbook/Chat/MessageListContainer";
import SendBoxContainer from "../../component/Textbook/Chat/SendBoxContainer";


const ChatView = () => {


  const route = useRoute();
  const [roomID, setRoomID] = useState("");

  const childRef = useRef();


  const SendMessage=async(messageObject)=>{
    console.log(messageObject)
    if (childRef.current) {
      childRef.current.sendMessage(messageObject);
    }
  }

  useEffect(() => {
    let roomGetID;
    const getDate = async () => {
      try {
        if (!route.params.chatData) {
          return;
        }
        if (!route.params.chatData.myID) {
          return;
        }
        console.log(route.params.chatData.friendID);
        const myID = route.params.chatData.myID
        const friendID = route.params.chatData.friendID;

        if (myID.toLowerCase() < friendID.toLowerCase()) {
          roomGetID = myID + friendID;
          setRoomID(roomGetID);
        }
        if (myID.toLowerCase() >= friendID.toLowerCase()) {
          roomGetID = friendID + myID;
          setRoomID(roomGetID);
        }
        console.log(49)

        // const docRef = doc(db, "chat", roomGetID);
        // const docSnap = await getDoc(docRef);
        // console.log(53)

        // if (!docSnap.exists()) {
        //   return;
        // }
      } catch (e) {
        console.log(e);
      }
    };
    getDate();
  }, [route.params.chatData]);

  return (
    <View
     style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <MessageListContainer ref={childRef} myID={route.params.chatData.myID} roomID={roomID} friend={route.params.chatData.friendID}/>
          </ScrollView>
        </View>
        <SendBoxContainer roomID={roomID} friend={route.params.chatData.friendID} myID={route.params.chatData.myID} SendMessage={(messageObject)=>SendMessage(messageObject)}/>
      </SafeAreaView>
    </View>
  );
};

export default ChatView;
