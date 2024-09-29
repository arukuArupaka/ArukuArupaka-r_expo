import { View, StyleSheet } from "react-native";
import ClassPeriodUnit from "./components/ClassPeriodUnit";
import { useTimeTable } from "../TimeTableContext";

const TimeTableViewBody = () => {
  const { userSettingContent } = useTimeTable();
  return (
    <View style={styles.scheduleContainer}>
      {Array.from({ length: 5 }, (_, i) => i + 1).map(
        (weekOfTheDay, weekIndex) => (
          <View key={weekIndex} style={styles.oneWeekContainer}>
            {Array.from(
              { length: userSettingContent.displayCount },
              (_, i) => i + 1
            ).map((period, periodIndex) => (
              <ClassPeriodUnit
                key={periodIndex}
                weekOfTheDay={weekOfTheDay}
                period={period}
              />
            ))}
          </View>
        )
      )}
    </View>
  );
};
export default TimeTableViewBody;

const styles = StyleSheet.create({
  scheduleContainer: {
    height: "90%",
    flexDirection: "row",
  },
  oneWeekContainer: {
    width: "20%",
    height: "100%",
  },
});
