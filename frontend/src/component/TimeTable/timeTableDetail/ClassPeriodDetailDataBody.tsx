import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FC } from "react";
import { ClassPeriod } from "../types/class-period";
import { useTimeTable } from "../TimeTableContext";
import { ColorSettingMethods } from "../classObject/color-setting-methods";
import ClassPeriodDetailDataBodyItem from "./components/ClassPeriodDetailDetailBodyItem";

type Props = {
  onPress: () => void;
  isFriends: boolean;
  currentClassPeriodData: ClassPeriod;
};

const ClassPeriodDetailDataBody: FC<Props> = ({
  onPress,
  currentClassPeriodData,
  isFriends,
}) => {
  const { userClassPeriodData, userSettingContent } = useTimeTable();
  const selectedClassPeriod: ClassPeriod = userClassPeriodData.find(
    (el: ClassPeriod) =>
      el.department === currentClassPeriodData.department &&
      el.season === currentClassPeriodData.season &&
      el.weekOfTheDay === currentClassPeriodData.weekOfTheDay &&
      el.period === currentClassPeriodData.period
  );
  const classPeriodIndex = userClassPeriodData.indexOf(selectedClassPeriod);
  return (
    <View style={styles.classPeriodDetailBody}>
      <View style={styles.classPeriodNumAndEditContainer}>
        <View
          style={{
            padding: 5,
            backgroundColor: ColorSettingMethods.classPeriodBackColor(
              "classNumber",
              userSettingContent,
              userClassPeriodData,
              classPeriodIndex
            ),
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
        {!isFriends && (<TouchableOpacity style={styles.classPeriodEdit} onPress={onPress}>
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>)
          }
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
