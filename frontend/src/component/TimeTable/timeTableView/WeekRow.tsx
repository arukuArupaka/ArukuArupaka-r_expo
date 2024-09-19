import { View, Text, StyleSheet } from "react-native";

const WeekRow = () => {
  const weeks = ["月", "火", "水", "木", "金"];
  return (
    <View style={styles.weekRow}>
      {weeks.map((week, index) => (
        <View key={index} style={styles.oneWeekContainer}>
          <View style={styles.oneWeek}>
            <Text style={{ fontWeight: "bold", color: "white" }}>{week}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
export default WeekRow;

const styles = StyleSheet.create({
  weekRow: {
    height: 60,
    flexDirection: "row",
  },
  oneWeekContainer: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  oneWeek: {
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: "#00bfff",
    justifyContent: "center",
    alignItems: "center",
  },
});
