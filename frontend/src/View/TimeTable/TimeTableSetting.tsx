import { View, Text } from "react-native";
import faculties from "../../data/faculties";
import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";

const TimeTableSetting = () => {

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(()=>{

    if(!selectedSeason) return

    const classFetcher = new ClassDataFetcher({
      department: "理工学部",
      weekOfTheDay: ClassDataFetcher.convertNumberToWeekOfTheDay(weekOfTheDay),
      period: period,
      season: "秋セメスター",
    });



  },[selectedSeason])

  

  return (
    <View>
      <Text>楽器</Text>
      <RNPickerSelect
             onValueChange={(value) => setSelectedDepartment(value)}
            placeholder={{ label: "選択されていません", value: null }}
            items={Object.keys(faculties.学部).map((key) => ({
              label: faculties.学部[key].名称,
              value: faculties.学部[key].名称,
            }))}
            style={{ inputIOS: { marginLeft: "5%" } }} // iOS向けのスタイル調整
            value={selectedDepartment}
          />
        <RNPickerSelect
            onValueChange={(value) => setSelectedSeason(value)}
          placeholder={{ label: "選択されていません", value: null }}
          items={
            [
            {label: "秋セメスター", value: "秋セメスター" },
            {label: "秋セメスター", value: "秋セメスター" },
            ]
          }
          style={{ inputIOS: { marginLeft: "5%" } }} // iOS向けのスタイル調整
          value={selectedSeason}
        />
    </View>
  );
};
export default TimeTableSetting;
