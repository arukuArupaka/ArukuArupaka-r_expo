import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTimeTable } from "../TimeTableContext";
import { ClassPeriod } from "../types/class-period";
import { FC, useEffect } from "react";
import { AsyncFunctions } from "../classObject/TimeTableClassObject";

type Props = {
  currentClassPeriodData: ClassPeriod;
};

const ColorChange: FC<Props> = ({ currentClassPeriodData }) => {
  const { userClassPeriodDatas, setUserClassPeriodDatas } = useTimeTable();
  const colorOptions = ["#FFB74D", "#4DB6AC", "#64B5F6", "#AED581", "#BA68C8"];
  const selectedClassPeriod: ClassPeriod = userClassPeriodDatas.find(
    (el: ClassPeriod) =>
      el.department === currentClassPeriodData.department &&
      el.season === currentClassPeriodData.season &&
      el.weekOfTheDay === currentClassPeriodData.weekOfTheDay &&
      el.period === currentClassPeriodData.period
  );
  const classPeriodIndex = userClassPeriodDatas.indexOf(selectedClassPeriod);

  const changeUserClassPeriod = async (color: string) => {
    setUserClassPeriodDatas((data) => {
      const newData = [...data];
      newData[classPeriodIndex] = {
        ...newData[classPeriodIndex],
        color,
      };

      AsyncFunctions.saveClassPeriodDatas("@classPeriods", newData);

      return newData;
    });
  };

  return (
    <View style={styles.button}>
      <Text style={styles.label}>色を設定する</Text>
      <View style={styles.colorSettingContainer}>
        {colorOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={{
              height: 25,
              width: 25,
              backgroundColor: `${option}`,
              borderRadius: 5,
            }}
            onPress={() => changeUserClassPeriod(option)}
          ></TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default ColorChange;

const styles = StyleSheet.create({
  button: {
    height: 70,
    marginTop: 5,
    width: "95%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
  },
  colorSettingContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
});
