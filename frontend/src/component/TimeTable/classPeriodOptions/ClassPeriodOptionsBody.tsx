import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import ClassPeriodOption from "./ClassPeriodOption";
import NotChoosenDepartmentOrSeason from "./NotChoosenDepartmentOrSeason";
import { ClassPeriod } from "../types/class-period";
import { FC } from "react";
import MultipleSetting from "./component/MultipleSetting";
import NoHits from "./component/NoHits";

type Props = {
  classPeriodOptions: ClassPeriod[] | string;
  onPress: (data?: ClassPeriod) => void;
};

const ClassPeriodOptionsBody: FC<Props> = ({ classPeriodOptions, onPress }) => {
  return (
    <ScrollView style={styles.body}>
      <View style={{ flex: 1, marginBottom: 100 }}>
        <MultipleSetting onPress={onPress} />
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
            <NotChoosenDepartmentOrSeason />
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
