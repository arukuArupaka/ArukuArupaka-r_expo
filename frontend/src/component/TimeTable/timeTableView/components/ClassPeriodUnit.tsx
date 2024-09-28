import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  DimensionValue,
} from "react-native";
import { FC } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTimeTable } from "../../TimeTableContext";
import { RootStackParamList } from "../../types/root-stack-param-list";
import { ClassPeriod } from "../../types/class-period";
import {
  ClassDataFetcher,
  DataChangeMethods,
} from "../../classObject/TimeTableClassObject";

type Props = {
  weekOfTheDay: number;
  period: number;
};

const ClassPeriodUnit: FC<Props> = ({ weekOfTheDay, period }) => {
  const { userSettingContent, userClassPeriodDatas } = useTimeTable();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const findInUserClassPeriodData: ClassPeriod = userClassPeriodDatas.find(
    (data: ClassPeriod) =>
      data.weekOfTheDay ===
        ClassDataFetcher.convertNumberToWeekOfTheDay(weekOfTheDay) &&
      data.period === period &&
      data.department === userSettingContent.department &&
      data.season === userSettingContent.semester
  );

  const classPeriodIndex = userClassPeriodDatas.indexOf(
    findInUserClassPeriodData
  );

  return (
    <View
      key={weekOfTheDay}
      style={{ flex: 0.5, width: "100%", marginTop: 2.5 }}
    >
      <TouchableOpacity
        style={{
          margin: 2,
          height: "100%",
          borderRadius: 10,
          backgroundColor: DataChangeMethods.classPeriodBackColor(
            "entire",
            userSettingContent,
            userClassPeriodDatas,
            classPeriodIndex
          ),
          alignItems: "center",
        }}
        onPress={() => {
          !findInUserClassPeriodData
            ? navigation.navigate("ClassPeriodOptions", {
                weekOfTheDay,
                period,
              })
            : navigation.navigate("ClassPeriodDetail", {
                classPeriodData: findInUserClassPeriodData,
              });
        }}
      >
        {findInUserClassPeriodData && (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-around",
              height: "100%",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 11,
                width: "90%",
                marginTop: 3,
                color: DataChangeMethods.classPeriodBackColor(
                  "text",
                  userSettingContent,
                  userClassPeriodDatas,
                  classPeriodIndex
                ),
              }}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {findInUserClassPeriodData.className}
            </Text>
            <View
              style={{
                borderRadius: 10,
                width: "90%",
                backgroundColor: DataChangeMethods.classPeriodBackColor(
                  "classRoom",
                  userSettingContent,
                  userClassPeriodDatas,
                  classPeriodIndex
                ),
                alignItems: "center",
                marginBottom: 3,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 9,
                  width: "85%",
                  marginTop: 3,
                  padding: "5%",
                  color: "white",
                }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {findInUserClassPeriodData.classRoom}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ClassPeriodUnit;

const styles = StyleSheet.create({
  classPeriodContainer: {
    width: "100%",
    marginTop: 2.5,
  },
  classPeriod: {
    margin: 2,
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#d3d3d3",
    alignItems: "center",
  },
});
