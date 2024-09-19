import { RouteProp } from "@react-navigation/native";
import { FC } from "react";
import { View, Text } from "react-native";
import { RootStackParamList } from "../../component/TimeTable/interface/root-stack-param-list";

type ClassPeriodOptionsScreenRouteProp = RouteProp<
  RootStackParamList,
  "ClassPeriodOptions"
>;

const ClassPeriodOptions: FC<{ route: ClassPeriodOptionsScreenRouteProp }> = ({
  route,
}) => {
  const { week, period } = route.params;
  return (
    <View>
      <Text>
        {week} {period}
      </Text>
    </View>
  );
};
export default ClassPeriodOptions;
