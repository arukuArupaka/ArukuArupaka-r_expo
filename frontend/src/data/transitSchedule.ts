export const CAMPUSES = ["BKC", "KIC", "OIC"];

export const ROUTES = {
    BKC: [
        "BKC ➔ 南草津駅",
        "南草津駅 ➔ BKC",
        "南草津駅 ➔ 大阪駅",
        "南草津駅 ➔ 米原駅",
    ],
    OIC: [
        "茨木駅 ➔ 大阪駅",
        "茨木駅 ➔ 京都駅",
        "茨木市駅 ➔ 大阪梅田駅",
    ],
    KIC: ["KIC前 ➔ 京都駅"],
};

export const WEEKDAY_TABS = ["平日", "土日祝"];

export const TIMETABLES = {
    // ==== BKC 系統 ====
    "BKC ➔ 南草津駅": {
        weekday:
            [
                {
                    "time": "07:00",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030010/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T07:00:00%2B09:00"
                },
                {
                    "time": "07:15",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030011/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T07:15:00%2B09:00"
                },
                {
                    "time": "08:05",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030012/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T08:05:00%2B09:00"
                },
                {
                    "time": "08:35",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030013/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T08:35:00%2B09:00"
                },
                {
                    "time": "09:05",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030014/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T09:05:00%2B09:00"
                },
                {
                    "time": "09:25",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8401002e/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T09:25:00%2B09:00"
                },
                {
                    "time": "09:35",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030015/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T09:35:00%2B09:00"
                },
                {
                    "time": "09:45",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050016/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T09:45:00%2B09:00"
                },
                {
                    "time": "10:00",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8401002f/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T10:00:00%2B09:00"
                },
                {
                    "time": "10:05",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030016/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T10:05:00%2B09:00"
                },
                {
                    "time": "10:25",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010030/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T10:25:00%2B09:00"
                },
                {
                    "time": "10:40",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030017/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T10:40:00%2B09:00"
                },
                {
                    "time": "10:45",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050017/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T10:45:00%2B09:00"
                },
                {
                    "time": "10:50",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080000/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T10:50:00%2B09:00"
                },
                {
                    "time": "11:00",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010031/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T11:00:00%2B09:00"
                },
                {
                    "time": "11:05",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030018/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T11:05:00%2B09:00"
                },
                {
                    "time": "11:25",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010032/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T11:25:00%2B09:00"
                },
                {
                    "time": "11:35",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030019/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T11:35:00%2B09:00"
                },
                {
                    "time": "11:50",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080001/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T11:50:00%2B09:00"
                },
                {
                    "time": "12:00",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010033/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T12:00:00%2B09:00"
                },
                {
                    "time": "12:05",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403001a/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T12:05:00%2B09:00"
                },
                {
                    "time": "12:25",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080002/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T12:25:00%2B09:00"
                },
                {
                    "time": "12:30",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010034/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T12:30:00%2B09:00"
                },
                {
                    "time": "12:30",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080003/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T12:30:00%2B09:00"
                },
                {
                    "time": "12:35",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403001b/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T12:35:00%2B09:00"
                },
                {
                    "time": "12:43",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080004/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T12:43:00%2B09:00"
                },
                {
                    "time": "12:50",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080005/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T12:50:00%2B09:00"
                },
                {
                    "time": "13:00",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010035/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T13:00:00%2B09:00"
                },
                {
                    "time": "13:05",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403001c/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T13:05:00%2B09:00"
                },
                {
                    "time": "13:10",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080006/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T13:10:00%2B09:00"
                },
                {
                    "time": "13:25",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010036/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T13:25:00%2B09:00"
                },
                {
                    "time": "13:30",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080007/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T13:30:00%2B09:00"
                },
                {
                    "time": "13:35",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403001d/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T13:35:00%2B09:00"
                },
                {
                    "time": "13:45",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050018/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T13:45:00%2B09:00"
                },
                {
                    "time": "13:50",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080008/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T13:50:00%2B09:00"
                },
                {
                    "time": "14:00",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010037/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T14:00:00%2B09:00"
                },
                {
                    "time": "14:05",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403001e/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T14:05:00%2B09:00"
                },
                {
                    "time": "14:10",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080009/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T14:10:00%2B09:00"
                },
                {
                    "time": "14:25",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010038/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T14:25:00%2B09:00"
                },
                {
                    "time": "14:30",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8408000a/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T14:30:00%2B09:00"
                },
                {
                    "time": "14:35",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403001f/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T14:35:00%2B09:00"
                },
                {
                    "time": "14:40",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8408000b/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T14:40:00%2B09:00"
                },
                {
                    "time": "14:50",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8408000c/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T14:50:00%2B09:00"
                },
                {
                    "time": "14:53",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8408000d/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T14:53:00%2B09:00"
                },
                {
                    "time": "14:55",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050019/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T14:55:00%2B09:00"
                },
                {
                    "time": "14:58",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8408000e/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T14:58:00%2B09:00"
                },
                {
                    "time": "15:00",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010039/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T15:00:00%2B09:00"
                },
                {
                    "time": "15:03",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8408000f/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T15:03:00%2B09:00"
                },
                {
                    "time": "15:05",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030020/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T15:05:00%2B09:00"
                },
                {
                    "time": "15:10",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080010/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T15:10:00%2B09:00"
                },
                {
                    "time": "15:20",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080011/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T15:20:00%2B09:00"
                },
                {
                    "time": "15:25",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8401003a/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T15:25:00%2B09:00"
                },
                {
                    "time": "15:30",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080012/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T15:30:00%2B09:00"
                },
                {
                    "time": "15:35",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030021/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T15:35:00%2B09:00"
                },
                {
                    "time": "15:40",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080013/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T15:40:00%2B09:00"
                },
                {
                    "time": "15:45",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405001a/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T15:45:00%2B09:00"
                },
                {
                    "time": "15:50",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080014/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T15:50:00%2B09:00"
                },
                {
                    "time": "16:00",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8401003b/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T16:00:00%2B09:00"
                },
                {
                    "time": "16:00",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080015/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T16:00:00%2B09:00"
                },
                {
                    "time": "16:05",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030022/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T16:05:00%2B09:00"
                },
                {
                    "time": "16:10",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080016/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T16:10:00%2B09:00"
                },
                {
                    "time": "16:20",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080017/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T16:20:00%2B09:00"
                },
                {
                    "time": "16:25",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8401003c/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T16:25:00%2B09:00"
                },
                {
                    "time": "16:30",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080018/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T16:30:00%2B09:00"
                },
                {
                    "time": "16:37",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080019/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T16:37:00%2B09:00"
                },
                {
                    "time": "16:40",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030023/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T16:40:00%2B09:00"
                },
                {
                    "time": "16:40",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8408001a/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T16:40:00%2B09:00"
                },
                {
                    "time": "16:43",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8408001b/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T16:43:00%2B09:00"
                },
                {
                    "time": "16:45",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405001b/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T16:45:00%2B09:00"
                },
                {
                    "time": "16:47",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8408001c/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T16:47:00%2B09:00"
                },
                {
                    "time": "16:50",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8408001d/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T16:50:00%2B09:00"
                },
                {
                    "time": "16:53",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8408001e/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T16:53:00%2B09:00"
                },
                {
                    "time": "16:57",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8408001f/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T16:57:00%2B09:00"
                },
                {
                    "time": "17:00",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8401003d/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T17:00:00%2B09:00"
                },
                {
                    "time": "17:03",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080020/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T17:03:00%2B09:00"
                },
                {
                    "time": "17:05",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030024/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T17:05:00%2B09:00"
                },
                {
                    "time": "17:10",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405001c/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T17:10:00%2B09:00"
                },
                {
                    "time": "17:15",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080021/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T17:15:00%2B09:00"
                },
                {
                    "time": "17:20",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030025/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T17:20:00%2B09:00"
                },
                {
                    "time": "17:20",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080022/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T17:20:00%2B09:00"
                },
                {
                    "time": "17:25",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405001d/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T17:25:00%2B09:00"
                },
                {
                    "time": "17:30",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8401003e/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T17:30:00%2B09:00"
                },
                {
                    "time": "17:35",
                    "detail": "経由地不明",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d001e/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-16T17:35:00%2B09:00"
                },
                {
                    "time": "17:40",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405001e/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T17:40:00%2B09:00"
                },
                {
                    "time": "17:40",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080023/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T17:40:00%2B09:00"
                },
                {
                    "time": "17:50",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030026/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T17:50:00%2B09:00"
                },
                {
                    "time": "17:50",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080024/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T17:50:00%2B09:00"
                },
                {
                    "time": "17:55",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405001f/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T17:55:00%2B09:00"
                },
                {
                    "time": "18:00",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8401003f/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T18:00:00%2B09:00"
                },
                {
                    "time": "18:05",
                    "detail": "経由地不明",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d001f/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-16T18:05:00%2B09:00"
                },
                {
                    "time": "18:05",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080025/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T18:05:00%2B09:00"
                },
                {
                    "time": "18:10",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050020/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T18:10:00%2B09:00"
                },
                {
                    "time": "18:20",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030027/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T18:20:00%2B09:00"
                },
                {
                    "time": "18:20",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080026/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T18:20:00%2B09:00"
                },
                {
                    "time": "18:23",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080027/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T18:23:00%2B09:00"
                },
                {
                    "time": "18:25",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050021/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T18:25:00%2B09:00"
                },
                {
                    "time": "18:28",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080028/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T18:28:00%2B09:00"
                },
                {
                    "time": "18:30",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010040/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T18:30:00%2B09:00"
                },
                {
                    "time": "18:33",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080029/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T18:33:00%2B09:00"
                },
                {
                    "time": "18:35",
                    "detail": "経由地不明",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d0020/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-16T18:35:00%2B09:00"
                },
                {
                    "time": "18:38",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8408002a/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T18:38:00%2B09:00"
                },
                {
                    "time": "18:40",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050022/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T18:40:00%2B09:00"
                },
                {
                    "time": "18:48",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8408002b/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T18:48:00%2B09:00"
                },
                {
                    "time": "18:55",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050023/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T18:55:00%2B09:00"
                },
                {
                    "time": "18:58",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8408002c/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T18:58:00%2B09:00"
                },
                {
                    "time": "19:00",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010041/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T19:00:00%2B09:00"
                },
                {
                    "time": "19:03",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8408002d/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T19:03:00%2B09:00"
                },
                {
                    "time": "19:05",
                    "detail": "経由地不明",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d0021/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-16T19:05:00%2B09:00"
                },
                {
                    "time": "19:10",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050024/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T19:10:00%2B09:00"
                },
                {
                    "time": "19:18",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8408002e/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T19:18:00%2B09:00"
                },
                {
                    "time": "19:20",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030028/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T19:20:00%2B09:00"
                },
                {
                    "time": "19:25",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050025/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T19:25:00%2B09:00"
                },
                {
                    "time": "19:33",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8408002f/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T19:33:00%2B09:00"
                },
                {
                    "time": "19:35",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030029/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T19:35:00%2B09:00"
                },
                {
                    "time": "19:40",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050026/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T19:40:00%2B09:00"
                },
                {
                    "time": "19:48",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080030/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T19:48:00%2B09:00"
                },
                {
                    "time": "19:50",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403002a/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T19:50:00%2B09:00"
                },
                {
                    "time": "19:55",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050027/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T19:55:00%2B09:00"
                },
                {
                    "time": "20:00",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010042/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T20:00:00%2B09:00"
                },
                {
                    "time": "20:05",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403002b/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T20:05:00%2B09:00"
                },
                {
                    "time": "20:08",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080031/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T20:08:00%2B09:00"
                },
                {
                    "time": "20:10",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050028/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T20:10:00%2B09:00"
                },
                {
                    "time": "20:20",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403002c/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T20:20:00%2B09:00"
                },
                {
                    "time": "20:25",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050029/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T20:25:00%2B09:00"
                },
                {
                    "time": "20:30",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010043/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T20:30:00%2B09:00"
                },
                {
                    "time": "20:40",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405002a/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T20:40:00%2B09:00"
                },
                {
                    "time": "20:45",
                    "detail": "シャトルバス（直行）",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84080032/stops?busstop=00480011&course-sequence=0007900571-1&datetime=2025-06-16T20:45:00%2B09:00"
                },
                {
                    "time": "20:50",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403002d/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T20:50:00%2B09:00"
                },
                {
                    "time": "20:55",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405002b/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T20:55:00%2B09:00"
                },
                {
                    "time": "21:00",
                    "detail": "かがやき通り経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010044/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-16T21:00:00%2B09:00"
                },
                {
                    "time": "21:10",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405002c/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T21:10:00%2B09:00"
                },
                {
                    "time": "21:25",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405002d/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T21:25:00%2B09:00"
                },
                {
                    "time": "21:40",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405002e/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T21:40:00%2B09:00"
                },
                {
                    "time": "21:50",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403002e/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T21:50:00%2B09:00"
                },
                {
                    "time": "22:00",
                    "detail": "パナソニック西口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405002f/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-16T22:00:00%2B09:00"
                },
                {
                    "time": "22:40",
                    "detail": "パナソニック東口経由",
                    "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8403002f/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-16T22:40:00%2B09:00"
                }
            ]
        ,
        weekend: [{ "time": "07:45", "detail": "パナソニック西口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050000/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-15T07:45:00%2B09:00" }, { "time": "08:45", "detail": "パナソニック西口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050001/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-15T08:45:00%2B09:00" }, { "time": "09:15", "detail": "パナソニック東口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030000/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-15T09:15:00%2B09:00" }, { "time": "09:25", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010000/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T09:25:00%2B09:00" }, { "time": "09:45", "detail": "パナソニック西口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050002/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-15T09:45:00%2B09:00" }, { "time": "09:50", "detail": "経由地不明", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d0000/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-15T09:50:00%2B09:00" }, { "time": "10:15", "detail": "パナソニック東口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030001/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-15T10:15:00%2B09:00" }, { "time": "10:25", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010001/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T10:25:00%2B09:00" }, { "time": "10:45", "detail": "パナソニック西口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050003/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-15T10:45:00%2B09:00" }, { "time": "10:50", "detail": "経由地不明", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d0001/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-15T10:50:00%2B09:00" }, { "time": "11:00", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010002/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T11:00:00%2B09:00" }, { "time": "11:05", "detail": "経由地不明", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d0002/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-15T11:05:00%2B09:00" }, { "time": "11:25", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010003/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T11:25:00%2B09:00" }, { "time": "11:35", "detail": "経由地不明", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d0003/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-15T11:35:00%2B09:00" }, { "time": "12:00", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010004/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T12:00:00%2B09:00" }, { "time": "12:05", "detail": "経由地不明", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d0004/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-15T12:05:00%2B09:00" }, { "time": "12:30", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010005/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T12:30:00%2B09:00" }, { "time": "12:35", "detail": "経由地不明", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d0005/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-15T12:35:00%2B09:00" }, { "time": "13:00", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010006/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T13:00:00%2B09:00" }, { "time": "13:05", "detail": "経由地不明", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d0006/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-15T13:05:00%2B09:00" }, { "time": "13:25", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010007/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T13:25:00%2B09:00" }, { "time": "13:35", "detail": "経由地不明", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d0007/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-15T13:35:00%2B09:00" }, { "time": "13:45", "detail": "パナソニック西口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050004/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-15T13:45:00%2B09:00" }, { "time": "14:00", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010008/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T14:00:00%2B09:00" }, { "time": "14:05", "detail": "経由地不明", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d0008/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-15T14:05:00%2B09:00" }, { "time": "14:25", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010009/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T14:25:00%2B09:00" }, { "time": "14:35", "detail": "経由地不明", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d0009/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-15T14:35:00%2B09:00" }, { "time": "14:55", "detail": "パナソニック西口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050005/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-15T14:55:00%2B09:00" }, { "time": "15:00", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8401000a/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T15:00:00%2B09:00" }, { "time": "15:05", "detail": "経由地不明", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d000a/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-15T15:05:00%2B09:00" }, { "time": "15:25", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8401000b/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T15:25:00%2B09:00" }, { "time": "15:35", "detail": "経由地不明", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d000b/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-15T15:35:00%2B09:00" }, { "time": "16:00", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8401000c/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T16:00:00%2B09:00" }, { "time": "16:05", "detail": "経由地不明", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d000c/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-15T16:05:00%2B09:00" }, { "time": "16:25", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8401000d/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T16:25:00%2B09:00" }, { "time": "16:40", "detail": "経由地不明", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d000d/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-15T16:40:00%2B09:00" }, { "time": "16:45", "detail": "パナソニック西口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050006/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-15T16:45:00%2B09:00" }, { "time": "17:00", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8401000e/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T17:00:00%2B09:00" }, { "time": "17:15", "detail": "経由地不明", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/840d000e/stops?busstop=00480011&course-sequence=0007900524-9&datetime=2025-06-15T17:15:00%2B09:00" }, { "time": "17:25", "detail": "パナソニック東口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030002/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-15T17:25:00%2B09:00" }, { "time": "17:30", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8401000f/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T17:30:00%2B09:00" }, { "time": "17:45", "detail": "パナソニック西口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050007/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-15T17:45:00%2B09:00" }, { "time": "18:00", "detail": "パナソニック東口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030003/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-15T18:00:00%2B09:00" }, { "time": "18:15", "detail": "パナソニック東口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030004/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-15T18:15:00%2B09:00" }, { "time": "18:30", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010010/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T18:30:00%2B09:00" }, { "time": "18:45", "detail": "パナソニック西口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050008/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-15T18:45:00%2B09:00" }, { "time": "19:00", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010011/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T19:00:00%2B09:00" }, { "time": "19:15", "detail": "パナソニック東口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030005/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-15T19:15:00%2B09:00" }, { "time": "19:30", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010012/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T19:30:00%2B09:00" }, { "time": "19:45", "detail": "パナソニック西口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84050009/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-15T19:45:00%2B09:00" }, { "time": "20:00", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010013/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T20:00:00%2B09:00" }, { "time": "20:15", "detail": "パナソニック東口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030006/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-15T20:15:00%2B09:00" }, { "time": "20:30", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010014/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T20:30:00%2B09:00" }, { "time": "20:45", "detail": "パナソニック西口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8405000a/stops?busstop=00480011&course-sequence=0007900544-1&datetime=2025-06-15T20:45:00%2B09:00" }, { "time": "21:00", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010015/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T21:00:00%2B09:00" }, { "time": "21:15", "detail": "パナソニック東口経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84030007/stops?busstop=00480011&course-sequence=0007900502-1&datetime=2025-06-15T21:15:00%2B09:00" }, { "time": "21:30", "detail": "かがやき通り経由", "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84010016/stops?busstop=00480011&course-sequence=0007900504-1&datetime=2025-06-15T21:30:00%2B09:00" }],
    },

    "南草津駅 ➔ BKC": {
        weekday: [
            {
                "time": "06:57",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040010/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T06:57:00%2B09:00"
            },
            {
                "time": "07:27",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040011/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T07:27:00%2B09:00"
            },
            {
                "time": "07:30",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070000/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T07:30:00%2B09:00"
            },
            {
                "time": "07:37",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040012/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T07:37:00%2B09:00"
            },
            {
                "time": "07:40",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070001/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T07:40:00%2B09:00"
            },
            {
                "time": "07:45",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070002/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T07:45:00%2B09:00"
            },
            {
                "time": "07:47",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040013/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T07:47:00%2B09:00"
            },
            {
                "time": "07:52",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070003/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T07:52:00%2B09:00"
            },
            {
                "time": "07:57",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070004/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T07:57:00%2B09:00"
            },
            {
                "time": "08:01",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8406001c/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-16T08:01:00%2B09:00"
            },
            {
                "time": "08:01",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070005/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T08:01:00%2B09:00"
            },
            {
                "time": "08:05",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070006/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T08:05:00%2B09:00"
            },
            {
                "time": "08:07",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020020/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T08:07:00%2B09:00"
            },
            {
                "time": "08:15",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070007/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T08:15:00%2B09:00"
            },
            {
                "time": "08:16",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040014/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T08:16:00%2B09:00"
            },
            {
                "time": "08:16",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020021/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T08:16:00%2B09:00"
            },
            {
                "time": "08:16",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070008/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T08:16:00%2B09:00"
            },
            {
                "time": "08:18",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070009/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T08:18:00%2B09:00"
            },
            {
                "time": "08:20",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407000a/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T08:20:00%2B09:00"
            },
            {
                "time": "08:23",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407000b/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T08:23:00%2B09:00"
            },
            {
                "time": "08:25",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407000c/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T08:25:00%2B09:00"
            },
            {
                "time": "08:27",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407000d/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T08:27:00%2B09:00"
            },
            {
                "time": "08:30",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8406001d/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-16T08:30:00%2B09:00"
            },
            {
                "time": "08:30",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407000e/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T08:30:00%2B09:00"
            },
            {
                "time": "08:33",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040015/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T08:33:00%2B09:00"
            },
            {
                "time": "08:33",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407000f/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T08:33:00%2B09:00"
            },
            {
                "time": "08:37",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020022/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T08:37:00%2B09:00"
            },
            {
                "time": "08:37",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070010/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T08:37:00%2B09:00"
            },
            {
                "time": "08:40",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070011/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T08:40:00%2B09:00"
            },
            {
                "time": "08:45",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040016/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T08:45:00%2B09:00"
            },
            {
                "time": "08:45",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070012/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T08:45:00%2B09:00"
            },
            {
                "time": "08:50",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070013/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T08:50:00%2B09:00"
            },
            {
                "time": "08:55",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070014/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T08:55:00%2B09:00"
            },
            {
                "time": "09:02",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040017/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T09:02:00%2B09:00"
            },
            {
                "time": "09:02",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020023/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T09:02:00%2B09:00"
            },
            {
                "time": "09:02",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070015/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T09:02:00%2B09:00"
            },
            {
                "time": "09:12",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070016/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T09:12:00%2B09:00"
            },
            {
                "time": "09:20",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020024/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T09:20:00%2B09:00"
            },
            {
                "time": "09:20",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070017/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T09:20:00%2B09:00"
            },
            {
                "time": "09:25",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070018/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T09:25:00%2B09:00"
            },
            {
                "time": "09:30",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8406001e/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-16T09:30:00%2B09:00"
            },
            {
                "time": "09:30",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070019/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T09:30:00%2B09:00"
            },
            {
                "time": "09:33",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407001a/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T09:33:00%2B09:00"
            },
            {
                "time": "09:40",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040018/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T09:40:00%2B09:00"
            },
            {
                "time": "09:40",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020025/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T09:40:00%2B09:00"
            },
            {
                "time": "09:40",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407001b/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T09:40:00%2B09:00"
            },
            {
                "time": "09:43",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407001c/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T09:43:00%2B09:00"
            },
            {
                "time": "09:47",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407001d/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T09:47:00%2B09:00"
            },
            {
                "time": "09:50",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407001e/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T09:50:00%2B09:00"
            },
            {
                "time": "09:53",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407001f/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T09:53:00%2B09:00"
            },
            {
                "time": "09:58",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070020/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T09:58:00%2B09:00"
            },
            {
                "time": "10:01",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070021/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T10:01:00%2B09:00"
            },
            {
                "time": "10:04",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040019/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T10:04:00%2B09:00"
            },
            {
                "time": "10:04",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020026/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T10:04:00%2B09:00"
            },
            {
                "time": "10:04",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070022/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T10:04:00%2B09:00"
            },
            {
                "time": "10:07",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070023/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T10:07:00%2B09:00"
            },
            {
                "time": "10:10",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070024/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T10:10:00%2B09:00"
            },
            {
                "time": "10:12",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070025/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T10:12:00%2B09:00"
            },
            {
                "time": "10:15",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070026/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T10:15:00%2B09:00"
            },
            {
                "time": "10:18",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020027/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T10:18:00%2B09:00"
            },
            {
                "time": "10:18",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070027/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T10:18:00%2B09:00"
            },
            {
                "time": "10:21",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070028/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T10:21:00%2B09:00"
            },
            {
                "time": "10:24",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8406001f/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-16T10:24:00%2B09:00"
            },
            {
                "time": "10:24",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070029/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T10:24:00%2B09:00"
            },
            {
                "time": "10:27",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407002a/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T10:27:00%2B09:00"
            },
            {
                "time": "10:30",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407002b/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T10:30:00%2B09:00"
            },
            {
                "time": "10:37",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8404001a/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T10:37:00%2B09:00"
            },
            {
                "time": "10:37",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020028/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T10:37:00%2B09:00"
            },
            {
                "time": "10:37",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407002c/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T10:37:00%2B09:00"
            },
            {
                "time": "10:47",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407002d/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T10:47:00%2B09:00"
            },
            {
                "time": "10:52",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407002e/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T10:52:00%2B09:00"
            },
            {
                "time": "11:03",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060020/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-16T11:03:00%2B09:00"
            },
            {
                "time": "11:03",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407002f/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T11:03:00%2B09:00"
            },
            {
                "time": "11:16",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020029/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T11:16:00%2B09:00"
            },
            {
                "time": "11:16",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070030/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T11:16:00%2B09:00"
            },
            {
                "time": "11:22",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060021/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-16T11:22:00%2B09:00"
            },
            {
                "time": "11:22",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070031/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T11:22:00%2B09:00"
            },
            {
                "time": "11:32",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070032/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T11:32:00%2B09:00"
            },
            {
                "time": "11:37",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8404001b/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T11:37:00%2B09:00"
            },
            {
                "time": "11:37",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8402002a/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T11:37:00%2B09:00"
            },
            {
                "time": "11:37",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070033/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T11:37:00%2B09:00"
            },
            {
                "time": "11:52",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070034/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T11:52:00%2B09:00"
            },
            {
                "time": "12:02",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070035/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T12:02:00%2B09:00"
            },
            {
                "time": "12:12",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070036/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T12:12:00%2B09:00"
            },
            {
                "time": "12:16",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8402002b/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T12:16:00%2B09:00"
            },
            {
                "time": "12:16",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070037/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T12:16:00%2B09:00"
            },
            {
                "time": "12:22",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060022/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-16T12:22:00%2B09:00"
            },
            {
                "time": "12:22",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070038/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T12:22:00%2B09:00"
            },
            {
                "time": "12:28",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070039/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T12:28:00%2B09:00"
            },
            {
                "time": "12:32",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407003a/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T12:32:00%2B09:00"
            },
            {
                "time": "12:37",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8402002c/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T12:37:00%2B09:00"
            },
            {
                "time": "12:37",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407003b/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T12:37:00%2B09:00"
            },
            {
                "time": "12:47",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407003c/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T12:47:00%2B09:00"
            },
            {
                "time": "12:52",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407003d/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T12:52:00%2B09:00"
            },
            {
                "time": "13:03",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060023/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-16T13:03:00%2B09:00"
            },
            {
                "time": "13:16",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8402002d/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T13:16:00%2B09:00"
            },
            {
                "time": "13:22",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060024/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-16T13:22:00%2B09:00"
            },
            {
                "time": "13:22",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407003e/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T13:22:00%2B09:00"
            },
            {
                "time": "13:37",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8402002e/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T13:37:00%2B09:00"
            },
            {
                "time": "13:37",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8407003f/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T13:37:00%2B09:00"
            },
            {
                "time": "13:52",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070040/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T13:52:00%2B09:00"
            },
            {
                "time": "14:03",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060025/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-16T14:03:00%2B09:00"
            },
            {
                "time": "14:16",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8402002f/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T14:16:00%2B09:00"
            },
            {
                "time": "14:22",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060026/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-16T14:22:00%2B09:00"
            },
            {
                "time": "14:30",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070041/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T14:30:00%2B09:00"
            },
            {
                "time": "14:37",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020030/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T14:37:00%2B09:00"
            },
            {
                "time": "15:03",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8404001c/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T15:03:00%2B09:00"
            },
            {
                "time": "15:16",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020031/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T15:16:00%2B09:00"
            },
            {
                "time": "15:22",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060027/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-16T15:22:00%2B09:00"
            },
            {
                "time": "15:37",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8404001d/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T15:37:00%2B09:00"
            },
            {
                "time": "15:52",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8404001e/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T15:52:00%2B09:00"
            },
            {
                "time": "15:55",
                "detail": "シャトルバス",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84070042/stops?busstop=00480156&course-sequence=0007900570-1&datetime=2025-06-16T15:55:00%2B09:00"
            },
            {
                "time": "16:03",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8404001f/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T16:03:00%2B09:00"
            },
            {
                "time": "16:18",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020032/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-16T16:18:00%2B09:00"
            },
            {
                "time": "16:22",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060028/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-16T16:22:00%2B09:00"
            },
            {
                "time": "16:37",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040020/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T16:37:00%2B09:00"
            },
            {
                "time": "16:54",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040021/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T16:54:00%2B09:00"
            },
            {
                "time": "17:09",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040022/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T17:09:00%2B09:00"
            },
            {
                "time": "17:24",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060029/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-16T17:24:00%2B09:00"
            },
            {
                "time": "17:39",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040023/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T17:39:00%2B09:00"
            },
            {
                "time": "17:54",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040024/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T17:54:00%2B09:00"
            },
            {
                "time": "18:09",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040025/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T18:09:00%2B09:00"
            },
            {
                "time": "18:24",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8406002a/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-16T18:24:00%2B09:00"
            },
            {
                "time": "18:39",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040026/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T18:39:00%2B09:00"
            },
            {
                "time": "18:54",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040027/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T18:54:00%2B09:00"
            },
            {
                "time": "19:09",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040028/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T19:09:00%2B09:00"
            },
            {
                "time": "19:24",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8406002b/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-16T19:24:00%2B09:00"
            },
            {
                "time": "19:54",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040029/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T19:54:00%2B09:00"
            },
            {
                "time": "20:09",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8404002a/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T20:09:00%2B09:00"
            },
            {
                "time": "20:24",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8406002c/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-16T20:24:00%2B09:00"
            },
            {
                "time": "20:54",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8404002b/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T20:54:00%2B09:00"
            },
            {
                "time": "21:09",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8404002c/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-16T21:09:00%2B09:00"
            },
            {
                "time": "21:24",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8406002d/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-16T21:24:00%2B09:00"
            }
        ],

        weekend: [
            {
                "time": "07:27",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040000/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-15T07:27:00%2B09:00"
            },
            {
                "time": "07:47",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040001/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-15T07:47:00%2B09:00"
            },
            {
                "time": "08:01",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060000/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-15T08:01:00%2B09:00"
            },
            {
                "time": "08:16",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040002/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-15T08:16:00%2B09:00"
            },
            {
                "time": "08:16",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020000/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-15T08:16:00%2B09:00"
            },
            {
                "time": "08:33",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040003/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-15T08:33:00%2B09:00"
            },
            {
                "time": "08:33",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020001/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-15T08:33:00%2B09:00"
            },
            {
                "time": "09:16",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040004/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-15T09:16:00%2B09:00"
            },
            {
                "time": "09:16",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020002/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-15T09:16:00%2B09:00"
            },
            {
                "time": "09:24",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060001/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-15T09:24:00%2B09:00"
            },
            {
                "time": "09:37",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040005/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-15T09:37:00%2B09:00"
            },
            {
                "time": "09:37",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020003/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-15T09:37:00%2B09:00"
            },
            {
                "time": "10:18",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020004/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-15T10:18:00%2B09:00"
            },
            {
                "time": "10:24",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060002/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-15T10:24:00%2B09:00"
            },
            {
                "time": "10:37",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020005/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-15T10:37:00%2B09:00"
            },
            {
                "time": "11:16",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020006/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-15T11:16:00%2B09:00"
            },
            {
                "time": "11:22",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060003/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-15T11:22:00%2B09:00"
            },
            {
                "time": "11:37",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020007/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-15T11:37:00%2B09:00"
            },
            {
                "time": "12:16",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020008/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-15T12:16:00%2B09:00"
            },
            {
                "time": "12:22",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060004/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-15T12:22:00%2B09:00"
            },
            {
                "time": "12:37",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84020009/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-15T12:37:00%2B09:00"
            },
            {
                "time": "13:16",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8402000a/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-15T13:16:00%2B09:00"
            },
            {
                "time": "13:22",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060005/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-15T13:22:00%2B09:00"
            },
            {
                "time": "13:37",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8402000b/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-15T13:37:00%2B09:00"
            },
            {
                "time": "14:16",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8402000c/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-15T14:16:00%2B09:00"
            },
            {
                "time": "14:22",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060006/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-15T14:22:00%2B09:00"
            },
            {
                "time": "14:37",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8402000d/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-15T14:37:00%2B09:00"
            },
            {
                "time": "15:16",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8402000e/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-15T15:16:00%2B09:00"
            },
            {
                "time": "15:22",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060007/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-15T15:22:00%2B09:00"
            },
            {
                "time": "15:37",
                "detail": "かがやき通り経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8402000f/stops?busstop=00480156&course-sequence=0007900505-1&datetime=2025-06-15T15:37:00%2B09:00"
            },
            {
                "time": "16:22",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060008/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-15T16:22:00%2B09:00"
            },
            {
                "time": "16:54",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040006/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-15T16:54:00%2B09:00"
            },
            {
                "time": "17:24",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84060009/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-15T17:24:00%2B09:00"
            },
            {
                "time": "17:54",
                "detail": "パナソニック東口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/84040007/stops?busstop=00480156&course-sequence=0007900503-1&datetime=2025-06-15T17:54:00%2B09:00"
            },
            {
                "time": "18:24",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8406000a/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-15T18:24:00%2B09:00"
            },
            {
                "time": "19:24",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8406000b/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-15T19:24:00%2B09:00"
            },
            {
                "time": "20:24",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8406000c/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-15T20:24:00%2B09:00"
            },
            {
                "time": "21:24",
                "detail": "パナソニック西口経由",
                "link": "https://transfer-cloud.navitime.biz/ohmitetudo/courses/timetables/8406000d/stops?busstop=00480156&course-sequence=0007900545-1&datetime=2025-06-15T21:24:00%2B09:00"
            }
        ],
    },

    "南草津駅 ➔ 大阪駅": {
        weekday: [
            { time: "06:00", detail: "特急｜大阪直行", link: "https://osaka.example.com/0600" },
            { time: "08:00", detail: "快速｜高槻経由", link: null },
            { time: "12:30", detail: "直行便", link: null },
            { time: "19:00", detail: "夕方便｜特急", link: "https://osaka.example.com/1900" },
            { time: "21:00", detail: "終バス｜直行", link: null },
        ],
        weekend: [
            { time: "07:30", detail: "快速｜直行", link: null },
            { time: "11:00", detail: "臨時便", link: "https://osaka.example.com/1100" },
            { time: "17:30", detail: "夕方便｜各停", link: null },
            { time: "20:30", detail: "終バス", link: null },
        ],
    },

    "南草津駅 ➔ 米原駅": {
        weekday: [
            { time: "06:15", detail: "快速｜草津・近江経由", link: null },
            { time: "09:00", detail: "特急｜直行", link: "https://maibara.example.com/0900" },
            { time: "15:00", detail: "午後便｜各停", link: null },
            { time: "18:30", detail: "夕方便｜快速", link: null },
            { time: "20:45", detail: "終バス", link: null },
        ],
        weekend: [
            { time: "08:00", detail: "快速｜直行", link: null },
            { time: "14:00", detail: "昼便｜臨時", link: "https://maibara.example.com/1400" },
            { time: "19:00", detail: "終バス", link: null },
        ],
    },

    // ==== OIC 系統 ====
    "茨木駅 ➔ 大阪駅": {
        weekday: [
            { time: "07:00", detail: "通勤特急", link: "https://oic.example.com/0700" },
            { time: "08:30", detail: "快速", link: null },
            { time: "12:30", detail: "昼便｜各停", link: null },
            { time: "18:00", detail: "夕方便", link: null },
            { time: "21:00", detail: "終バス", link: null },
        ],
        weekend: [
            { time: "09:00", detail: "快速", link: null },
            { time: "14:00", detail: "臨時便", link: "https://oic.example.com/1400" },
            { time: "19:30", detail: "終バス", link: null },
        ],
    },

    "茨木駅 ➔ 京都駅": {
        weekday: [
            { time: "06:50", detail: "特急", link: "https://kyoto.example.com/0650" },
            { time: "10:00", detail: "各停", link: null },
            { time: "17:00", detail: "夕方便｜快速", link: null },
            { time: "20:00", detail: "終バス", link: null },
        ],
        weekend: [
            { time: "08:30", detail: "快速", link: null },
            { time: "16:00", detail: "臨時便", link: "https://kyoto.example.com/1600" },
            { time: "18:30", detail: "終バス", link: null },
        ],
    },

    "茨木市駅 ➔ 大阪梅田駅": {
        weekday: [
            { time: "07:20", detail: "直行便", link: null },
            { time: "12:00", detail: "昼便｜各停", link: null },
            { time: "18:00", detail: "夕方便", link: null },
            { time: "21:30", detail: "終バス", link: null },
        ],
        weekend: [
            { time: "09:30", detail: "直行便", link: null },
            { time: "15:00", detail: "臨時便", link: null },
            { time: "19:00", detail: "終バス", link: null },
        ],
    },

    // ==== KIC 系統 ====
    "KIC前 ➔ 京都駅": {
        weekday: [
            { time: "07:00", detail: "通学便｜快速", link: null },
            { time: "09:00", detail: "各停", link: null },
            { time: "13:00", detail: "昼便", link: null },
            { time: "18:00", detail: "夕方便｜快速", link: null },
            { time: "20:00", detail: "終バス", link: null },
        ],
        weekend: [
            { time: "08:00", detail: "快速", link: null },
            { time: "14:00", detail: "臨時便", link: null },
            { time: "18:30", detail: "終バス", link: null },
        ],
    },
};
