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
import { AsyncFunctions } from "../../component/TimeTable/classObject/TimeTableClassObject";
import ClassPeriodDetailDataItem from "../../component/TimeTable/timeTableDetail/component/ClassPeriodDetailDatalBodyItem";
import ActionButton from "../../component/TimeTable/timeTableDetail/ActionButton";
import ClassPeriodDetailDataBody from "../../component/TimeTable/timeTableDetail/ClassPeriodDetailDataBody";
import WebView from "react-native-webview";

type ClassPeriodDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "ClassPeriodDetail"
>;

const ClassPeriodDetail: FC<{ route: ClassPeriodDetailScreenRouteProp }> = ({
  route,
}) => {
  const { userClassPeriodDatas, setUserClassPeriodDatas } = useTimeTable();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { classPeriodData } = route.params;
  const [isModalShow, setIsModalShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentClassPeriodData, setCurrentClassPeriodData] =
    useState(classPeriodData); // 変更後のデータを保持する状態

  // モーダルから変更後のデータを受け取る関数
  const handleUpdateClassPeriodData = (updatedData: ClassPeriod) => {
    setCurrentClassPeriodData(updatedData); // 変更を反映
  };

  const deleteUserClassPeriod = async (data: ClassPeriod) => {
    setUserClassPeriodDatas((prev: ClassPeriod[]) => {
      const deletePrevData: ClassPeriod[] = prev.filter(
        (el) => el.num !== data.num
      );
      return deletePrevData;
    });
    const updatedClassPeriods = userClassPeriodDatas.filter(
      (el) => el.num !== data.num
    );
    await AsyncFunctions.saveClassPeriodDatas(
      "@classPeriods",
      updatedClassPeriods
    );
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
            navigation.navigate("TimeTable");
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
          <Text
            style={{
              fontWeight: "bold",
              color: "black",
              fontSize: 25,
              paddingVertical: 15,
            }}
          >
            {currentClassPeriodData.weekOfTheDay}曜
            {currentClassPeriodData.period}限
          </Text>
          <ClassPeriodDetailDataBody
            onPress={() => setIsModalShow(true)}
            currentClassPeriodData={currentClassPeriodData}
          />
          <ActionButton
            onPress={() => setIsVisible(true)}
            color={"black"}
            label={"シラバスにアクセスする"}
          />
          <ActionButton
            onPress={() => deleteClassPeriodDialog(currentClassPeriodData)}
            color={"red"}
            label={"削除する"}
          />
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
