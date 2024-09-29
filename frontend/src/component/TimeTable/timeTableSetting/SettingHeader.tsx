import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SettingHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.userSettingButton}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
            設定
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userNotificationButton}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
            通知一覧
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SettingHeader;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    marginTop: 30,
  },
  buttonsContainer: {
    height: 30,
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
    backgroundColor: "gray",
  },
});
