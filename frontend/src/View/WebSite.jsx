import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { useTimeTable } from "../component/TimeTable/TimeTableContext";

export default function App() {
  const {
    weekTimeQty,
    timesize,
    setWeekTimeQty,
    sizechange,
    setSizechange,
    padding,
    show,
    setShow,
    season,
    setSeason,
    time,
    setTime,
    day,
    setDay,
    department,
    setDepartment,
    dodata,
    setDodata,
    pushedClassFrameDetail,
    setPushedClassFrameDetail,
    weekTime,
    setWeekTime,
    indata,
    setIndata,
    period,
    setPeriod,
    kamokuItem,
    setKamokuItem,
    nodata,
    setNodata,
  } = useTimeTable();
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: `${
            weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period]
              .resume
          }`,
        }}
        decelerationRate="normal"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
