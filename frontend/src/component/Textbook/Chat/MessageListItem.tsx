import { View, Text ,ScrollView} from "react-native";
import React, { useEffect, useState } from "react";

const MessageListItem = (props) => {
  const [isMyMessage, setIsMyMessage] = useState<boolean>();

  useEffect(() => {
    if (!props.messageObject.id || !props.myID) return;
    setIsMyMessage(props.messageObject.sendUser == props.myID);
  },[props.messageObject.sendUser , props.myID]);
  return (
<View
style={{ height:40,flexDirection: isMyMessage ? "row-reverse" : "row" }}
 className={`h-12 ${isMyMessage ? "flex-row-reverse" : "flex-row"}`}>
      {isMyMessage ? (
        <View
        style={{ height:30,backgroundColor:"orange",justifyContent:"center",borderRadius:10,paddingHorizontal:10,flexGrow:0 }}
        className="my-2 h-8 bg-[#30CB89] justify-center rounded-xl px-2 flex-grow-0"
      >
        <Text 
        style={{fontSize:20,color:"white"}}
        className="color-white">{props.messageObject.message}</Text>
      </View>
      ) : (
        <View
        style={{ height:30,backgroundColor:"gray",justifyContent:"center",borderRadius:10,paddingHorizontal:10,flexGrow:0 }}
          className="my-2 h-8 bg-gray-300 justify-center rounded-xl px-2 flex-grow-0"
        >
          <Text className="">{props.messageObject.message}</Text>
        </View>
      )}
    </View>
  );
};

export default MessageListItem;
