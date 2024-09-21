import { View, Text, StyleSheet } from "react-native";
import { FC } from "react";
import { ClassPeriod } from "../types/class-period";
type Props = {
  data: ClassPeriod;
};

const ClassPeriodOption: FC<Props> = ({ data }) => {
  return (
    <View style={styles.classPeriodOption}>
      <View style={styles.classPeriodNumber}>
        <Text style={{ fontWeight: "bold", color: "white" }}>{data.num}</Text>
      </View>
      <View style={styles.classNameAndClass}>
        <Text
          style={{ fontWeight: "bold", maxWidth: "90%" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {data.className}
        </Text>
        <Text
          style={{ fontWeight: "bold", maxWidth: "90%" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {data.classRoom}
        </Text>
      </View>
    </View>
  );
};
export default ClassPeriodOption;

const styles = StyleSheet.create({
  classPeriodOption: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
  },
  classPeriodNumber: {
    backgroundColor: "#00bfff",
    padding: 5,
    borderRadius: 10,
    marginLeft: 5,
  },
  classNameAndClass: {
    flexDirection: "column",
    marginLeft: 5,
  },
});
