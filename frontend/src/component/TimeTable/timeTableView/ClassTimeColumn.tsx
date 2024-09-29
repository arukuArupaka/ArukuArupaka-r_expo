import { View, Text, StyleSheet } from "react-native";
import { useTimeTable } from "../TimeTableContext";

const ClassTimeColumn = () => {
  const { userSettingContent } = useTimeTable();
  const displayCount = Array.from(
    { length: userSettingContent.displayCount },
    (_, i) => i + 1
  );

  return (
    <View style={styles.timeColumnContainer}>
      {displayCount.map((time, index) => (
        <View key={index} style={styles.oneClassTimeContainer}>
          <View style={styles.oneClassTime}>
            <Text style={{ fontWeight: "bold" }}>{time}</Text>
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
