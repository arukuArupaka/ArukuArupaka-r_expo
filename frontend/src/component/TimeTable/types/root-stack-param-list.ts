import { ClassPeriod } from "./class-period";

export type RootStackParamList = {
  ClassPeriodOptions: { weekOfTheDay: number; period: number };
  ClassPeriodDetail: { classPeriodData: ClassPeriod };
  TimeTable: undefined;
  TimeTableSetting: undefined;
};
