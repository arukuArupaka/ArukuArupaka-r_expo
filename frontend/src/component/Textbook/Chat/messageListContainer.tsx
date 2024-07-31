import { View } from "react-native";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import MessageListItem from "./MessageListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTimeTable } from "../../TimeTable/TimeTableContext";

const MessageListContainer = forwardRef((props, ref) => {
  const [displayMessageArray, setDisplayMessageArray] = useState([]);
  const { setUnreadMessageJSON, unreadMessagesJSON } = useTimeTable()


  useImperativeHandle(ref, () => ({
    sendMessage: (messageObject) => {
      console.log("Child function called");
      console.log(messageObject);
      setDisplayMessageArray((prevMessages) =>
        [...prevMessages, ...[messageObject]].sort(
          (a, b) => new Date(a.sendAt) - new Date(b.sendAt)
        )
      );
    },
  }));

  useEffect(() => {
    const refreshChatMessages = async () => {
      const concatArray = unreadMessagesJSON[props.roomID];

      if (!concatArray) {
        if (displayMessageArray.length === 0) {
          const storedMessages = await AsyncStorage.getItem(
            `chatMessages_${props.roomID}`
          );
          if (!storedMessages) return;
          setDisplayMessageArray((prev) => [
            ...prev,
            ...JSON.parse(storedMessages),
          ]);
          return;
        }

        return;
      }

      if (displayMessageArray.length === 0) {
        const storedMessages = await AsyncStorage.getItem(
          `chatMessages_${props.roomID}`
        );
        if (!storedMessages) return;
        setDisplayMessageArray((prev) =>
          [...prev, ...JSON.parse(storedMessages), ...concatArray].sort(
            (a, b) => new Date(a.sendAt) - new Date(b.sendAt)
          )
        );
      } else {
        setDisplayMessageArray((prevMessages) =>
          [...prevMessages, ...concatArray].sort(
            (a, b) => new Date(a.sendAt) - new Date(b.sendAt)
          )
        );
      }

      const newUnreadMessagesJSON = { ...unreadMessagesJSON };
      delete newUnreadMessagesJSON[props.roomID];
      setUnreadMessageJSON(newUnreadMessagesJSON);
    };

    refreshChatMessages();
  }, [unreadMessagesJSON, props.roomID]);

  useEffect(() => {
    const refreshChatMessages = async () => {
      if (!props.roomID||displayMessageArray.length===0) return;

      try {
        // if (displayMessageArray.length === 0 ) {
        //   const storedMessages = await AsyncStorage.getItem(`chatMessages_${props.roomID}`);
        //   if(!storedMessages) return
        //   setDisplayMessageArray((prev)=>[...prev,...JSON.parse(storedMessages)]);
        //   return;
        // }

        await AsyncStorage.setItem(
          `chatMessages_${props.roomID}`,
          JSON.stringify(displayMessageArray)
        );
      } catch (error) {
        console.error("Error accessing AsyncStorage:", error);
      }
    };

    refreshChatMessages();
  }, [displayMessageArray, props.roomID]);

  return (
    <View style={{ flex: 1 }} className="mx-1">
      {displayMessageArray.map((displayMessage, index) => (
        <MessageListItem
          key={index}
          myID={props.myID}
          messageObject={displayMessage}
        />
      ))}
    </View>
  );
});

export default MessageListContainer;
