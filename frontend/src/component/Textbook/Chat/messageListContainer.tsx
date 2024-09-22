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
  const { setUnreadMessagesJSON, unreadMessagesJSON } = useTimeTable();

  useImperativeHandle(ref, () => ({
    sendMessage: (messageObject) => {
      console.log("Child function called");
      console.log(messageObject);
      setDisplayMessageArray((prevMessages) => {
        // まず、prevMessages と messageObject を結合
        const combinedArray = [...prevMessages, messageObject];

        // Setを使ってIDの重複を排除
        const seen = new Set();
        const uniqueArray = combinedArray.filter((item) => {
          const duplicate = seen.has(item.id);
          seen.add(item.id);
          return !duplicate;
        });

        // sendAt でソート
        return uniqueArray.sort(
          (a, b) =>
            new Date(sortSitingTime(a.sendAt)) -
            new Date(sortSitingTime(b.sendAt))
        );
      });
    },
  }));

  useEffect(() => {});

  useEffect(() => {
    const refreshChatMessages = async () => {
      const unreadMessagesJSONconcatArray = unreadMessagesJSON[props.roomID];

      // const storedMessages = await AsyncStorage.getItem(
      //   `chatMessages_${props.roomID}`
      // );

      const retryCount = 3;
      const retryDelay = 500; // 500ms

      let storedMessages = null;

      for (let i = 0; i < retryCount; i++) {
        console.log(props.roomID);
        storedMessages = await AsyncStorage.getItem(
          `chatMessages_${props.roomID}`
        );
        if (storedMessages) break;
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }

      console.log(48, storedMessages);

      if (!unreadMessagesJSONconcatArray) {
        if (displayMessageArray.length === 0) {
          console.log(38, storedMessages);
          if (await !storedMessages) return;
          setDisplayMessageArray((prev) => [
            ...prev,
            ...JSON.parse(storedMessages),
          ]);
          return;
        }

        return;
      }

      if (displayMessageArray.length === 0) {
        if (!storedMessages) {
          setDisplayMessageArray((prev) => {
            // まずは既存の配列（prev）と新しいメッセージ配列（unreadMessagesJSONconcatArray）を結合
            const combinedArray = [...prev, ...unreadMessagesJSONconcatArray];

            // Setを使ってIDの重複を排除
            const seen = new Set();
            const uniqueArray = combinedArray.filter((item) => {
              const duplicate = seen.has(item.id);
              seen.add(item.id);
              return !duplicate;
            });

            // sendAtでソート
            return uniqueArray.sort(
              (a, b) =>
                new Date(sortSitingTime(a.sendAt)) -
                new Date(sortSitingTime(b.sendAt))
            );
          });

          return;
        }
        console.log(62, storedMessages);
        setDisplayMessageArray((prev) => {
          // storedMessagesをJSONとしてパースし、配列にする
          const parsedStoredMessages = JSON.parse(storedMessages);

          // 既存の配列（prev）、パースしたstoredMessages、unreadMessagesJSONconcatArrayを結合
          const combinedArray = [
            ...prev,
            ...parsedStoredMessages,
            ...unreadMessagesJSONconcatArray,
          ];

          // Setを使ってIDの重複を排除
          const seen = new Set();
          const uniqueArray = combinedArray.filter((item) => {
            const duplicate = seen.has(item.id);
            seen.add(item.id);
            return !duplicate;
          });

          // sendAtでソート
          return uniqueArray.sort(
            (a, b) =>
              new Date(sortSitingTime(a.sendAt)) -
              new Date(sortSitingTime(b.sendAt))
          );
        });
      } else {
        setDisplayMessageArray((prevMessages) => {
          // まず、prevMessages と unreadMessagesJSONconcatArray を結合
          const combinedArray = [
            ...prevMessages,
            ...unreadMessagesJSONconcatArray,
          ];

          // Setを使ってIDの重複を排除
          const seen = new Set();
          const uniqueArray = combinedArray.filter((item) => {
            const duplicate = seen.has(item.id);
            seen.add(item.id);
            return !duplicate;
          });

          // sendAt でソート
          return uniqueArray.sort(
            (a, b) =>
              new Date(sortSitingTime(a.sendAt)) -
              new Date(sortSitingTime(b.sendAt))
          );
        });
      }

      const newUnreadMessagesJSON = { ...unreadMessagesJSON };
      delete newUnreadMessagesJSON[props.roomID];
      console.log(151, newUnreadMessagesJSON);
      setUnreadMessagesJSON(newUnreadMessagesJSON);
    };

    refreshChatMessages();
  }, [unreadMessagesJSON, props.roomID]);

  useEffect(() => {
    const refreshChatMessages = async () => {
      if (!props.roomID || displayMessageArray.length === 0) return;

      try {
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

  const sortSitingTime = (time) => {
    if (typeof time === "object") {
      const { seconds, nanoseconds } = time;
      // タイムスタンプをミリ秒に変換 (秒 + ナノ秒の一部をミリ秒に変換)
      const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
      // Dateオブジェクトを作成 (UTC時間で生成される)
      const date = new Date(milliseconds);
      // 日本時間に変換 (UTCから9時間加算)
      const JSTTime = new Date(date.getTime());
      return JSTTime;
    }
    return time;
  };

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
