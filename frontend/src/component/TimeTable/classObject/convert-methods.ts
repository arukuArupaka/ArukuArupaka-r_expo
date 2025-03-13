import { ClassPeriod } from "../types/class-period";

export class ConvertMethods {
  static convertNumberToWeekOfTheDay(weekNumber: number): string {
    switch (weekNumber) {
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      default:
        return "Invalid day"; // エラーハンドリング
    }
  }

  static convertWeekOfTheDayToNumber(weekOfTheDay: string): number {
    switch (weekOfTheDay) {
      case "Monday":
        return 2;
      case "Tuesday":
        return 3;
      case "Wednesday":
        return 4;
      case "Thursday":
        return 5;
      case "Friday":
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
        return { hour: 19, minute: 40 };
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
