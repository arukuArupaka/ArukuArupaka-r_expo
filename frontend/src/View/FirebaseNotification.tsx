import React, { FC } from "react";
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

type Props = {
  firebaseNotificationList: any[];
};

const FirebaseNotificationList = ({ route }) => {
  const { firebaseNotificationList } = route.params;
  const windowWidth = Dimensions.get("window").width;

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
                {`${notification.name}さんからフレンド申請が届きました`}
              </Text>
              {/* <Text style={styles.textDesign}>{notification.classRoom}</Text>
              <Text style={styles.textDesign}>
                授業開始{notification.notificationTime}分前に通知
              </Text> */}
            </View>
            <TouchableOpacity
              style={styles.stopNotifyButton}
              //   onPress={() => stopNotificationDialog(notification.num)}
            >
              <MaterialCommunityIcons name="cancel" size={24} color="red" />
            </TouchableOpacity>
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
