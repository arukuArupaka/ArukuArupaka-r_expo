import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useTimeTable } from "../../component/TimeTable/TimeTableContext";
import { UserSettingContent } from "../../component/TimeTable/types/user-setting-content";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect } from "react";
import { AsyncFunctions } from "../../component/TimeTable/classObject/TimeTableClassObject";

const TimeTableSetting = () => {
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
      userSettingContent.displayCount !== 1 &&
        setUserSettingContent((data: UserSettingContent) => ({
          ...data,
          displayCount: data.displayCount - 1,
        }));
    }
  };

  const saveUserSettingContent = async () => {
    await AsyncFunctions.saveClassPeriodDatas<UserSettingContent>(
      "@userSettingContent",
      userSettingContent
    );
  };

  const toggleSwitchAction = (switchName: string) => {
    if (switchName === "units") {
      setUserSettingContent((data: UserSettingContent) => ({
        ...data,
        colorByUnits: !data.colorByUnits,
        colorBySubject: !data.colorByUnits ? false : data.colorBySubject,
      }));
    } else if (switchName === "subjects") {
      setUserSettingContent((data: UserSettingContent) => ({
        ...data,
        colorBySubject: !data.colorBySubject,
        colorByUnits: !data.colorBySubject ? false : data.colorByUnits,
      }));
    }
  };

  useEffect(() => {
    saveUserSettingContent();
  }, [userSettingContent]);

  return (
    <View style={{ flex: 1 }}>
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
      <View style={styles.body}>
        <View style={styles.bodyContent}>
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
          <View style={styles.displayCountSelectContainer}>
            <Text style={styles.textType}>表示するコマ数</Text>
            <View style={styles.plusMinusSettingButton}>
              <TouchableOpacity
                onPress={() => changeDisplayCountValue("minus")}
              >
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
          <View style={styles.toggleContainer}>
            <Text style={styles.textType}>単位数ごとに自動で色分け</Text>
            <View style={styles.toggleSwitchContainer}>
              <Switch
                onValueChange={() => toggleSwitchAction("units")}
                value={userSettingContent.colorByUnits}
              />
            </View>
          </View>
          <View style={styles.toggleContainer}>
            <Text style={styles.textType}>科目の種類ごとに自動で色分け</Text>
            <View style={styles.toggleSwitchContainer}>
              <Switch
                onValueChange={() => toggleSwitchAction("subjects")}
                value={userSettingContent.colorBySubject}
              />
            </View>
          </View>
          <View style={styles.totalUnitsContainer}>
            <Text style={styles.textType}>合計単位数</Text>
            <View style={styles.totalUnitsValueContainer}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {userSettingContent.totalUnits}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default TimeTableSetting;

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
  body: {
    flex: 8,
    marginTop: 20,
    alignItems: "center",
  },
  bodyContent: {
    width: "90%",
    height: "90%",
  },
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
  toggleContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  toggleSwitchContainer: {
    width: "35%",
    justifyContent: "center",
  },
  totalUnitsContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  totalUnitsValueContainer: {
    width: "30%",
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
