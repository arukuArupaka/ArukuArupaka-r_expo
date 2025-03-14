import { ClassPeriod } from "../types/class-period";
import { ARUPAKA_BACKEND_URL } from "@env";
import { ConvertMethods } from "./convert-methods";

type Props = {
  department?: string;
  weekOfTheDay: string;
  period: number;
  semester?: string;
  schoolYear: number;
};

export class ClassDataFetcher {
  department?: string;
  weekOfTheDay: string;
  period: number;
  semester?: string;
  schoolYear: number;

  constructor({
    department,
    weekOfTheDay,
    period,
    semester,
    schoolYear,
  }: Props) {
    this.department = department;
    this.weekOfTheDay = weekOfTheDay;
    this.period = period;
    this.semester = semester;
    this.schoolYear = schoolYear;
  }

  async fetchClassData(): Promise<ClassPeriod[] | string> {
    try {
      if (!this.department || !this.semester) {
        console.log("not chosen your department or now semester");
        return "not chosen your department or now semester";
      }
      const convertedDepartment =
        ConvertMethods.convertDepartmentFromJapaneseToEnglish(this.department);
      const convertedSemester =
        ConvertMethods.convertSemesterFromJapaneseToEnglish(this.semester);
      const convertedWeekday =
        ConvertMethods.convertWeekdayFromJapaneseToEnglish(this.weekOfTheDay);
      const response = await fetch(
        `${ARUPAKA_BACKEND_URL}/lecture/get-lectures?schoolYear=${this.schoolYear}&academic=${convertedDepartment}&weekday=${convertedWeekday}&period=${this.period}&semester=${convertedSemester}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();

      const processedData: ClassPeriod[] = json.map((item: any) => ({
        year: item.schoolYear,
        season: this.semester,
        weekOfTheDay: ConvertMethods.convertWeekdayFromEnglishToJapanese(
          item.weekday
        ),
        period: item.period,
        className: item.name,
        classRoom: item.rawClassroom,
        memo: "",
        isNotify: true,
        notificationTime: 10,
        department: this.department,
        unit: item.credits,
        num: item.classCode,
        resume: item.syllabus,
        teacher: item.teacher,
        status: item.category,
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
