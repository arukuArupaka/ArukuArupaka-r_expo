import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import TimeTableFriendListItem from "./TimeTableFriendListItem";

const FriendSelect = ({ friendList,showMineTimeTable,showFriendTimeTable }) => {
  const [showDataUser, setShowDataUser] = useState("自分");
  const [isShowFriendList, setIsShowFriendList] = useState(false);
  const showNonFriendDialog = () => {
    Alert.alert("友達がいません", "友達を追加してください", [
      {
        text: "OK",
      },
    ]);
  };

  const selectFriend = () => {
    if (friendList.length === 0) {
      showNonFriendDialog();
      return
    }
    setIsShowFriendList(!isShowFriendList);
  };
  const onSelectFriend = (userData) => {
    setShowDataUser(userData.userName);
    setIsShowFriendList(false);
    showFriendTimeTable(userData.id);
  };

  const onSelectMine = () => {
    setShowDataUser("自分");
    setIsShowFriendList(false);
    showMineTimeTable()
  };

  return (
    <View>
      <TouchableOpacity
        onPress={selectFriend}
        style={{
          height: 40,
          backgroundColor: "white",
          paddingHorizontal: 10,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            marginVertical: "auto",
            fontWeight: "600",
            flex: 1,
          }}
        >
          {showDataUser}の時間割を表示
        </Text>
        <AntDesign
          name="caretdown"
          size={24}
          color="black"
          style={{
            marginVertical: "auto",
            transform: [{ rotate: !isShowFriendList ? "0deg" : "180deg" }],
          }}
        />
      </TouchableOpacity>
      <View>
        <ScrollView
          style={{
            display: isShowFriendList ? "flex" : "none", // 表示・非表示を切り替え
            position: "absolute",
            backgroundColor: "white",
            width: "100%",
            maxHeight: 420,
            zIndex: 10,
          }}
        >
          <TouchableOpacity
            onPress={onSelectMine}
            style={{ flexDirection: "row", gap: 10, padding: 10 }}
          >
            <Text style={{ fontSize: 25 }}>自分の時間割を表示</Text>
          </TouchableOpacity>
          {friendList.map((friendID: any, key) => {
            return (
              <TimeTableFriendListItem
                key={key}
                id={friendID}
                onSelect={onSelectFriend}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default FriendSelect;
