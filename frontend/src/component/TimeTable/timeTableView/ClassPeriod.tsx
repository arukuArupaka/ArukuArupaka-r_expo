import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FC } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/root-stack-param-list";

type Props = {
  weekOfTheDay: number;
  period: number;
};

const ClassPeriod: FC<Props> = ({ weekOfTheDay, period }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View key={weekOfTheDay} style={styles.classPeriodContainer}>
      <TouchableOpacity
        style={styles.classPeriod}
        onPress={() =>
          navigation.navigate("ClassPeriodOptions", { weekOfTheDay, period })
        }
      >
        <Text>{/* {week} {period} */}</Text>
      </TouchableOpacity>
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
