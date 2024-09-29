import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useTimeTable } from "../../TimeTableContext";
import { UserSettingContent } from "../../types/user-setting-content";

const DepartmentSelect = () => {
  const { userSettingContent, setUserSettingContent } = useTimeTable();
  return (
    <View style={styles.selectorContainer}>
      <Text style={styles.textType}>学部を選択</Text>
      <View style={styles.pickerSelectContainer}>
        <RNPickerSelect
          value={userSettingContent?.department}
          onValueChange={(value) =>
            setUserSettingContent((data: UserSettingContent) => ({
              ...data, // スプレッド演算子で他のフィールドを保持
              department: value, // departmentフィールドのみを更新
            }))
          }
          items={[
            { label: "法学部", value: "法学部", key: "hougaku" },
            { label: "経済学部", value: "経済学部", key: "keizai" },
            { label: "経営学部", value: "経営学部", key: "keiei" },
            {
              label: "産業社会学部",
              value: "産業社会学部",
              key: "sansha",
            },
            {
              label: "国際関係学部",
              value: "国際関係学部",
              key: "kokusai",
            },
            { label: "政策科学部", value: "政策科学部", key: "seisaku" },
            { label: "文学部", value: "文学部", key: "bun" },
            { label: "映像学部", value: "映像学部", key: "eizou" },
            {
              label: "総合心理学部",
              value: "総合心理学部",
              key: "sougou",
            },
            { label: "理工学部", value: "理工学部", key: "rikou" },
            {
              label: "グローバル教養学部",
              value: "グローバル教養学部",
              key: "gurokyou",
            },
            {
              label: "食マネジメント学部",
              value: "食マネジメント学部",
              key: "shokumane",
            },
            {
              label: "情報理工学部",
              value: "情報理工学部",
              key: "jouri",
            },
            { label: "生命科学部", value: "生命科学部", key: "seimei" },
            { label: "薬学部", value: "薬学部", key: "yakugaku" },
            {
              label: "スポーツ健康学部",
              value: "スポーツ健康学部",
              key: "supoken",
            },
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
export default DepartmentSelect;

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
