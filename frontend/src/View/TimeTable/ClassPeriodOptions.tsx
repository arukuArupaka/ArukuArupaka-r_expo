import { RouteProp } from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RootStackParamList } from "../../component/TimeTable/types/root-stack-param-list";
import { fetchClassDatas } from "../../component/TimeTable/classPeriodOptions/funtion/fetchClassDatas";
import { ClassPeriodOptionDatas } from "../../component/TimeTable/types/class-period-option-datas";
import { convertNumberToWeekOfTheDay } from "../../component/TimeTable/classPeriodOptions/funtion/convertNumberToWeekOfTheDay";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import ClassPeriodOption from "../../component/TimeTable/classPeriodOptions/ClassPeriodOption";
import NotChoosenDepartmentOrSeason from "../../component/TimeTable/classPeriodOptions/NotChoosenDepartmentOrSeason";
import SetClassPeriodModal from "../../component/TimeTable/classPeriodOptions/SetClassPeriodModal";
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
  const [isModalShow, setIsModalShow] = useState(false);
  const [selectedData, setSelectedData] =
    useState<ClassPeriodOptionDatas | null>(null); // 選択されたデータのステート

  const stringWeekOfTheDay = convertNumberToWeekOfTheDay(weekOfTheDay);

  // バックエンドデータベースに非同期で問い合わせる
  const fetchClassPeriodOptions = async () => {
    const data = await fetchClassDatas({
      department: "理工学部",
      season: "秋セメスター",
      weekOfTheDay: stringWeekOfTheDay,
      period: period,
    });
    setClassPeriodOptions(data);
  };

  useEffect(() => {
    fetchClassPeriodOptions();
  }, []);

  const openModal = (data: ClassPeriodOptionDatas | undefined) => {
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
          <View style={{ flex: 1, marginBottom: 100 }}>
            <View style={styles.multipleSettingSpace}>
              <TouchableOpacity
                style={styles.multipleSettingContainer}
                onPress={() => openModal(undefined)}
              >
                <Text style={{ fontWeight: "bold" }}>手入力で追加</Text>
                <Entypo name="plus" size={24} color="black" />
              </TouchableOpacity>
            </View>
            {Array.isArray(classPeriodOptions) ? (
              classPeriodOptions.length > 0 ? (
                classPeriodOptions.map((data, index) => (
                  <TouchableOpacity
                    onPress={() => openModal(data)} // データをセットしてモーダルを開く
                    key={index}
                  >
                    <ClassPeriodOption data={data} />
                  </TouchableOpacity>
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
                <NotChoosenDepartmentOrSeason />
              )
            )}
          </View>
        </ScrollView>
        <SetClassPeriodModal
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
  multipleSettingSpace: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  multipleSettingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    width: "98%",
    flex: 1,
  },
  noHitsMessage: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
