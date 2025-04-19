import { Alert } from "react-native";
import {
  getDeviceId,
  IS_POST_DEVICE_ID,
  IsUpdataThisFunction,
} from "../functions/common";
import { postDeviceId } from "../functions/deviceAPI";
import { AsyncFunctions } from "../component/TimeTable/classObject/async-functions";
import { ClassPeriod } from "../component/TimeTable/types/class-period";
import { UserSettingContent } from "../component/TimeTable/types/user-setting-content";
import { ConvertMethods } from "../component/TimeTable/classObject/convert-methods";
import { NotificationMethods } from "../component/TimeTable/classObject/notification-methods";

interface Props {
  userClassPeriodData: ClassPeriod[];
  setUserClassPeriodData: React.Dispatch<React.SetStateAction<ClassPeriod[]>>;
  userSettingContent: UserSettingContent;
}

export const onAppStart = async (props: Props) => {
  // 初回起動時の処理

  console.log("アプリが起動しました。");

  // デバイスIDが未送信の場合にデバイスIDを送信する
  if (await IsUpdataThisFunction(IS_POST_DEVICE_ID)) {
    console.log("デバイスIDを送信します。");
    // 例: デバイスIDを取得してサーバーに送信
    const device_token = await getDeviceId();
    if (device_token) {
      await postDeviceId(device_token);
    }
  }

  const version1308 = async () => {
    console.log("バージョン1308の処理を実行します。");

    // 時間割データのステート更新関数
    const changeUserClassPeriod = async (newData: ClassPeriod) => {
      props.setUserClassPeriodData((prev: ClassPeriod[]) => {
        const deletePrevData: ClassPeriod[] = prev.filter(
          (el) => el.num !== newData.num
        );
        const updated = [...deletePrevData, newData];
        return updated;
      });
      const updatedClassPeriods = [
        ...props.userClassPeriodData.filter((el) => el.num !== newData.num),
        newData,
      ];
      await AsyncFunctions.saveData("@classPeriods", updatedClassPeriods);
    };

    // 通知時間の調整
    const adjustNotificationTime = props.userClassPeriodData.map(
      async (data) => {
        if (
          data.year === props.userSettingContent.schoolYear &&
          data.season === props.userSettingContent.semester &&
          data.department === props.userSettingContent.department
        ) {
          const notifyTime = ConvertMethods.convertPeriodToTime(data.period);
          const weekOfTheDay = ConvertMethods.convertWeekOfTheDayToNumber(
            data.weekOfTheDay
          );

          let updatedData = {
            ...data,
          };

          const notificationId =
            await NotificationMethods.scheduleWeeklyNotification(
              weekOfTheDay,
              notifyTime.hour,
              notifyTime.minute,
              data.notificationTime,
              data
            );
          updatedData.notificationId = notificationId;
          await NotificationMethods.cancelNotification(
            data.num,
            props.userClassPeriodData,
            props.setUserClassPeriodData
          );
          await changeUserClassPeriod(updatedData);
        }
      }
    );
    await Promise.all(adjustNotificationTime);
  };

  /**
   * バージョンはapp storeのバージョンで、例）13.0.8の場合、1308として保存する
   */
  const version = await AsyncFunctions.getData<string>("@version", "string");

  if (!version || Number(version) < 1308) {
    Alert.alert("時間割通知時間更新", "通知時間を新時間割に調整しますか？", [
      {
        text: "キャンセル",
        style: "cancel", // ← キャンセルボタンとして認識される
        onPress: async () => {
          await AsyncFunctions.saveData("@version", "1308");
        },
      },
      {
        text: "OK",
        onPress: async () => {
          await version1308(); // OKを押したときの処理
          Alert.alert(
            "時間割通知時間更新",
            "通知時間を新時間割に調整しました。"
          );
          await AsyncFunctions.saveData("@version", "1308");
        },
      },
    ]);
  }
};
