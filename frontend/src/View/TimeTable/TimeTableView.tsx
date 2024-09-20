import { View, Text, StyleSheet, Dimensions } from "react-native";
import ClassPeriod from "../../component/TimeTable/timeTableView/ClassPeriod";
import WeekRow from "../../component/TimeTable/timeTableView/WeekRow";
import ClassTimeColumn from "../../component/TimeTable/timeTableView/ClassTimeColumn";

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
                        <ClassPeriod
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
