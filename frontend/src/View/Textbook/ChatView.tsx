import { View, Text, SafeAreaView, ScrollView,KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import MessageListContainer from "../../component/Textbook/Chat/messageListContainer";
import SendBoxContainer from "../../component/Textbook/Chat/SendBoxContainer";
import { useSelector } from "react-redux";


const ChatView = () => {
    const userUUID=useSelector((state:State)=>state.user.userUUID||"") 


  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params.friend;
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
        if (!route.params.friend) {
          return;
        }
        if (!userUUID) {
          return;
        }
        console.log(route.params.friend.userid);
        const myID = userUUID
        const friendID = route.params.friend.userid;

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
  }, [route.params.friend, userUUID]);

  return (
    <View
     style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <MessageListContainer ref={childRef} myID={userUUID} roomID={roomID} friend={route.params.friend.userid}/>
          </ScrollView>
        </View>
        <SendBoxContainer roomID={roomID} friend={route.params.friend.userid} myID={userUUID} SendMessage={(messageObject)=>SendMessage(messageObject)}/>
      </SafeAreaView>
    </View>
  );
};

export default ChatView;
