import React, { createContext, useState, useContext, useEffect } from "react";
import { ClassPeriod } from "./types/class-period";
import { AsyncFunctions } from "./classObject/TimeTableClassObject";
import { UserSettingContent } from "./types/user-setting-content";

const TimeTableContext = createContext(null);

export const useTimeTable = () => useContext(TimeTableContext);

export const TimeTableProvider = ({ children }) => {
  const [unreadMessagesJSON, setUnreadMessagesJSON] = useState([]);
  const [userClassPeriodDatas, setUserClassPeriodDatas] = useState<
    ClassPeriod[]
  >([]);
  const initialUserSettingContent = {
    department: "",
    semester: "",
    displayCount: 5,
    colorByUnits: false,
    colorBySubject: false,
    totalUnits: 0,
  };
  const [userSettingContent, setUserSettingContent] =
    useState<UserSettingContent>(initialUserSettingContent);

  // 時間割データを取得
  const getClassPeriodDatas = async () => {
    const classPeriodDatas = await AsyncFunctions.getClassPeriodDatas<
      ClassPeriod[]
    >("@classPeriods", "array");
    setUserClassPeriodDatas(classPeriodDatas);
  };

  //ユーザーの設定項目を取得
  const getUserSettingContent = async () => {
    const userSettingContentData =
      await AsyncFunctions.getClassPeriodDatas<UserSettingContent>(
        "@userSettingContent",
        "object"
      );

    if (userSettingContentData) {
      console.log("user", userSettingContentData);
      setUserSettingContent(userSettingContentData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getClassPeriodDatas();
      await getUserSettingContent();
    };

    fetchData();
  }, []);

  //　同期ずれが起きて上手くいかないから要修正！
  useEffect(() => {
    const SelectedAllClassPeriods: ClassPeriod[] = userClassPeriodDatas.filter(
      (el: ClassPeriod) =>
        el.department === userSettingContent.department &&
        el.season === userSettingContent.semester
    );
    const uniqueClassPeriods: ClassPeriod[] = SelectedAllClassPeriods.filter(
      (value, index, self) =>
        index === self.findIndex((obj) => obj.num === value.num)
    );
    setUserSettingContent((data: UserSettingContent) => ({
      ...data,
      totalUnits: uniqueClassPeriods.reduce(
        (acc, obj: ClassPeriod) => acc + obj.unit,
        0
      ),
    }));
    // console.log("set", userSettingContent);
    // console.log(userClassPeriodDatas);
    // console.log(SelectedAllClassPeriods);
    console.log(
      uniqueClassPeriods.reduce((acc, obj: ClassPeriod) => acc + obj.unit, 0)
    );
  }, [userClassPeriodDatas]);

  return (
    <TimeTableContext.Provider
      value={{
        unreadMessagesJSON,
        setUnreadMessagesJSON,
        userClassPeriodDatas,
        setUserClassPeriodDatas,
        userSettingContent,
        setUserSettingContent,
      }}
    >
      {children}
    </TimeTableContext.Provider>
  );
};
