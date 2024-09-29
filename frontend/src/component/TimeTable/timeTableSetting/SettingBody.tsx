import React, { useEffect } from "react";
import { View, Text, Switch, StyleSheet, Dimensions } from "react-native";
import { UserSettingContent } from "../types/user-setting-content";
import { useTimeTable } from "../TimeTableContext";
import DepartmentSelect from "./components/DepartmentSelect";
import SemesterSelect from "./components/SemesterSelect";
import DisplayCountSelect from "./components/DisplayCountSelect";
import { AsyncFunctions } from "../classObject/async-functions";

const windowWidth = Dimensions.get("window").width;
const SettingBody = () => {
  const { userSettingContent, setUserSettingContent } = useTimeTable();

  const saveUserSettingContent = async () => {
    await AsyncFunctions.saveData<UserSettingContent>(
      "@userSettingContent",
      userSettingContent
    );
  };

  const toggleSwitchAction = (switchName: string) => {
    if (switchName === "units") {
      setUserSettingContent((data: UserSettingContent) => ({
        ...data,
        colorByUnits: !data.colorByUnits,
        colorBySubject: !data.colorByUnits ? false : data.colorBySubject,
      }));
    } else if (switchName === "subjects") {
      setUserSettingContent((data: UserSettingContent) => ({
        ...data,
        colorBySubject: !data.colorBySubject,
        colorByUnits: !data.colorBySubject ? false : data.colorByUnits,
      }));
    }
  };

  useEffect(() => {
    saveUserSettingContent();
  }, [userSettingContent]);

  return (
    <View style={styles.body}>
      <View style={styles.bodyContent}>
        <DepartmentSelect />
        <SemesterSelect />
        <DisplayCountSelect />
        <View style={styles.toggleContainer}>
          <Text style={styles.textType}>単位数ごとに自動で色分け</Text>
          <View style={styles.toggleSwitchContainer}>
            <Switch
              onValueChange={() => toggleSwitchAction("units")}
              value={userSettingContent.colorByUnits}
            />
          </View>
        </View>
        <View style={styles.toggleContainer}>
          <Text style={styles.textType}>科目の種類ごとに自動で色分け</Text>
          <View style={styles.toggleSwitchContainer}>
            <Switch
              onValueChange={() => toggleSwitchAction("subjects")}
              value={userSettingContent.colorBySubject}
            />
          </View>
        </View>
        <View style={styles.totalUnitsContainer}>
          <Text style={styles.textType}>合計単位数</Text>
          <View style={styles.totalUnitsValueContainer}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {userSettingContent.totalUnits}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default SettingBody;

const styles = StyleSheet.create({
  body: {
    flex: 8,
    marginTop: 20,
    alignItems: "center",
    width: windowWidth,
  },
  bodyContent: {
    width: "90%",
    height: "90%",
  },
  toggleContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  toggleSwitchContainer: {
    width: "35%",
    justifyContent: "center",
  },
  totalUnitsContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  totalUnitsValueContainer: {
    width: "30%",
  },
  textType: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
