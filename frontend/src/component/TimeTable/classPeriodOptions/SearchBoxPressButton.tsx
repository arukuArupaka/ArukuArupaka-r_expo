import { TouchableOpacity, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const SearchBoxPressButton = () => {
  return (
    <TouchableOpacity style={styles.searchBox}>
      <FontAwesome
        name="search"
        size={24}
        color="black"
        style={{ marginLeft: 10 }}
      />
      <Text
        style={{
          fontSize: 20,
          marginLeft: 5,
          fontWeight: "bold",
          color: "gray",
        }}
      >
        どの授業をお探しですか？
      </Text>
    </TouchableOpacity>
  );
};
export default SearchBoxPressButton;

const styles = StyleSheet.create({
  searchBox: {
    width: "90%",
    height: "35%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
});
