function mergeAndSortSchedules(...arrays) {
  return arrays
    .flat() // 全配列を結合
    .sort((a, b) => a.time.localeCompare(b.time)); // time順にソート
}

// 使用例（3つでも4つでもOK）
const schedule1 = [
  {
    time: "08:01",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407001c/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-28T08:01:00%2B09:00",
  },
  {
    time: "08:30",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407001d/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-28T08:30:00%2B09:00",
  },
  {
    time: "09:30",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407001e/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-28T09:30:00%2B09:00",
  },
  {
    time: "10:24",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407001f/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-28T10:24:00%2B09:00",
  },
  {
    time: "11:03",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070020/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-28T11:03:00%2B09:00",
  },
  {
    time: "11:22",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070021/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-28T11:22:00%2B09:00",
  },
  {
    time: "12:22",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070022/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-28T12:22:00%2B09:00",
  },
  {
    time: "13:03",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070023/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-28T13:03:00%2B09:00",
  },
  {
    time: "13:22",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070024/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-28T13:22:00%2B09:00",
  },
  {
    time: "14:03",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070025/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-28T14:03:00%2B09:00",
  },
  {
    time: "14:22",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070026/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-28T14:22:00%2B09:00",
  },
  {
    time: "15:22",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070027/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-28T15:22:00%2B09:00",
  },
  {
    time: "16:22",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070028/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-28T16:22:00%2B09:00",
  },
  {
    time: "17:24",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070029/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-28T17:24:00%2B09:00",
  },
  {
    time: "18:24",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407002a/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-28T18:24:00%2B09:00",
  },
  {
    time: "19:24",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407002b/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-28T19:24:00%2B09:00",
  },
  {
    time: "20:24",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407002c/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-28T20:24:00%2B09:00",
  },
  {
    time: "21:24",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407002d/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-28T21:24:00%2B09:00",
  },
];
const schedule2 = [
  {
    time: "06:57",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050010/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T06:57:00%2B09:00",
  },
  {
    time: "07:27",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050011/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T07:27:00%2B09:00",
  },
  {
    time: "07:37",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050012/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T07:37:00%2B09:00",
  },
  {
    time: "07:47",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050013/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T07:47:00%2B09:00",
  },
  {
    time: "08:16",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050014/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T08:16:00%2B09:00",
  },
  {
    time: "08:33",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050015/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T08:33:00%2B09:00",
  },
  {
    time: "08:45",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050016/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T08:45:00%2B09:00",
  },
  {
    time: "09:02",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050017/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T09:02:00%2B09:00",
  },
  {
    time: "09:40",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050018/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T09:40:00%2B09:00",
  },
  {
    time: "10:04",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050019/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T10:04:00%2B09:00",
  },
  {
    time: "10:37",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405001a/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T10:37:00%2B09:00",
  },
  {
    time: "11:37",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405001b/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T11:37:00%2B09:00",
  },
  {
    time: "15:03",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405001c/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T15:03:00%2B09:00",
  },
  {
    time: "15:37",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405001d/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T15:37:00%2B09:00",
  },
  {
    time: "15:52",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405001e/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T15:52:00%2B09:00",
  },
  {
    time: "16:03",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405001f/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T16:03:00%2B09:00",
  },
  {
    time: "16:37",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050020/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T16:37:00%2B09:00",
  },
  {
    time: "16:54",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050021/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T16:54:00%2B09:00",
  },
  {
    time: "17:09",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050022/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T17:09:00%2B09:00",
  },
  {
    time: "17:39",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050023/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T17:39:00%2B09:00",
  },
  {
    time: "17:54",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050024/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T17:54:00%2B09:00",
  },
  {
    time: "18:09",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050025/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T18:09:00%2B09:00",
  },
  {
    time: "18:39",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050026/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T18:39:00%2B09:00",
  },
  {
    time: "18:54",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050027/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T18:54:00%2B09:00",
  },
  {
    time: "19:09",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050028/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T19:09:00%2B09:00",
  },
  {
    time: "19:54",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050029/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T19:54:00%2B09:00",
  },
  {
    time: "20:09",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405002a/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T20:09:00%2B09:00",
  },
  {
    time: "20:54",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405002b/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T20:54:00%2B09:00",
  },
  {
    time: "21:09",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405002c/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-28T21:09:00%2B09:00",
  },
];

