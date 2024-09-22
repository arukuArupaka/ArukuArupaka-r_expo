import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { ClassPeriod } from "../../types/class-period";
import { FC } from "react";

type Props = {
  onPress: (data?: ClassPeriod) => void;
};

const ClassPeriodOptionMultipleSetting: FC<Props> = ({ onPress }) => {
  return (
    <View style={styles.multipleSettingSpace}>
      <TouchableOpacity
        style={styles.multipleSettingContainer}
        onPress={() => onPress()}
      >
        <Text style={{ fontWeight: "bold" }}>手入力で追加</Text>
        <Entypo name="plus" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};
export default ClassPeriodOptionMultipleSetting;

const styles = StyleSheet.create({
  multipleSettingSpace: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  multipleSettingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
