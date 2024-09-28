export type ClassPeriod = {
  year: number;
  season: string;
  weekOfTheDay: string;
  period: number;
  className: string;
  classRoom: string;
  memo: string;
  notifion: boolean;
  notification: string;
  department: string;
  unit: number;
  num: string;
  resume: string;
  teacher: string;
  status: string;
  color: string;
  mulColor: string;
  statusColor: string;
};

const TimeTable = {
  year: 2024,
  day: 0,
  period: 0,
  className: "",
  classRoom: "",
  memo: "",
  notifion: false,
  notification: "",
  department: "",
  unit: 0,
  num: "",
  resume: "",
  teacher: "",
  status: "",
  color: "#888888",
  mulColor: "#888888",
  statusColor: "#888888",
};

export type ClassPeriodOptionDatas = {
  kamoku_name: string;
  kamokuid: number;
  kamoku_resume: string;
  kamoku_class: string;
  kamoku_day: string;
  kamoku_time: string;
  kamoku_unit: number;
  kamoku_department: string;
  kamoku_season: string;
  kamoku_num: number;
  kamoku_teacher: string;
  kamoku_status: string;
};
