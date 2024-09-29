import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTimeTable } from "../../TimeTableContext";
import { UserSettingContent } from "../../types/user-setting-content";

const DisplayCountSelect = () => {
  const { userSettingContent, setUserSettingContent } = useTimeTable();
  const changeDisplayCountValue = (action: string) => {
    if (action === "plus") {
      userSettingContent.displayCount !== 7 &&
        setUserSettingContent((data: UserSettingContent) => ({
          ...data,
          displayCount: data.displayCount + 1,
        }));
    }
    if (action === "minus") {
      userSettingContent.displayCount !== 5 &&
        setUserSettingContent((data: UserSettingContent) => ({
          ...data,
          displayCount: data.displayCount - 1,
        }));
    }
  };
  return (
    <View style={styles.displayCountSelectContainer}>
      <Text style={styles.textType}>表示するコマ数</Text>
      <View style={styles.plusMinusSettingButton}>
        <TouchableOpacity onPress={() => changeDisplayCountValue("minus")}>
          <AntDesign name="minuscircle" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.displayCountContainer}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {userSettingContent?.displayCount}
          </Text>
        </View>
        <TouchableOpacity onPress={() => changeDisplayCountValue("plus")}>
          <AntDesign name="pluscircle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default DisplayCountSelect;

const styles = StyleSheet.create({
  displayCountSelectContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  plusMinusSettingButton: {
    width: "55%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  displayCountContainer: {
    width: "30%",
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  textType: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
