import { View, Text, StyleSheet } from "react-native";

const ClassTimeColumn = () => {
  const timeColumn = [1, 2, 3, 4, 5, 6, 7];
  return (
    <View style={styles.timeColumnContainer}>
      {timeColumn.map((time, index) => (
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
    height: "13.69%",
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
