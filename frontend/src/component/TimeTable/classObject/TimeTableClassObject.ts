import AsyncStorage from "@react-native-async-storage/async-storage";
import { ClassPeriod } from "../types/class-period";
import { TIME_TABLE_API_URL } from "@env";
import { UserSettingContent } from "../types/user-setting-content";

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
        notifion: false,
        notification: "",
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

  static convertNumberToWeekOfTheDay(weekNumber: number): string {
    switch (weekNumber) {
      case 1:
        return "月";
      case 2:
        return "火";
      case 3:
        return "水";
      case 4:
        return "木";
      case 5:
        return "金";
      default:
        return "Invalid day"; // エラーハンドリング
    }
  }
}

export class AsyncFunctions {
  place: string;
  isArray: boolean;

  constructor(place: string, isArray: boolean) {
    this.place = place;
    this.isArray = isArray;
  }

  // ジェネリックメソッドで保存
  static async saveClassPeriodDatas<T>(place: string, data: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(place, jsonValue);
    } catch (e) {
      console.error("Failed to save data to AsyncStorage", e);
    }
  }

  // ジェネリックメソッドで取得
  static async getClassPeriodDatas<T>(
    place: string,
    type: string
  ): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(place);
      if (jsonValue !== null) {
        return JSON.parse(jsonValue);
      } else {
        switch (type) {
          case "array":
            return [] as T;
          case "object":
            return null;
          default:
            return null;
        }
      }
    } catch (e) {
      console.error("Failed to fetch data from AsyncStorage", e);
      switch (type) {
        case "array":
          return [] as T;
        case "object":
          return null;
        default:
          return null;
      }
    }
  }
}

export class DataChangeMethods {
  // クラスのプロパティとして `userSettingContent`, `userClassPeriodDatas`, `classPeriodIndex` を扱う
  userSettingContent: any;
  userClassPeriodDatas: any;
  classPeriodIndex: number;

  constructor(
    userSettingContent: any,
    userClassPeriodDatas: any,
    classPeriodIndex: number
  ) {
    this.userSettingContent = userSettingContent;
    this.userClassPeriodDatas = userClassPeriodDatas;
    this.classPeriodIndex = classPeriodIndex;
  }

  // プライベートな静的メソッド
  private static classRoomColor(color: string): string {
    switch (color) {
      case "#FFB74D":
        return "#ffcd82";
      case "#4DB6AC":
        return "#82ccc5";
      case "#64B5F6":
        return "#92cbf9";
      case "#AED581":
        return "#c6e2a7";
      case "#BA68C8":
        return "#cf95d8";
      default:
        return "#87ceeb";
    }
  }

  // プライベートな静的メソッド
  private static getColor(
    userSettingContent: UserSettingContent,
    userClassPeriodDatas: ClassPeriod,
    classPeriodIndex: number
  ): string {
    const { colorBySubject, colorByUnits } = userSettingContent;
    const classData = userClassPeriodDatas[classPeriodIndex];

    if (colorBySubject) {
      return classData?.statusColor || "#d3d3d3";
    }
    if (colorByUnits) {
      return classData?.mulColor || "#d3d3d3";
    }
    return classData?.color || "#d3d3d3";
  }

  // プライベートな静的メソッド
  private static textBlackOrWhite(
    userSettingContent: UserSettingContent,
    userClassPeriodDatas: ClassPeriod,
    classPeriodIndex: number
  ): string {
    const color = this.getColor(
      userSettingContent,
      userClassPeriodDatas,
      classPeriodIndex
    );
    return color !== "#d3d3d3" ? "white" : "black";
  }

  // パブリックな静的メソッド
  public static classPeriodBackColor(
    place: string,
    userSettingContent: UserSettingContent,
    userClassPeriodDatas: ClassPeriod,
    classPeriodIndex: number
  ): string {
    switch (place) {
      case "entire":
        return this.getColor(
          userSettingContent,
          userClassPeriodDatas,
          classPeriodIndex
        );
      case "classRoom":
        return this.classRoomColor(
          this.getColor(
            userSettingContent,
            userClassPeriodDatas,
            classPeriodIndex
          )
        );
      case "text":
        return this.textBlackOrWhite(
          userSettingContent,
          userClassPeriodDatas,
          classPeriodIndex
        );
      case "classNumber":
        return this.getColor(
          userSettingContent,
          userClassPeriodDatas,
          classPeriodIndex
        );
      default:
        return "#d3d3d3"; // デフォルトの値を設定
    }
  }
}