const schedule3 = [
  {
    time: "08:07",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030020/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T08:07:00%2B09:00",
  },
  {
    time: "08:16",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030021/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T08:16:00%2B09:00",
  },
  {
    time: "08:37",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030022/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T08:37:00%2B09:00",
  },
  {
    time: "09:02",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030023/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T09:02:00%2B09:00",
  },
  {
    time: "09:20",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030024/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T09:20:00%2B09:00",
  },
  {
    time: "09:40",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030025/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T09:40:00%2B09:00",
  },
  {
    time: "10:04",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030026/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T10:04:00%2B09:00",
  },
  {
    time: "10:18",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030027/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T10:18:00%2B09:00",
  },
  {
    time: "10:37",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030028/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T10:37:00%2B09:00",
  },
  {
    time: "11:16",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030029/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T11:16:00%2B09:00",
  },
  {
    time: "11:37",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403002a/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T11:37:00%2B09:00",
  },
  {
    time: "12:16",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403002b/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T12:16:00%2B09:00",
  },
  {
    time: "12:37",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403002c/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T12:37:00%2B09:00",
  },
  {
    time: "13:16",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403002d/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T13:16:00%2B09:00",
  },
  {
    time: "13:37",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403002e/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T13:37:00%2B09:00",
  },
  {
    time: "14:16",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403002f/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T14:16:00%2B09:00",
  },
  {
    time: "14:37",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030030/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T14:37:00%2B09:00",
  },
  {
    time: "15:16",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030031/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T15:16:00%2B09:00",
  },
  {
    time: "16:18",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030032/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-28T16:18:00%2B09:00",
  },
];

const schedule4 = [
  { time: "07:30", detail: "シャトルバス", link: null },
  { time: "07:40", detail: "シャトルバス", link: null },
  { time: "07:45", detail: "シャトルバス", link: null },
  { time: "07:52", detail: "シャトルバス", link: null },
  { time: "07:57", detail: "シャトルバス", link: null },
  { time: "08:01", detail: "シャトルバス", link: null },
  { time: "08:05", detail: "シャトルバス", link: null },
  { time: "08:15", detail: "シャトルバス", link: null },
  { time: "08:16", detail: "シャトルバス", link: null },
  { time: "08:18", detail: "シャトルバス", link: null },
  { time: "08:20", detail: "シャトルバス", link: null },
  { time: "08:23", detail: "シャトルバス", link: null },
  { time: "08:25", detail: "シャトルバス", link: null },
  { time: "08:27", detail: "シャトルバス", link: null },
  { time: "08:30", detail: "シャトルバス", link: null },
  { time: "08:33", detail: "シャトルバス", link: null },
  { time: "08:37", detail: "シャトルバス", link: null },
  { time: "08:40", detail: "シャトルバス", link: null },
  { time: "08:45", detail: "シャトルバス", link: null },
  { time: "08:50", detail: "シャトルバス", link: null },
  { time: "08:55", detail: "シャトルバス", link: null },
  { time: "09:02", detail: "シャトルバス", link: null },
  { time: "09:12", detail: "シャトルバス", link: null },
  { time: "09:20", detail: "シャトルバス", link: null },
  { time: "09:25", detail: "シャトルバス", link: null },
  { time: "09:30", detail: "シャトルバス", link: null },
  { time: "09:33", detail: "シャトルバス", link: null },
  { time: "09:40", detail: "シャトルバス", link: null },
  { time: "09:43", detail: "シャトルバス", link: null },
  { time: "09:47", detail: "シャトルバス", link: null },
  { time: "09:50", detail: "シャトルバス", link: null },
  { time: "09:53", detail: "シャトルバス", link: null },
  { time: "09:58", detail: "シャトルバス", link: null },
  { time: "10:01", detail: "シャトルバス", link: null },
  { time: "10:04", detail: "シャトルバス", link: null },
  { time: "10:07", detail: "シャトルバス", link: null },
  { time: "10:10", detail: "シャトルバス", link: null },
  { time: "10:12", detail: "シャトルバス", link: null },
  { time: "10:15", detail: "シャトルバス", link: null },
  { time: "10:18", detail: "シャトルバス", link: null },
  { time: "10:21", detail: "シャトルバス", link: null },
  { time: "10:24", detail: "シャトルバス", link: null },
  { time: "10:27", detail: "シャトルバス", link: null },
  { time: "10:30", detail: "シャトルバス", link: null },
  { time: "10:37", detail: "シャトルバス", link: null },
  { time: "10:47", detail: "シャトルバス", link: null },
  { time: "10:52", detail: "シャトルバス", link: null },
  { time: "11:03", detail: "シャトルバス", link: null },
  { time: "11:16", detail: "シャトルバス", link: null },
  { time: "11:22", detail: "シャトルバス", link: null },
  { time: "11:32", detail: "シャトルバス", link: null },
  { time: "11:37", detail: "シャトルバス", link: null },
  { time: "11:52", detail: "シャトルバス", link: null },
  { time: "12:02", detail: "シャトルバス", link: null },
  { time: "12:12", detail: "シャトルバス", link: null },
  { time: "12:16", detail: "シャトルバス", link: null },
  { time: "12:22", detail: "シャトルバス", link: null },
  { time: "12:28", detail: "シャトルバス", link: null },
  { time: "12:32", detail: "シャトルバス", link: null },
  { time: "12:37", detail: "シャトルバス", link: null },
  { time: "12:47", detail: "シャトルバス", link: null },
  { time: "12:52", detail: "シャトルバス", link: null },
  { time: "13:22", detail: "シャトルバス", link: null },
  { time: "13:37", detail: "シャトルバス", link: null },
  { time: "13:52", detail: "シャトルバス", link: null },
  { time: "14:30", detail: "シャトルバス", link: null },
  { time: "15:55", detail: "シャトルバス", link: null },
];

