import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

const ClassPeriodDetailDataBodyItem: FC<{
  value: string | number;
}> = ({ value }) => {
  return (
    <View style={styles.classPeriodDataContainer}>
      <Text style={styles.ClassPeriodDetailData}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  classPeriodDataContainer: {
    width: "100%",
    margin: 10,
  },
  ClassPeriodDetailData: {
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
  },
});

export default ClassPeriodDetailDataBodyItem;
