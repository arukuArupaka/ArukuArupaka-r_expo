import { View, StyleSheet } from "react-native";
import WeekRow from "../../component/TimeTable/timeTableView/WeekRow";
import ClassTimeColumn from "../../component/TimeTable/timeTableView/ClassTimeColumn";
import React from "react";
import TimeTableViewBody from "../../component/TimeTable/timeTableView/TimeTableViewBody";

const TimeTableView = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 50,
          height: "100%",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <View style={{ width: "99%", height: "100%", flexDirection: "row" }}>
          <View style={styles.timeColumnContainer}>
            <ClassTimeColumn />
          </View>
          <View style={styles.weekAndClassContainer}>
            <WeekRow />
            <TimeTableViewBody />
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  timeColumnContainer: {
    height: "85%",
    flex: 1,
  },
  weekAndClassContainer: {
    flexDirection: "column",
    height: "85%",
    flex: 8,
  },
});

export default TimeTableView;
