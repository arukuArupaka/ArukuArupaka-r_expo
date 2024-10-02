import AsyncStorage from "@react-native-async-storage/async-storage";
import { ClassPeriod } from "../types/class-period";
import { TIME_TABLE_API_URL } from "@env";
import { UserSettingContent } from "../types/user-setting-content";
import * as Notifications from "expo-notifications";

type Props = {
  department?: string;
  weekOfTheDay: string;
  period: number;
  season?: string;
};

export class ClassDataFetcher {
  department?: string;
  weekOfTheDay: string;
  period: number;
  season?: string;

  constructor({ department, weekOfTheDay, period, season }: Props) {
    this.department = department;
    this.weekOfTheDay = weekOfTheDay;
    this.period = period;
    this.season = season;
  }

  async fetchClassDatas(): Promise<ClassPeriod[] | string> {
    try {
      if (!this.department || !this.season) {
        return "not chosen your department or now season";
      }
      const response = await fetch(
        `${TIME_TABLE_API_URL}?kamoku_department=${this.department}&kamoku_day=${this.weekOfTheDay}&kamoku_time=${this.period}&kamoku_season=${this.season}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();

      const processedData: ClassPeriod[] = json.map((item: any) => ({
        year: 2024,
        season: item.kamoku_season,
        weekOfTheDay: item.kamoku_day,
        period: item.kamoku_time,
        className: item.kamoku_name,
        classRoom: item.kamoku_class,
        memo: "",
        isNotify: true,
        notificationTime: 10,
        department: item.kamoku_department,
        unit: item.kamoku_unit,
        num: item.kamoku_num,
        resume: item.kamoku_resume,
        teacher: item.kamoku_teacher,
        status: item.kamoku_status,
        color: "",
        mulColor: "",
        statusColor: "",
      }));

      return processedData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
