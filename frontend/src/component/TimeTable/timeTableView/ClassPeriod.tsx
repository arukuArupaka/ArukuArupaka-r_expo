import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FC } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../interface/root-stack-param-list";

type Props = {
  week: number;
  period: number;
};

const ClassPeriod: FC<Props> = ({ week, period }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View key={week} style={styles.classPeriodContainer}>
      <TouchableOpacity
        style={styles.classPeriod}
        onPress={() =>
          navigation.navigate("ClassPeriodOptions", { week, period })
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
