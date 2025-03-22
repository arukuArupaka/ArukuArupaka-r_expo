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

  static convertWeekdayFromEnglishToJapanese(weekday: string): string {
    switch (weekday) {
      case "Monday":
        return "月";
      case "Tuesday":
        return "火";
      case "Wednesday":
        return "水";
      case "Thursday":
        return "木";
      case "Friday":
        return "金";
    }
  }

  static convertWeekdayFromJapaneseToEnglish(weekday: string): string {
    switch (weekday) {
      case "月":
        return "Monday";
      case "火":
        return "Tuesday";
      case "水":
        return "Wednesday";
      case "木":
        return "Thursday";
      case "金":
        return "Friday";
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

  static convertDepartmentFromJapaneseToEnglish(department: string): string {
    switch (department) {
      case "法学部":
        return "Law";
      case "経済学部":
        return "Economics";
      case "経営学部":
        return "Business";
      case "産業社会学部":
        return "SocialSciences";
      case "国際関係学部":
        return "InternationalRelations";
      case "政策科学部":
        return "PolicyScience";
      case "文学部":
        return "Literature";
      case "映像学部":
        return "Film";
      case "総合心理学部":
        return "Psychology";
      case "理工学部":
        return "ScienceAndTechnology";
      case "グローバル教養学部":
        return "GlobalLiberalArts";
      case "食マネジメント学部":
        return "FoodManagement";
      case "情報理工学部":
        return "InformationScience";
      case "生命科学部":
        return "LifeSciences";
      case "薬学部":
        return "Pharmacy";
      case "スポーツ健康学部":
        return "SportsHealthScience";
    }
  }

  static convertSemesterFromJapaneseToEnglish(semester: string): string {
    switch (semester) {
      case "春セメスター":
        return "Spring";
      case "秋セメスター":
        return "Autumn";
    }
  }

  static convertSemesterFromEnglishToJapanese(semester: string): string {
    switch (semester) {
      case "Spring":
        return "春セメスター";
      case "Autumn":
        return "秋セメスター";
    }
  }
}
