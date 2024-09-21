import { View, StyleSheet } from "react-native";
import WeekRow from "../../component/TimeTable/timeTableView/WeekRow";
import ClassTimeColumn from "../../component/TimeTable/timeTableView/ClassTimeColumn";
import React from "react";
import ClassPeriodUnit from "../../component/TimeTable/timeTableView/ClassPeriodUnit";

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
            <View style={styles.scheduleContainer}>
              {Array.from({ length: 5 }, (_, i) => i + 1).map(
                (weekOfTheDay, weekIndex) => (
                  <View key={weekIndex} style={styles.oneWeekContainer}>
                    {Array.from({ length: 7 }, (_, i) => i + 1).map(
                      (period, periodIndex) => (
                        <ClassPeriodUnit
                          key={periodIndex}
                          weekOfTheDay={weekOfTheDay}
                          period={period}
                        />
                      )
                    )}
                  </View>
                )
              )}
            </View>
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
  scheduleContainer: {
    height: "90%",
    flexDirection: "row",
  },
  oneWeekContainer: {
    width: "20%",
    height: "100%",
  },
});

export default TimeTableView;
