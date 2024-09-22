import { View, Text, StyleSheet } from "react-native";

const NoHits = () => {
  return (
    <View style={styles.noHitsMessage}>
      <Text style={{ fontWeight: "bold" }}>当てはまる授業がありません</Text>
    </View>
  );
};
export default NoHits;

const styles = StyleSheet.create({
  noHitsMessage: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
