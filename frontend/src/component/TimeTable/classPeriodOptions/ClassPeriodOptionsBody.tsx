import { ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";
import ClassPeriodOption from "./ClassPeriodOption";
import NotChosenDepartmentOrSeason from "./NotChosenDepartmentOrSeason";
import { ClassPeriod } from "../types/class-period";
import { FC } from "react";
import MultipleSetting from "./component/MultipleSetting";
import NoHits from "./component/NoHits";
import { useTimeTable } from "../TimeTableContext";

type Props = {
  classPeriodOptions: ClassPeriod[] | string;
  weekOfTheDay?: string;
  period?: number;
  onPress: (data?: ClassPeriod) => void;
};

const ClassPeriodOptionsBody: FC<Props> = ({
  classPeriodOptions,
  onPress,
  weekOfTheDay,
  period,
}) => {
  const { userSettingContent } = useTimeTable();
  const multipleSettingTemporaryData = {
    year: 2024,
    season: userSettingContent.semester,
    weekOfTheDay,
    period,
    className: "",
    classRoom: "",
    memo: "",
    isNotify: true,
    notificationTime: 0,
    department: userSettingContent.department,
    unit: 0,
    num: "",
    resume: "",
    teacher: "",
    status: "",
    color: "",
    mulColor: "",
    statusColor: "",
  };
  return (
    <ScrollView style={styles.body}>
      <View style={{ flex: 1, marginBottom: 100 }}>
        <MultipleSetting
          onPress={() => onPress(multipleSettingTemporaryData)}
        />
        {Array.isArray(classPeriodOptions) ? (
          classPeriodOptions.length > 0 ? (
            classPeriodOptions.map((data, index) => (
              <TouchableOpacity onPress={() => onPress(data)} key={index}>
                <ClassPeriodOption data={data} />
              </TouchableOpacity>
            ))
          ) : (
            <NoHits />
          )
        ) : (
          typeof classPeriodOptions === "string" && (
            <NotChosenDepartmentOrSeason />
          )
        )}
      </View>
    </ScrollView>
  );
};
export default ClassPeriodOptionsBody;

const styles = StyleSheet.create({
  body: {
    width: "98%",
    flex: 1,
  },
});
