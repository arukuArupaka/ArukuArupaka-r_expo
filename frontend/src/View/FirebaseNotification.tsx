import React, { FC, useCallback, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import { ClassPeriod } from "../component/TimeTable/types/class-period";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { AsyncFunctions } from "../component/TimeTable/classObject/async-functions";
import { arrayRemove, arrayUnion, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useTimeTable } from "../component/TimeTable/TimeTableContext";

const FirebaseNotificationList = () => {
  const { firebaseNotificationList, setFirebaseNotificationList } =
    useTimeTable();
  const windowWidth = Dimensions.get("window").width;

  const acceptFriendRequest = async (
    notificationInput: any,
    accept: boolean
  ) => {
    console.log("acceptFriendRequest");
    const notificationListDeepCopy = JSON.parse(
      JSON.stringify(firebaseNotificationList)
    );

    notificationListDeepCopy.map((notification) => {
      if (notification.id === notificationInput.id) {
        notification.isAccepted = true;
      }
    });
    setFirebaseNotificationList(notificationListDeepCopy);
    AsyncFunctions.saveData(
      "@firebaseNotificationList",
      notificationListDeepCopy
    );

    const docRef = doc(db, "users", `${auth.currentUser.uid}`);

    await setDoc(
      docRef,
      {
        receivedFriendRequests: arrayRemove(notificationInput),
      },
      { merge: true }
    );

    // フレンド申請を拒否した場合
    if (!accept) {
      return;
    }

    await setDoc(
      docRef,
      {
        friendList: arrayUnion(notificationInput.id),
      },
      { merge: true }
    );

    const targetDocRef = doc(db, "users", notificationInput.id);
    await setDoc(
      targetDocRef,
      {
        friendList: arrayUnion(auth.currentUser.uid),
        receivedFriendRequests: [],
      },
      { merge: true }
    );
  };

  const formatDate = useCallback((isoDate: string): string => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    // 月は0始まりなので+1し、2桁にするために"0"を埋める
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
  }, []);

  return (
    <View
      style={{
        width: windowWidth,
        alignItems: "center",
      }}
    >
      <ScrollView style={{ width: "90%" }}>
        {firebaseNotificationList.map((notification, index) => (
          <View key={index} style={styles.notificationItem}>
            <View style={styles.itemTexts}>
              <Text
                style={{
                  ...styles.textDesign,
                  fontSize: 19,
                  maxWidth: "90%",
                }}
              >
                {`${notification?.name}さんからフレンド申請が届きました`}
              </Text>
              <Text style={{ marginTop: 5 }}>{`${formatDate(
                notification.requestedAt
              )}`}</Text>
            </View>
            {!notification.isAccepted && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "20%",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={styles.stopNotifyButton}
                  onPress={() => acceptFriendRequest(notification, false)}
                >
                  <Entypo name="cross" size={26} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.stopNotifyButton}
                  onPress={() => acceptFriendRequest(notification, true)}
                >
                  <Entypo name="check" size={26} color="green" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
        {firebaseNotificationList.length === 0 && (
          <View
            style={{
              marginTop: 20,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              通知がありません
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default FirebaseNotificationList;

const styles = StyleSheet.create({
  notificationItem: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  itemTexts: {
    flexDirection: "column",
  },
  textDesign: {
    fontSize: 15,
    fontWeight: "bold",
  },
  stopNotifyButton: {},
});
