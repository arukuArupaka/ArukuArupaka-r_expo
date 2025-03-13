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
            { label: "法学部", value: "Law", key: "Law" },
            { label: "経済学部", value: "Economics", key: "Economics" },
            {
              label: "経営学部",
              value: "Business",
              key: "Business",
            },
            {
              label: "産業社会学部",
              value: "SocialSciences",
              key: "SocialSciences",
            },
            {
              label: "国際関係学部",
              value: "InternationalRelations",
              key: "InternationalRelations",
            },
            {
              label: "政策科学部",
              value: "PolicyScience",
              key: "PolicyScience",
            },
            { label: "文学部", value: "LiberalArts", key: "LiberalArts" },
            {
              label: "映像学部",
              value: "Film",
              key: "Film",
            },
            {
              label: "総合心理学部",
              value: "Psychology",
              key: "Psychology",
            },
            {
              label: "理工学部",
              value: "ScienceAndTechnology",
              key: "ScienceAndTechnology",
            },
            {
              label: "グローバル教養学部",
              value: "GlobalLiberalArts",
              key: "GlobalLiberalArts",
            },
            {
              label: "食マネジメント学部",
              value: "FoodManagement",
              key: "FoodManagement",
            },
            {
              label: "情報理工学部",
              value: "InformationScience",
              key: "InformationScience",
            },
            { label: "生命科学部", value: "LifeSciences", key: "LifeSciences" },
            {
              label: "薬学部",
              value: "Pharmacy",
              key: "Pharmacy",
            },
            {
              label: "スポーツ健康学部",
              value: "SportsHealthScience",
              key: "SportsHealthScience",
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
