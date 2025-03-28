import { TouchableOpacity, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FC } from "react";

type Props = {
  onOpen: () => void;
  from: string;
  disabled: boolean;
};

const SearchBoxPressButton: FC<Props> = ({ onOpen, from, disabled }) => {
  const pressVarWord = from === "friendSearch" ? "友達" : "授業";
  return (
    <TouchableOpacity
      style={styles.searchBox}
      onPress={() => onOpen()}
      disabled={disabled}
    >
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
        どの{`${pressVarWord}`}をお探しですか？
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
