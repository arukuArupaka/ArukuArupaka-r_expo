import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FC, useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTimeTable } from "../../TimeTableContext";
import { RootStackParamList } from "../../types/root-stack-param-list";
import { ClassPeriod } from "../../types/class-period";
import { ConvertMethods } from "../../classObject/convert-methods";
import { ColorSettingMethods } from "../../classObject/color-setting-methods";

type Props = {
  weekOfTheDay: number;
  period: number;
};

const ClassPeriodUnit: FC<Props> = ({ weekOfTheDay, period }) => {
  const { userSettingContent, userClassPeriodData, friendsClassPeriodData } =
    useTimeTable();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [classFindInPeriodData, setClassFindInPeriodData] = useState<
    ClassPeriod[]
  >([]);

  useEffect(() => {
    if (Object.keys(friendsClassPeriodData).length !== 0) {
      const data = friendsClassPeriodData.find(
        (data: ClassPeriod) =>
          data.weekOfTheDay ===
            ConvertMethods.convertNumberToWeekOfTheDay(weekOfTheDay) &&
          data.period === period
      );
      setClassFindInPeriodData(data);
    } else {
      const data = userClassPeriodData.find(
        (data: ClassPeriod) =>
          data.weekOfTheDay ===
            ConvertMethods.convertNumberToWeekOfTheDay(weekOfTheDay) &&
          data.period === period &&
          data.department === userSettingContent.department &&
          data.season === userSettingContent.semester
      );
      setClassFindInPeriodData(data);
    }
  }, [userClassPeriodData, friendsClassPeriodData]);

  const findInUserClassPeriodData: ClassPeriod = userClassPeriodData.find(
    (data: ClassPeriod) =>
      data.weekOfTheDay ===
        ConvertMethods.convertNumberToWeekOfTheDay(weekOfTheDay) &&
      data.period === period &&
      data.department === userSettingContent.department &&
      data.season === userSettingContent.semester
  );

  console.log(classFindInPeriodData);

  const classPeriodIndex = userClassPeriodData.indexOf(classFindInPeriodData);

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
          backgroundColor: ColorSettingMethods.classPeriodBackColor(
            "entire",
            userSettingContent,
            userClassPeriodData,
            classPeriodIndex
          ),
          alignItems: "center",
        }}
        onPress={() => {
          !classFindInPeriodData
            ? navigation.navigate("ClassPeriodOptions", {
                weekOfTheDay,
                period,
              })
            : navigation.navigate("ClassPeriodDetail", {
                classPeriodData: {
                  ...classFindInPeriodData,
                  isFriends: Object.keys(friendsClassPeriodData).length !== 0,
                },
              });
        }}
      >
        {classFindInPeriodData && (
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
                color: ColorSettingMethods.classPeriodBackColor(
                  "text",
                  userSettingContent,
                  friendsClassPeriodData || userClassPeriodData,
                  classPeriodIndex
                ),
              }}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {classFindInPeriodData.className}
            </Text>
            <View
              style={{
                borderRadius: 10,
                width: "90%",
                backgroundColor: ColorSettingMethods.classPeriodBackColor(
                  "classRoom",
                  userSettingContent,
                  friendsClassPeriodData || userClassPeriodData,
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
                {classFindInPeriodData.classRoom}
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
