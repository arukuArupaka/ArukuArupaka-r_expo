import { RouteProp } from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootStackParamList } from "../../component/TimeTable/types/root-stack-param-list";
import SetClassPeriodModal from "../../component/TimeTable/common/SetClassPeriodModal";
import { ClassDataFetcher } from "../../component/TimeTable/classObject/TimeTableClassObject";
import { ClassPeriod } from "../../component/TimeTable/types/class-period";
import SearchBoxPressButton from "../../component/TimeTable/classPeriodOptions/SearchBoxPressButton";
import ChoosenWeekOfTheDayAndPeriod from "../../component/TimeTable/classPeriodOptions/ChoosenWeekOfTheDayAndPeriod";
import ClassPeriodOptionsBody from "../../component/TimeTable/classPeriodOptions/ClassPeriodOptionsBody";
import ClassPeriodSearchScreen from "../../component/TimeTable/classPeriodOptions/ClassPeriodSearchScreen";
import { useTimeTable } from "../../component/TimeTable/TimeTableContext";
import { ConvertMethods } from "../../component/TimeTable/classObject/convert-methods";

type ClassPeriodOptionsScreenRouteProp = RouteProp<
  RootStackParamList,
  "ClassPeriodOptions"
>;

const ClassPeriodOptions: FC<{ route: ClassPeriodOptionsScreenRouteProp }> = ({
  route,
}) => {
  const { weekOfTheDay, period } = route.params;
  const { userSettingContent } = useTimeTable();
  const [classPeriodOptions, setClassPeriodOptions] = useState<
    ClassPeriod[] | string
  >(undefined);
  const [isModalShow, setIsModalShow] = useState(false);
  const [isShowSearchScreen, setIsShowSearchScreen] = useState(false);
  const [selectedData, setSelectedData] = useState<ClassPeriod | null>(null); // 選択されたデータのステート

  const classFetcher = new ClassDataFetcher({
    department: userSettingContent.department,
    weekOfTheDay: ConvertMethods.convertNumberToWeekOfTheDay(weekOfTheDay),
    period: period,
    season: userSettingContent.semester,
  });

  const stringWeekOfTheDay =
    ConvertMethods.convertNumberToWeekOfTheDay(weekOfTheDay);

  // バックエンドデータベースに非同期で問い合わせる
  const fetchClassPeriodOptions = async () => {
    const data = await classFetcher.fetchClassDatas();
    setClassPeriodOptions(data);
  };

  useEffect(() => {
    fetchClassPeriodOptions();
  }, []);

  const openModal = (data?: ClassPeriod) => {
    setSelectedData(data);
    setIsModalShow(true);
  };

  const switchSearchScreen = (isShow: boolean) => {
    setIsShowSearchScreen(isShow);
  };

  return (
    <View style={{ flex: 1 }}>
      {!isShowSearchScreen ? (
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
          }}
        >
          <View style={styles.header}>
            <View style={styles.searchBoxContainer}>
              <SearchBoxPressButton onOpen={() => switchSearchScreen(true)} />
              <ChoosenWeekOfTheDayAndPeriod
                stringWeekOfTheDay={stringWeekOfTheDay}
                period={period}
              />
            </View>
          </View>
          <ClassPeriodOptionsBody
            classPeriodOptions={classPeriodOptions}
            onPress={openModal}
          />
          <SetClassPeriodModal
            from={"classPeriodOptions"}
            isShow={isModalShow}
            onClose={() => setIsModalShow(false)}
            data={selectedData}
          />
        </View>
      ) : (
        <ClassPeriodSearchScreen
          onClose={() => switchSearchScreen(false)}
          classPeriodOptions={
            typeof classPeriodOptions === "string" ? [] : classPeriodOptions
          }
        />
      )}
    </View>
  );
};
export default ClassPeriodOptions;

const styles = StyleSheet.create({
  header: {
    height: "20%",
    justifyContent: "center",
    width: "100%",
  },
  searchBoxContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    marginTop: 20,
  },
});
