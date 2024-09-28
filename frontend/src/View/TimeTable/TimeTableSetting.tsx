import { View } from "react-native";
import SettingHeader from "../../component/TimeTable/timeTableSetting/SettingHeader";
import SettingBody from "../../component/TimeTable/timeTableSetting/SettingBody";

const TimeTableSetting = () => {
  return (
    <View style={{ flex: 1 }}>
      <SettingHeader />
      <SettingBody />
    </View>
  );
};
export default TimeTableSetting;
