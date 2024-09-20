import { RouteProp } from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RootStackParamList } from "../../component/TimeTable/interface/root-stack-param-list";
import { fetchClassDatas } from "../../component/TimeTable/timeTableView/funtion/fetchClassDatas";
import { ClassPeriodOptionDatas } from "../../component/TimeTable/interface/class-period-option-datas";
import { convertNumberToWeekOfTheDay } from "../../component/TimeTable/timeTableView/funtion/convertNumberToWeekOfTheDay";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ClassPeriodOption from "../../component/TimeTable/classPeriodOptions/ClassPeriodOption";
type ClassPeriodOptionsScreenRouteProp = RouteProp<
  RootStackParamList,
  "ClassPeriodOptions"
>;

const ClassPeriodOptions: FC<{ route: ClassPeriodOptionsScreenRouteProp }> = ({
  route,
}) => {
  const { weekOfTheDay, period } = route.params;
  const [classPeriodOptions, setClassPeriodOptions] = useState<
    ClassPeriodOptionDatas[] | undefined | string
  >(undefined);

  const stringWeekOfTheDay = convertNumberToWeekOfTheDay(weekOfTheDay);
  // バックエンドデータベースに非同期で問い合わせる
  const fetchClassPeriodOptions = async () => {
    const data = await fetchClassDatas({
      // department: "理工学部",
      season: "秋セメスター",
      weekOfTheDay: stringWeekOfTheDay,
      period: period,
    });
    setClassPeriodOptions(data);
  };
  useEffect(() => {
    fetchClassPeriodOptions();
  }, []);
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
            <TouchableOpacity style={styles.searchBox}>
              <FontAwesome
                name="search"
                size={24}
                color="black"
                style={{ marginLeft: 10 }}
              />
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 5,
                  fontWeight: "bold",
                  color: "gray",
                }}
              >
                どの授業をお探しですか？
              </Text>
            </TouchableOpacity>
            <View style={styles.weekOfDayAndPeriod}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {stringWeekOfTheDay}曜日{period}限目
              </Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.body}>
          {Array.isArray(classPeriodOptions) ? (
            classPeriodOptions.length > 0 ? (
              classPeriodOptions.map((data) => (
                <ClassPeriodOption data={data} />
              ))
            ) : (
              <View style={styles.noHitsMessage}>
                <Text style={{ fontWeight: "bold" }}>
                  当てはまる授業がありません
                </Text>
              </View>
            )
          ) : (
            typeof classPeriodOptions === "string" && (
              <Text>
                学部かセメスターが選択されていません。選択してください。
              </Text>
            )
          )}
        </ScrollView>
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
  searchBox: {
    width: "90%",
    height: "35%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  weekOfDayAndPeriod: {
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
  },
  body: {
    marginBottom: 100,
    width: "98%",
  },
  noHitsMessage: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
