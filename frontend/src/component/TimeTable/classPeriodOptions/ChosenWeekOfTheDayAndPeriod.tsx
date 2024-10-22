import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  stringWeekOfTheDay: string;
  period: number;
};

const ChosenWeekOfTheDayAndPeriod: FC<Props> = ({
  stringWeekOfTheDay,
  period,
}) => {
  return (
    <View style={styles.weekOfDayAndPeriod}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        {stringWeekOfTheDay}曜日{period}限目
      </Text>
    </View>
  );
};
export default ChosenWeekOfTheDayAndPeriod;

const styles = StyleSheet.create({
  weekOfDayAndPeriod: {
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
  },
});
