import { View, Text, StyleSheet } from "react-native";
import { FC } from "react";

type Props = {
  week: number;
  period: number;
};

const ClassPeriod: FC<Props> = ({ week, period }) => {
  return (
    <View key={week} style={styles.classPeriodContainer}>
      <View style={styles.classPeriod}>
        <Text>{/* {week} {period} */}</Text>
      </View>
    </View>
  );
};

export default ClassPeriod;

const styles = StyleSheet.create({
  classPeriodContainer: {
    height: "13.69%",
    width: "100%",
    marginTop: 2.5,
  },
  classPeriod: {
    margin: 2,
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#d3d3d3",
  },
});
