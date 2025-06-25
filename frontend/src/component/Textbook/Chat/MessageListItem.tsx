import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

const MessageListItem = (props) => {
  const [isMyMessage, setIsMyMessage] = useState<boolean>();

  useEffect(() => {
    if (!props.messageObject.id || !props.myID) return;
    setIsMyMessage(props.messageObject.sendUser === props.myID);
  }, [props.messageObject.sendUser, props.myID]);

  // 改行のやつ、15文字で設定してます。
  const insertLineBreaks = (text: string, interval: number) => {
    const regex = new RegExp(`.{1,${interval}}`, "g"); // 文字列
    return text.match(regex)?.join("\n") ?? text;
  };

  return (
    <View
      style={{
        height: "auto",
        flexDirection: isMyMessage ? "row-reverse" : "row",
        paddingVertical: 4,
      }}
    >
      <View
        style={{
          backgroundColor: isMyMessage ? "orange" : "gray",
          justifyContent: "center",
          borderRadius: 10,
          paddingHorizontal: 10,
          maxWidth: "70%", // 長文が画面幅を超えないように制限
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: isMyMessage ? "white" : "black",
            lineHeight: 24,
          }}
        >
          {insertLineBreaks(props.messageObject.message, 15)}
        </Text>
      </View>
    </View>
  );
};

export default MessageListItem;
