import { ClassPeriodOptionDatas } from "../../types/class-period-option-datas";

type Props = {
  department?: string;
  weekOfTheDay: string;
  period: number;
  season?: string;
};

// fetchClassDatas 関数は Props オブジェクトのみを引数として受け取るように修正
export const fetchClassDatas = async ({
  department,
  season,
  weekOfTheDay,
  period,
}: Props): Promise<ClassPeriodOptionDatas[] | string> => {
  try {
    if (!department || !season) {
      return "not choosen your department or now season";
    }
    const response = await fetch(
      `https://render-test-db-h83h.onrender.com/time_table/get/all/search/?kamoku_department=${department}&kamoku_day=${weekOfTheDay}&kamoku_time=${period}&kamoku_season=${season}`
    );
    if (!response.ok) {
      console.log("HTTP status code:", response.status);
      throw new Error("Network response was not ok");
    }
    const json = await response.json();

    const processedData: ClassPeriodOptionDatas[] = json.map((item: any) => ({
      kamoku_name: item.kamoku_name,
      kamokuid: item.kamokuid,
      kamoku_resume: item.kamoku_resume,
      kamoku_class: item.kamoku_class,
      kamoku_day: item.kamoku_day,
      kamoku_time: item.kamoku_time,
      kamoku_unit: item.kamoku_unit,
      kamoku_department: item.kamoku_department,
      kamoku_season: item.kamoku_season,
      kamoku_num: item.kamoku_num,
      kamoku_teacher: item.kamoku_teacher,
      kamoku_status: item.kamoku_status,
    }));

    return processedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
