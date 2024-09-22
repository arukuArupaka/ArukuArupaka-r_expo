import { View, Text } from "react-native";
import faculties from "../../data/faculties";
import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { AsyncFunctions } from "../../component/TimeTable/classObject/TimeTableClassObject";

const TimeTableSetting = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>(null);
  const [selectedSeason, setSelectedSeason] = useState<string>(null);

  // useEffect(()=>{

  //   if(!selectedSeason) return

  //   const classFetcher = new ClassDataFetcher({
  //     department: "理工学部",
  //     weekOfTheDay: ClassDataFetcher.convertNumberToWeekOfTheDay(weekOfTheDay),
  //     period: period,
  //     season: "秋セメスター",
  //   });

  // },[selectedSeason])

  const onSelectDepartment = async (selectedDepartment) => {
    const asyncFunctions = new AsyncFunctions(
      "@timetableDepartment",
      selectedDepartment
    );

    try {
      await asyncFunctions.saveData();
      setSelectedDepartment(selectedDepartment);
      console.log(33, selectedDepartment);
    } catch (e) {
      console.error("Failed to save data to AsyncStorage", e);
    }
  };

  useEffect(() => {
    const asyncFunctions = new AsyncFunctions("@timetableDepartment");
    asyncFunctions.getData().then((department: string) => {
      console.log(41, selectedDepartment);
      setSelectedDepartment(department);
    });
  }, []);

  const onSelectSeason = async (selectedSeason) => {
    const asyncFunctions = new AsyncFunctions(
      "@timetableSeason",
      selectedSeason
    );

    try {
      await asyncFunctions.saveData();
      setSelectedSeason(selectedSeason);
      console.log("50");
    } catch (e) {
      console.error("Failed to save data to AsyncStorage", e);
    }
  };

  useEffect(() => {
    const asyncFunctions = new AsyncFunctions("@timetableSeason");
    asyncFunctions.getData().then((season: string) => {
      setSelectedSeason(season);
      console.log("60");
    });
  }, []);

  return (
    <View>
      <Text>楽器</Text>
      <RNPickerSelect
        onValueChange={(value) => onSelectDepartment(value)}
        placeholder={{ label: "選択されていません", value: null }}
        items={Object.keys(faculties.学部).map((key) => ({
          label: faculties.学部[key].名称,
          value: faculties.学部[key].名称,
        }))}
        style={{ inputIOS: { marginLeft: "5%" } }} // iOS向けのスタイル調整
        value={selectedDepartment}
      />
      <RNPickerSelect
        onValueChange={(value) => onSelectSeason(value)}
        placeholder={{ label: "選択されていません", value: null }}
        items={[
          { label: "春セメスター", value: "春セメスター" },
          { label: "秋セメスター", value: "秋セメスター" },
        ]}
        style={{ inputIOS: { marginLeft: "5%" } }} // iOS向けのスタイル調整
        value={selectedSeason}
      />
    </View>
  );
};
export default TimeTableSetting;