const 休み輝きBKCへ = [
  {
    time: "08:16",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030000/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-27T08:16:00%2B09:00",
  },
  {
    time: "08:33",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030001/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-27T08:33:00%2B09:00",
  },
  {
    time: "09:16",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030002/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-27T09:16:00%2B09:00",
  },
  {
    time: "09:37",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030003/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-27T09:37:00%2B09:00",
  },
  {
    time: "10:18",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030004/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-27T10:18:00%2B09:00",
  },
  {
    time: "10:37",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030005/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-27T10:37:00%2B09:00",
  },
  {
    time: "11:16",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030006/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-27T11:16:00%2B09:00",
  },
  {
    time: "11:37",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030007/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-27T11:37:00%2B09:00",
  },
  {
    time: "12:16",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030008/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-27T12:16:00%2B09:00",
  },
  {
    time: "12:37",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030009/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-27T12:37:00%2B09:00",
  },
  {
    time: "13:16",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403000a/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-27T13:16:00%2B09:00",
  },
  {
    time: "13:37",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403000b/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-27T13:37:00%2B09:00",
  },
  {
    time: "14:16",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403000c/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-27T14:16:00%2B09:00",
  },
  {
    time: "14:37",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403000d/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-27T14:37:00%2B09:00",
  },
  {
    time: "15:16",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403000e/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-27T15:16:00%2B09:00",
  },
  {
    time: "15:37",
    detail: "かがやき通り経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403000f/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-04-27T15:37:00%2B09:00",
  },
];

const 休み西口BKC行き = [
  {
    time: "08:01",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070000/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-27T08:01:00%2B09:00",
  },
  {
    time: "09:24",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070001/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-27T09:24:00%2B09:00",
  },
  {
    time: "10:24",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070002/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-27T10:24:00%2B09:00",
  },
  {
    time: "11:22",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070003/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-27T11:22:00%2B09:00",
  },
  {
    time: "12:22",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070004/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-27T12:22:00%2B09:00",
  },
  {
    time: "13:22",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070005/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-27T13:22:00%2B09:00",
  },
  {
    time: "14:22",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070006/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-27T14:22:00%2B09:00",
  },
  {
    time: "15:22",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070007/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-27T15:22:00%2B09:00",
  },
  {
    time: "16:22",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070008/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-27T16:22:00%2B09:00",
  },
  {
    time: "17:24",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070009/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-27T17:24:00%2B09:00",
  },
  {
    time: "18:24",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407000a/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-27T18:24:00%2B09:00",
  },
  {
    time: "19:24",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407000b/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-27T19:24:00%2B09:00",
  },
  {
    time: "20:24",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407000c/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-27T20:24:00%2B09:00",
  },
  {
    time: "21:24",
    detail: "パナソニック西口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407000d/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-04-27T21:24:00%2B09:00",
  },
];

const 休み東口BKC行き = [
  {
    time: "07:27",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050000/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-27T07:27:00%2B09:00",
  },
  {
    time: "07:47",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050001/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-27T07:47:00%2B09:00",
  },
  {
    time: "08:16",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050002/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-27T08:16:00%2B09:00",
  },
  {
    time: "08:33",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050003/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-27T08:33:00%2B09:00",
  },
  {
    time: "09:16",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050004/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-27T09:16:00%2B09:00",
  },
  {
    time: "09:37",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050005/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-27T09:37:00%2B09:00",
  },
  {
    time: "16:54",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050006/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-27T16:54:00%2B09:00",
  },
  {
    time: "17:54",
    detail: "パナソニック東口経由",
    link: "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050007/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-04-27T17:54:00%2B09:00",
  },
];

// //平日BKC行き
// const merged = mergeAndSortSchedules(
//   schedule1,
//   schedule2,
//   schedule3,
//   schedule4
// );

//休み日BKC行き
const merged = mergeAndSortSchedules(
  休み輝きBKCへ,
  休み西口BKC行き,
  休み東口BKC行き
);

console.log(JSON.stringify(merged));
