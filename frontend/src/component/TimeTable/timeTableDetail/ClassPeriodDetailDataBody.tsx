import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ClassPeriodDetailDataBodyItem from "./components/ClassPeriodDetailDatalBodyItem";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FC } from "react";
import { ClassPeriod } from "../types/class-period";
import { useTimeTable } from "../TimeTableContext";

type Props = {
  onPress: () => void;
  currentClassPeriodData: ClassPeriod;
};

const ClassPeriodDetailDataBody: FC<Props> = ({
  onPress,
  currentClassPeriodData,
}) => {
  const { userClassPeriodDatas } = useTimeTable();
  const selectedClassPeriod: ClassPeriod = userClassPeriodDatas.find(
    (el: ClassPeriod) =>
      el.department === currentClassPeriodData.department &&
      el.season === currentClassPeriodData.season &&
      el.weekOfTheDay === currentClassPeriodData.weekOfTheDay &&
      el.period === currentClassPeriodData.period
  );
  const classPeriodIndex = userClassPeriodDatas.indexOf(selectedClassPeriod);
  return (
    <View style={styles.classPeriodDetailBody}>
      <View style={styles.classPeriodNumAndEditContainer}>
        <View
          style={{
            padding: 5,
            backgroundColor: userClassPeriodDatas[classPeriodIndex].color
              ? userClassPeriodDatas[classPeriodIndex].color
              : "red",
            borderRadius: 10,
            margin: 10,
            width: "18%",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            {currentClassPeriodData.num}
          </Text>
        </View>
        <TouchableOpacity style={styles.classPeriodEdit} onPress={onPress}>
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.classPeriodDataContainer}>
        <Text style={{ fontWeight: "bold", color: "black", fontSize: 25 }}>
          {currentClassPeriodData.className}
        </Text>
      </View>
      <ClassPeriodDetailDataBodyItem value={currentClassPeriodData.classRoom} />
      <ClassPeriodDetailDataBodyItem value={currentClassPeriodData.teacher} />
      <ClassPeriodDetailDataBodyItem
        value={`単位数：${currentClassPeriodData.unit}`}
      />
      <ClassPeriodDetailDataBodyItem
        value={`科目の種類：${
          currentClassPeriodData.status
            ? currentClassPeriodData.status
            : "情報なし"
        }`}
      />
    </View>
  );
};
export default ClassPeriodDetailDataBody;

const styles = StyleSheet.create({
  classPeriodDetailBody: {
    flexDirection: "column",
    height: "55%",
    backgroundColor: "white",
    width: "95%",
    marginTop: 10,
    borderRadius: 10,
  },
  classPeriodNumAndEditContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  classPeriodEdit: {
    margin: 10,
  },
  classPeriodNumberContainer: {},
  classPeriodDataContainer: {
    width: "100%",
    margin: 10,
  },
});
