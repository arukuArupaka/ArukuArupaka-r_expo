import { ClassPeriod } from "../types/class-period";
import * as Notifications from "expo-notifications";
import {SchedulableTriggerInputTypes} from 'expo-notifications';

export class NotificationMethods {
  // スケジュールされた通知をキャンセルする関数
  static async cancelNotification(
    classNumber: string,
    userClassPeriodData: ClassPeriod[],
    setUserClassPeriodData: React.Dispatch<React.SetStateAction<ClassPeriod[]>>
  ) {
    const selectedClassPeriod = userClassPeriodData.find(
      (classPeriod) => classPeriod.num === classNumber
    );

    // クラスが見つからない、または通知IDがない場合は何もせず終了
    if (!selectedClassPeriod?.notificationId) {
      return;
    }

    // 通知のキャンセル
    await Notifications.cancelScheduledNotificationAsync(
      selectedClassPeriod.notificationId
    );

    // クラスのデータを更新
    setUserClassPeriodData((classPeriods) =>
      classPeriods.map((classPeriod) =>
        classPeriod.num === classNumber
          ? { ...classPeriod, notificationId: null }
          : classPeriod
      )
    );
  }

  // 指定した曜日と時間の数分前に通知をスケジュールする関数
  static async scheduleWeeklyNotification(
    weekday: number,
    hour: number,
    minute: number,
    minutesBefore: number,
    classPeriod: ClassPeriod
  ) {
    // 指定された時間の数分前を計算
    let notificationHour = hour;
    let notificationMinute = minute - minutesBefore;

    if (notificationMinute < 0) {
      notificationMinute += 60;
      notificationHour -= 1;
      if (notificationHour < 0) {
        notificationHour = 23;
      }
    }

    // 通知のスケジュール
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `${classPeriod.classRoom}`,
        body: `${classPeriod.className}`,
        sound: true,
      },
      trigger: {
        type: SchedulableTriggerInputTypes.CALENDAR,
        weekday: weekday, // 1: 日曜日, 2: 月曜日, ..., 7: 土曜日
        hour: notificationHour,
        minute: notificationMinute,
        repeats: true, // 毎週繰り返す
      },
    });
    return id;
  }
}
