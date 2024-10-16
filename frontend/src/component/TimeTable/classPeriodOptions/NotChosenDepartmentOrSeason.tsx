import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../types/root-stack-param-list";

const NotChosenDepartmentOrSeason = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.NotChosenDepartmentOrSeasonMessage}>
      <Text style={{ fontWeight: "bold" }}>
        学部かセメスターが選択されていません。選択してください。
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          padding: 7,
          borderRadius: 5,
          marginTop: 10,
        }}
        onPress={() => navigation.navigate("TimeTableSetting")}
      >
        <Text style={{ color: "white", fontWeight: "800" }}>設定画面へ</Text>
      </TouchableOpacity>
    </View>
  );
};
export default NotChosenDepartmentOrSeason;

const styles = StyleSheet.create({
  NotChosenDepartmentOrSeasonMessage: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
