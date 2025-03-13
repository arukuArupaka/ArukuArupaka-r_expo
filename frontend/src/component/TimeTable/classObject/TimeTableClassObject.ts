import { ClassPeriod } from "../types/class-period";
import { ARUPAKA_BACKEND_URL } from "@env";

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
      console.log(this.department);
      console.log(this.weekOfTheDay);
      console.log(this.period);
      console.log(this.semester);
      console.log(this.schoolYear);
      if (!this.department || !this.semester) {
        console.log("not chosen your department or now semester");
        return "not chosen your department or now semester";
      }
      console.log(ARUPAKA_BACKEND_URL);
      const response = await fetch(
        `${ARUPAKA_BACKEND_URL}/lecture/get-lectures?schoolYear=${this.schoolYear}&academic=${this.department}&weekday=${this.weekOfTheDay}&period=${this.period}&semester=${this.semester}`
      );
      console.log(response);
      if (!response.ok) {
        console.log(
          `${ARUPAKA_BACKEND_URL}/lecture/get-lectures?schoolYear=${this.schoolYear}&academic=${this.department}&weekday=${this.weekOfTheDay}&period=${this.period}&semester=${this.semester}`
        );
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      console.log(json);

      const processedData: ClassPeriod[] = json.map((item: any) => ({
        year: item.schoolYear,
        season: item.semester,
        weekOfTheDay: item.weekyday,
        period: item.period,
        className: item.name,
        classRoom: item.rawClassroom,
        memo: "",
        isNotify: true,
        notificationTime: 10,
        department: item.academic,
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
