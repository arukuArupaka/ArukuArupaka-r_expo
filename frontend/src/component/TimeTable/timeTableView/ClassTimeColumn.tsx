import { View, Text, StyleSheet } from "react-native";
import { useTimeTable } from "../TimeTableContext";

const CLASS_START_TIME = [
  { start: "  9:00", end: "10:35" },
  { start: "10:45", end: "12:20" },
  { start: "13:10", end: "14:45" },
  { start: "14:55", end: "16:30" },
  { start: "16:40", end: "18:15" },
  { start: "18:25", end: "20:00" },
  { start: "20:10", end: "21:45" },
];

const ClassTimeColumn = () => {
  const { userSettingContent } = useTimeTable();
  const displayCount = Array.from(
    { length: userSettingContent.displayCount },
    (_, i) => ({ period: i + 1, time: CLASS_START_TIME[i] })
  );

  return (
    <View style={styles.timeColumnContainer}>
      {displayCount.map((classPeriod, index) => (
        <View key={index} style={styles.oneClassTimeContainer}>
          <View style={styles.oneClassTime}>
            <Text style={{ fontWeight: "800", marginBottom: 10 }}>
              {classPeriod.period}
            </Text>
            <Text
              style={{ fontWeight: "bold", color: "#808080" }}
              adjustsFontSizeToFit
              numberOfLines={1}
              minimumFontScale={0.5}
            >
              {classPeriod.time.start}
            </Text>
            <Text
              style={{ fontWeight: "bold", color: "#808080" }}
              adjustsFontSizeToFit
              numberOfLines={1}
              minimumFontScale={0.5}
            >
              {classPeriod.time.end}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
export default ClassTimeColumn;

const styles = StyleSheet.create({
  timeColumnContainer: {
    height: "90%",
    marginTop: 60,
  },
  oneClassTimeContainer: {
    flex: 1,
    marginTop: 2.5,
    alignItems: "center",
  },
  oneClassTime: {
    margin: 2,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 10,
    // backgroundColor: "#7fffd4",
    height: "100%",
  },
});
