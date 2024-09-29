import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { UserSettingContent } from "../../types/user-setting-content";
import { useTimeTable } from "../../TimeTableContext";

const SemesterSelect = () => {
  const { userSettingContent, setUserSettingContent } = useTimeTable();
  return (
    <View style={styles.selectorContainer}>
      <Text style={styles.textType}>セメスターを選択</Text>
      <View style={styles.pickerSelectContainer}>
        <RNPickerSelect
          value={userSettingContent?.semester}
          onValueChange={(value) =>
            setUserSettingContent((data: UserSettingContent) => ({
              ...data, // スプレッド演算子で他のフィールドを保持
              semester: value, // departmentフィールドのみを更新
            }))
          }
          items={[
            {
              label: "春セメスター",
              value: "春セメスター",
              key: "spring",
            },
            { label: "秋セメスター", value: "秋セメスター", key: "fall" },
          ]}
          style={pickerSelectStyles}
          placeholder={{
            label: "選択してください",
            value: "",
          }}
        />
      </View>
    </View>
  );
};
export default SemesterSelect;

const styles = StyleSheet.create({
  selectorContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  pickerSelectContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "55%",
  },
  textType: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "#D9D9D9",
    width: "100%",
    padding: 10,
    fontWeight: "bold",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#789",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    width: 280,
    marginLeft: 30,
    backgroundColor: "#eee",
    fontWeight: "bold",
  },
});
