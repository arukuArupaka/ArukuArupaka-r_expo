import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTimeTable } from "../TimeTableContext";
import { ClassPeriod } from "../types/class-period";
import { useEffect, useState } from "react";
import { NotificationMethods } from "../classObject/notification-methods";
import { AsyncFunctions } from "../classObject/async-functions";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const NotificationList = () => {
  const { userClassPeriodData, setUserClassPeriodData, userSettingContent } =
    useTimeTable();
  const windowWidth = Dimensions.get("window").width;
  const notificationClassPeriod: ClassPeriod[] = userClassPeriodData.filter(
    (el: ClassPeriod) =>
      el.department === userSettingContent.department &&
      el.season === userSettingContent.semester &&
      el.isNotify === true
  );

  const [notificationList, setNotificationList] = useState<ClassPeriod[]>(
    notificationClassPeriod
  );

  useEffect(() => {
    setNotificationList(notificationClassPeriod);
  }, [userClassPeriodData]);

  const stopIsNotify = async (classNumber: string) => {
    let updatedData;

    // ステートを更新
    setUserClassPeriodData((classPeriods: ClassPeriod[]) => {
      const selectedData = classPeriods.find(
        (el: ClassPeriod) => el.num === classNumber
      );

      const deletedClassPeriod = classPeriods.filter(
        (classPeriod: ClassPeriod) => classPeriod.num !== classNumber
      );

      const stopNotifyData = {
        ...selectedData,
        isNotify: false,
        notificationId: null,
      };

      updatedData = [...deletedClassPeriod, stopNotifyData]; // 更新されたデータを取得
      return updatedData;
    });

    try {
      // 更新したステートからデータを保存
      console.log("updatedData", updatedData);
      await AsyncFunctions.saveData("@classPeriods", updatedData);
      await NotificationMethods.cancelNotification(
        classNumber,
        userClassPeriodData,
        setUserClassPeriodData
      );
    } catch (error) {
      console.error("Failed to save or cancel notification:", error);
    }
  };

  const stopNotificationDialog = async (classNumber: string) => {
    // 画像を削除する前に確認のダイアログを表示
    Alert.alert(
      "この通知を停止しますか？",
      "この操作は取り消せません。",
      [
        {
          text: "キャンセル",
          style: "cancel",
        },
        {
          text: "停止",
          onPress: () => {
            stopIsNotify(classNumber);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View
      style={{
        width: windowWidth,
        marginTop: 20,
        flex: 8,
        alignItems: "center",
      }}
    >
      {notificationList.length > 0 ? (
        <ScrollView style={{ width: "90%" }}>
          {notificationList.map((classPeriod: ClassPeriod, index) => (
            <View key={index} style={styles.notificationItem}>
              <View style={styles.itemTexts}>
                <Text
                  style={{
                    ...styles.textDesign,
                    fontSize: 19,
                    maxWidth: "90%",
                  }}
                >
                  {classPeriod.className}
                </Text>
                <Text style={styles.textDesign}>{classPeriod.classRoom}</Text>
                <Text style={styles.textDesign}>
                  授業開始{classPeriod.notificationTime}分前に通知
                </Text>
              </View>
              <TouchableOpacity
                style={styles.stopNotifyButton}
                onPress={() => stopNotificationDialog(classPeriod.num)}
              >
                <MaterialCommunityIcons name="cancel" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            登録している通知がありません
          </Text>
        </View>
      )}
    </View>
  );
};
export default NotificationList;

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
