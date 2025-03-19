import { ClassPeriod } from "./class-period";

export type RootStackParamList = {
  ClassPeriodOptions: { weekOfTheDay: number; period: number };
  ClassPeriodDetail: { classPeriodData: ClassPeriod };
  TimeTable: { headerTitle: string };
  TimeTableSetting: undefined;
  login: undefined;
  FirebaseNotificationList: { firebaseNotificationList: any[] };
};
