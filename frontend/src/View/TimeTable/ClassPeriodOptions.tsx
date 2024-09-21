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

type ClassPeriodOptionsScreenRouteProp = RouteProp<
  RootStackParamList,
  "ClassPeriodOptions"
>;

const ClassPeriodOptions: FC<{ route: ClassPeriodOptionsScreenRouteProp }> = ({
  route,
}) => {
  const { weekOfTheDay, period } = route.params;
  const [classPeriodOptions, setClassPeriodOptions] = useState<
    ClassPeriod[] | undefined | string
  >(undefined);
  const [isModalShow, setIsModalShow] = useState(false);
  const [selectedData, setSelectedData] = useState<ClassPeriod | null>(null); // 選択されたデータのステート

  const classFetcher = new ClassDataFetcher({
    department: "理工学部",
    weekOfTheDay: ClassDataFetcher.convertNumberToWeekOfTheDay(weekOfTheDay),
    period: period,
    season: "秋セメスター",
  });

  const stringWeekOfTheDay =
    ClassDataFetcher.convertNumberToWeekOfTheDay(weekOfTheDay);

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

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "column",
          flex: 1,
          alignItems: "center",
        }}
      >
        <View style={styles.header}>
          <View style={styles.searchBoxContainer}>
            <SearchBoxPressButton />
            <ChoosenWeekOfTheDayAndPeriod
              stringWeekOfTheDay={stringWeekOfTheDay}
              period={period}
            />
          </View>
        </View>
        <ClassPeriodOptionsBody
          classPeriodOptions={classPeriodOptions}
          onPress={openModal} // 修正：関数そのものを渡す
        />
        <SetClassPeriodModal
          from={"classPeriodOptions"}
          isShow={isModalShow}
          onClose={() => setIsModalShow(false)}
          data={selectedData} // 選択されたデータをモーダルに渡す
        />
      </View>
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
