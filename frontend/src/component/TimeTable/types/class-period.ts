export type ClassPeriod = {
  year: number;
  season: boolean;
  weekOfTheDay: string;
  period: number;
  className: string;
  classRoom: string;
  memo: string;
  isNotify: boolean;
  notificationTime: number;
  notificationId?: string;
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

const multipleSettingTemporaryData = {
  year: 2024,
  season: "",
  weekOfTheDay: "",
  period: 0,
  className: "",
  classRoom: "",
  memo: "",
  isNotify: false,
  notificationTime: 0,
  department: "",
  unit: 0,
  num: "",
  resume: "",
  teacher: "",
  status: "",
  color: "",
  mulColor: "",
  statusColor: "",
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
