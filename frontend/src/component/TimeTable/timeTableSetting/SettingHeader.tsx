import { View, Text, StyleSheet } from "react-native";

const SettingHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.buttonsContainer}>
        <View style={styles.userSettingButton}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
            設定
          </Text>
        </View>
        <View style={styles.userNotificationButton}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
            通知一覧
          </Text>
        </View>
      </View>
    </View>
  );
};
export default SettingHeader;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
  },
  buttonsContainer: {
    height: "40%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  userSettingButton: {
    width: "40%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#30CB89",
  },
  userNotificationButton: {
    width: "40%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#30CB89",
  },
});
