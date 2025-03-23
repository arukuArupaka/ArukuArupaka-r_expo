import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../../../../firebase";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/root-stack-param-list";
import { useTimeTable } from "../TimeTableContext";

const FriendSelect = ({
  friendList,
  showMineTimeTable,
  showFriendTimeTable,
  myName,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showDataUser, setShowDataUser] = useState(myName);
  const [isShowFriendList, setIsShowFriendList] = useState(false);
  const { imageUri, userIconImageUri, userSettingContent } = useTimeTable();

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
    navigation.navigate("TimeTableFriendList", {
      friendList: friendList,
      onSelectFriend: onSelectFriend,
      onSelectMine: onSelectMine,
    });
  };
  const onSelectFriend = (userData) => {
    setShowDataUser(userData.userName);
    setIsShowFriendList(false);
    showFriendTimeTable(userData.id);
    navigation.navigate("TimeTable", {
      headerTitle: `${userSettingContent?.schoolYear || "未設定"} ${
        userSettingContent?.semester || "未設定"
      }`,
    });
  };

  const onSelectMine = () => {
    setShowDataUser(myName);
    setIsShowFriendList(false);
    showMineTimeTable();
    navigation.navigate("TimeTable", {
      headerTitle: `${userSettingContent?.schoolYear || "未設定"} ${
        userSettingContent?.semester || "未設定"
      }`,
    });
  };

  useEffect(() => {
    console.log("imageUri:", userIconImageUri);
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        margin: 10,
        borderRadius: 100,
        display: "flex",
      }}
    >
      <TouchableOpacity
        onPress={selectFriend}
        style={{
          height: 40,
          backgroundColor: "white",
          paddingHorizontal: 10,
          flexDirection: "row",
          borderRadius: 100,
          display: "flex",
          alignItems: "center",
        }}
      >
        {!!userIconImageUri ? (
          <Image
            source={{ uri: userIconImageUri }}
            style={{ width: 30, height: 30, borderRadius: 25, marginRight: 5 }}
          />
        ) : (
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 25,
              marginRight: 5,
              backgroundColor: "#c0c0c0",
            }}
          ></View>
        )}
        <Text
          style={{
            fontSize: 18,
            marginVertical: "auto",
            fontWeight: "600",
          }}
        >
          {/* My時間割 */}
          {showDataUser}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FriendSelect;
