import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import TimeTableFriendListItem from "./TimeTableFriendListItem";
import { auth } from "../../../../firebase";
import { useNavigation } from "@react-navigation/native";

const FriendSelect = ({
  friendList,
  showMineTimeTable,
  showFriendTimeTable,
  myName,
}) => {
  const navigation = useNavigation();
  const [showDataUser, setShowDataUser] = useState(myName + "の時間割");
  const [isShowFriendList, setIsShowFriendList] = useState(false);
  const showNonFriendDialog = () => {
    Alert.alert(
      "友達がいません",
      "愛と勇気だけが友達ですか？\n友達を追加してください",
      [
        {
          text: "OK",
        },
      ]
    );
  };

  const selectFriend = () => {
    if (!auth.currentUser) {
      Alert.alert(
        "ログインしてください",
        "この機能を使用するにはログインが必要です",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("login"),
          },
        ]
      );
      return;
    }
    if (friendList.length === 0) {
      showNonFriendDialog();
      return;
    }
    setIsShowFriendList(!isShowFriendList);
  };
  const onSelectFriend = (userData) => {
    setShowDataUser(userData.userName + "の時間割");
    setIsShowFriendList(false);
    showFriendTimeTable(userData.id);
  };

  const onSelectMine = () => {
    setShowDataUser(myName + "の時間割");
    setIsShowFriendList(false);
    showMineTimeTable();
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
          {/* My時間割 */}
          {showDataUser}
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
        <View
          style={{
            display: isShowFriendList ? "flex" : "none", // 表示・非表示を切り替え
            position: "absolute",
            backgroundColor: "white",
            width: "100%",
            maxHeight: 420,
            zIndex: 1000,
          }}
        >
          <ScrollView
            style={
              {
                // display: isShowFriendList ? "flex" : "none", // 表示・非表示を切り替え
                // position: "absolute",
                // backgroundColor: "white",
                // width: "100%",
                // maxHeight: 420,
                // zIndex: 10,
              }
            }
          >
            <TouchableOpacity
              onPress={onSelectMine}
              style={{ flexDirection: "row", gap: 10, padding: 10 }}
            >
              <Text style={{ fontSize: 25 }}>{myName}の時間割</Text>
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
    </View>
  );
};

export default FriendSelect;
