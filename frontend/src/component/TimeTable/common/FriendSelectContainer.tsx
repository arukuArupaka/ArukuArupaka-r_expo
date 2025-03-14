import { View, Text, Alert } from "react-native";
import React, { useEffect } from "react";
import FriendSelect from "./FriendSelect";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useTimeTable } from "../TimeTableContext";

const FriendSelectContainer = () => {
  const { setFriendsClassPeriodData } = useTimeTable();

  const friendList = useSelector(
    (state: any) => state.user.userObject.friendList || []
  );
  const myName = useSelector(
    (state: any) => state.user.userObject.userName || "自分"
  );
  const showFriendTimeTable = async (id: string) => {
    try {
      const docRef = await getDoc(doc(db, "UserClassPeriodsData", id));
      if (docRef.exists()) {
        const data = docRef
          .data()
          .classPeriods.filter(
            (obj) =>
              obj.department === docRef.data().department &&
              obj.season === docRef.data().semester &&
              obj.year === (docRef.data().schoolYear ?? "2025")
          );
        setFriendsClassPeriodData(data);
        return;
      } else {
        Alert.alert(
          "友達の時間割がありません",
          "友達の時間割が登録されていません",
          [
            {
              text: "OK",
            },
          ]
        );
      }
    } catch (e) {
      Alert.alert("エラー", "権限がありません");
      console.log(e);
    }
  };

  const showMineTimeTable = () => {
    setFriendsClassPeriodData([]);
  };

  useEffect(() => {
    return () => {
      setFriendsClassPeriodData({});
    };
  }, []);

  return (
    <FriendSelect
      friendList={friendList}
      showFriendTimeTable={showFriendTimeTable}
      showMineTimeTable={showMineTimeTable}
      myName={myName}
    />
  );
};

export default FriendSelectContainer;
