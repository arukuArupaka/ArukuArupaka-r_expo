import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useTimeTable } from "../../TimeTableContext";
import { UserSettingContent } from "../../types/user-setting-content";

const SchoolYearSelect = () => {
  const { userSettingContent, setUserSettingContent } = useTimeTable();
  return (
    <View style={styles.selectorContainer}>
      <Text style={styles.textType}>年度を選択</Text>
      <View style={styles.pickerSelectContainer}>
        <RNPickerSelect
          value={userSettingContent?.schoolYear}
          onValueChange={(value) =>
            setUserSettingContent((data: UserSettingContent) => ({
              ...data, // スプレッド演算子で他のフィールドを保持
              schoolYear: value, // schoolYearフィールドのみを更新
            }))
          }
          Icon={() => (
            <Text
              style={{
                position: "absolute",
                right: 5,
                top: 10,
                fontSize: 18,
                color: "#789",
                width: 200,
                textAlign: "right",
              }}
            >
              ▼
            </Text>
          )}
          items={[
            { label: "2024", value: 2024, key: "2024" },
            { label: "2025", value: 2025, key: "2025" },
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
export default SchoolYearSelect;

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
