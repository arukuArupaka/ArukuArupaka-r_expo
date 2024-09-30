import { ClassPeriod } from "../types/class-period";

export class ConvertMethods {
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

  static convertWeekOfTheDayToNumber(weekOfTheDay: string): number {
    switch (weekOfTheDay) {
      case "月":
        return 2;
      case "火":
        return 3;
      case "水":
        return 4;
      case "木":
        return 5;
      case "金":
        return 6;
    }
  }

  static convertPeriodToTime(period: number): { hour: number; minute: number } {
    switch (period) {
      case 1:
        return { hour: 9, minute: 0 };
      case 2:
        return { hour: 10, minute: 40 };
      case 3:
        return { hour: 13, minute: 0 };
      case 4:
        return { hour: 14, minute: 40 };
      case 5:
        return { hour: 16, minute: 20 };
      case 6:
        return { hour: 18, minute: 0 };
      case 7:
        return { hour: 0, minute: 46 };
    }
  }

  static setClassPeriodStatusColor(classPeriod: ClassPeriod) {
    if (classPeriod.status?.includes("基礎専")) {
      return "#FFB74D";
    } else if (classPeriod.status?.includes("専門")) {
      return "#4DB6AC";
    } else if (classPeriod.status?.includes("教養")) {
      return "#64B5F6";
    }
  }

  static setClassPeriodUnitColor(classPeriod: ClassPeriod) {
    switch (classPeriod.unit) {
      case 1:
        return "#FFB74D";
      case 2:
        return "#4DB6AC";
      case 3:
        return "#64B5F6";
      case 4:
        return "#AED581";
    }
  }
}
