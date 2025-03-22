import { FC, useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { ClassPeriod } from "../../component/TimeTable/types/class-period";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../../component/TimeTable/types/root-stack-param-list";
import SetClassPeriodModal from "../../component/TimeTable/common/SetClassPeriodModal";
import { useTimeTable } from "../../component/TimeTable/TimeTableContext";
import ActionButton from "../../component/TimeTable/timeTableDetail/ActionButton";
import ClassPeriodDetailDataBody from "../../component/TimeTable/timeTableDetail/ClassPeriodDetailDataBody";
import WebView from "react-native-webview";
import ColorChange from "../../component/TimeTable/timeTableDetail/ColorChange";
import { NotificationMethods } from "../../component/TimeTable/classObject/notification-methods";
import { AsyncFunctions } from "../../component/TimeTable/classObject/async-functions";

type ClassPeriodDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "ClassPeriodDetail"
>;

const ClassPeriodDetail: FC<{ route: ClassPeriodDetailScreenRouteProp }> = ({
  route,
}) => {
  const { userClassPeriodData, setUserClassPeriodData, userSettingContent } =
    useTimeTable();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { classPeriodData } = route.params;
  const [isModalShow, setIsModalShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentClassPeriodData, setCurrentClassPeriodData] =
    useState<ClassPeriod>(classPeriodData); // 変更後のデータを保持する状態

  // モーダルから変更後のデータを受け取る関数
  const handleUpdateClassPeriodData = (updatedData: ClassPeriod) => {
    setCurrentClassPeriodData(updatedData); // 変更を反映
  };

  const deleteUserClassPeriod = async (data: ClassPeriod) => {
    if (data.isNotify) {
      await NotificationMethods.cancelNotification(
        data.num,
        userClassPeriodData,
        setUserClassPeriodData
      );
    }
    setUserClassPeriodData((prev: ClassPeriod[]) => {
      const deletePrevData: ClassPeriod[] = prev.filter(
        (el) => el.num !== data.num
      );
      return deletePrevData;
    });
    const updatedClassPeriods = userClassPeriodData.filter(
      (el) => el.num !== data.num
    );
    await AsyncFunctions.saveData("@classPeriods", updatedClassPeriods);
  };

  const deleteClassPeriodDialog = async (data: ClassPeriod) => {
    // 画像を削除する前に確認のダイアログを表示
    Alert.alert(
      "この授業を削除しますか？",
      "この操作は取り消せません。",
      [
        {
          text: "キャンセル",
          style: "cancel",
        },
        {
          text: "削除",
          onPress: () => {
            deleteUserClassPeriod(data);
            navigation.navigate("TimeTable", {
              headerTitle: `${userSettingContent?.schoolYear || "未設定"} ${
                userSettingContent?.semester || "未設定"
              }`,
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {!isVisible ? (
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <ClassPeriodDetailDataBody
            onPress={() => setIsModalShow(true)}
            currentClassPeriodData={currentClassPeriodData}
            isFriends={classPeriodData.isFriends}
          />
          {!classPeriodData.isFriends && (
            <ColorChange currentClassPeriodData={currentClassPeriodData} />
          )}
          <ActionButton
            onPress={() => setIsVisible(true)}
            color={"black"}
            label={"シラバスにアクセスする"}
          />
          {!classPeriodData.isFriends && (
            <ActionButton
              onPress={() => deleteClassPeriodDialog(currentClassPeriodData)}
              color={"red"}
              label={"削除する"}
            />
          )}

          <SetClassPeriodModal
            from={"classPeriodDetail"}
            isShow={isModalShow}
            onClose={() => setIsModalShow(false)}
            data={currentClassPeriodData} // 選択されたデータをモーダルに渡す
            onUpdate={handleUpdateClassPeriodData}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <WebView
            source={{ uri: currentClassPeriodData.resume }}
            decelerationRate="normal"
          />
        </View>
      )}
    </View>
  );
};
export default ClassPeriodDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
