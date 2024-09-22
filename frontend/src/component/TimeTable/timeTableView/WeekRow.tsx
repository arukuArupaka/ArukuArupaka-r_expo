import { View, Text, StyleSheet } from "react-native";

const WeekRow = () => {
  const weekOfTheDays = ["月", "火", "水", "木", "金"];
  return (
    <View style={styles.weekRow}>
      {weekOfTheDays.map((day, index) => (
        <View key={index} style={styles.oneWeekOfTheDayContainer}>
          <View style={styles.oneWeekOfTheDay}>
            <Text style={{ fontWeight: "bold", color: "white" }}>{day}</Text>
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
  oneWeekOfTheDayContainer: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  oneWeekOfTheDay: {
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: "#00bfff",
    justifyContent: "center",
    alignItems: "center",
  },
});
