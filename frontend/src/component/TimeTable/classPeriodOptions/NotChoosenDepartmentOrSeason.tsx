import { View, Text, StyleSheet } from "react-native";

const NotChoosenDepartmentOrSeason = () => {
  return (
    <View style={styles.NotChoosenDepartmentOrSeasonMessage}>
      <Text style={{ fontWeight: "bold" }}>
        学部かセメスターが選択されていません。選択してください。
      </Text>
    </View>
  );
};
export default NotChoosenDepartmentOrSeason;

const styles = StyleSheet.create({
  NotChoosenDepartmentOrSeasonMessage: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
